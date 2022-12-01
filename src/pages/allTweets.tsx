import { useEffect, useState } from "react"
import { deleteTweetById } from "../api/getMovie"
import { getAllTweets, retweetByTweetId } from "../api/getTweets"
import { getTweets, tweetMovieById } from "../api/tweet"
import BodyAction from "../components/bodyAction"
import TweetPreview from "../components/tweet/tweetPreview"

// body
// created_at
// hashtag
// head
// id
// images
// posted
// thread_ids
// tweet_id
// tweet_type
// url

interface MovieDatabase {
    id: string
    head: string
    body: string
    images: string[]
    hashtag: string
    created_at: string
    posted?: boolean
    thread_ids?: string[]
    tweet_id?: string
    tweet_type?: string
    url?: string
}

const AllTweets = () => {
    const [originalTweets, setOriginalTweets] = useState<MovieDatabase[]>([])
    const [movieTweets, setMovies] = useState<MovieDatabase[]>([])
    const [query, setQuery] = useState("")
    const [filter, setFilter] = useState<{ [key: string]: boolean }>({ posted: false, thread: false })
    useEffect(() => {
        const getTweetsValues = async () => {
            const { data: tweets }: { data: MovieDatabase[] } = await getAllTweets()
            const sortedTweets = tweets.sort(function (a, b) {
                const dateA = new Date(a.created_at)
                const dateB = new Date(b.created_at)
                return dateB.valueOf() - dateA.valueOf()
            })
            setMovies(sortedTweets)
            setOriginalTweets(sortedTweets)
        }
        getTweetsValues()
    }, [])

    const deleteTweet = async (id: string) => {
        await deleteTweetById(id)
        const filteredTweets = movieTweets?.filter(tw => tw.id != id)
        setMovies(filteredTweets)
    }

    const retweet = async (id: string) => {
        const res = await retweetByTweetId(id)
        console.log(res)
    }
    const postTweet = async (id: string) => {
        await tweetMovieById(id)
        const newTweetMap = movieTweets.map(m => {
            if (id == m.id) {
                return { ...m, tweet_id: "Tweeted" }
            }
            else return m
        })
        setMovies(newTweetMap)
    }

    function timeout(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    const search = async (query: string) => {
        setQuery(query)
        await timeout(500)
        if (query == "") {
            setMovies(originalTweets)
        } else {
            const minusQuery = query.toLocaleLowerCase()
            const newMovies = movieTweets.filter(mv => {
                const bodyLower = mv.body?.toLocaleLowerCase()
                const headLower = mv.head?.toLocaleLowerCase()
                const hashtagLower = mv.hashtag?.toLocaleLowerCase()
                if (bodyLower.includes(minusQuery) || headLower.includes(minusQuery) || hashtagLower.includes(minusQuery)) {
                    return true
                } else {
                    return false
                }
            })
            setMovies(newMovies)
        }
    }

    const filterTweet = (filterKey: string) => {
        const toggle = !filter[filterKey]
        setFilter(prev => {
            return {
                ...prev,
                [filterKey]: toggle
            }
        })
    }

    return (

        <BodyAction title="Tweets" back >

            <div>
                <div className="flex space-x-3 px-4 py-3 overflow-x-auto">
                    {
                        Object.keys(filter).map(f => {
                            return (
                                <div onClick={() => filterTweet(f)} className={`px-4 py-1 ${filter[f] ? " bg-tw-blue" : "bg-gray-400"} $ text-sm text-white text-center rounded-full`}>
                                    {f}
                                </div>
                            )
                        })
                    }
                </div>
                <div className="flex px-4 pt-2">
                    <input className="w-full px-4 py-2 bg-slate-50 border border-green-400 text-black rounded-xl" value={query} onChange={(value) => search(value.target.value)} />
                    <button className="m-3" onClick={() => { setQuery(""); search("") }}>Clear</button>
                </div>
                {
                    movieTweets.length ?
                        movieTweets?.map(movie => {
                            return (
                                <div key={movie.id}>
                                    <TweetPreview setTweet={() => { }} tweet={movie} />
                                    <div className="flex w-full space-x-3 px-8 text-white">
                                        <button className="flex-1 px-3 py-2 bg-red-600 rounded-xl" onClick={() => deleteTweet(movie.id)} >Delete</button>
                                        {
                                            movie?.tweet_id ?
                                                <button className="flex-1 px-3 py-2 bg-tw-blue rounded-xl" onClick={() => retweet(movie.tweet_id as string)} >Retweet</button>
                                                :
                                                <button className="flex-1 px-3 py-2 bg-tw-blue rounded-xl" onClick={() => postTweet(movie.id)} >Retweet</button>
                                        }
                                    </div>
                                </div>
                            )
                        })
                        : <>Loading</>
                }
            </div>
        </BodyAction>
    )
}

export default AllTweets