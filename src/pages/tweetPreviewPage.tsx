import { useContext, useEffect, useState } from "react"
import { deleteTweetById, getMovie, getTweetById, updateTweetById } from "../api/getMovie"
import BodyAction from "../components/bodyAction"
import TweetPreview from "../components/tweet/tweetPreview"
import { Movie } from "../context/twitterContext"
import { useNavigate, useParams } from 'react-router-dom';
import ButtonTweet from "../components/form/buttonTweet"
import { tweetMovieById } from "../api/tweet"
import TweetThreadChildren from "../components/tweet/tweetThreadChildren"

const TweetPreviewPage = () => {

    const { tweetId } = useParams<{ tweetId: string }>()
    const nav = useNavigate()

    const [tweetContent, setTweet] = useState<{ head: string, body: string, hashtag: string, images: string[] }>()
    const [editedTweet, setEdited] = useState({ head: "", body: "", hashtag: "", images: [""] })
    const [threadTweets, setThreadTweets] = useState<string[]>([])

    useEffect(() => {
        const loadMovie = async () => {
            if (tweetId) {
                const tweetMovie = await getTweetById({ id: tweetId })
                if (tweetMovie?.thread_ids?.length) {
                    console.log(tweetMovie.thread_ids.length)
                    setThreadTweets(tweetMovie.thread_ids)
                    // const threadTweetsData = await Promise.all(tweetMovie?.thread_ids?.map((id: string) => getTweetById({ id })))
                    // console.log({ threadTweetsData })
                }
                setTweet(tweetMovie)
                setEdited(tweetMovie)
            }
        }
        loadMovie()
    }, [])

    const generateNewTweet = () => {
        return editedTweet
    }

    const postTweet = async () => {

        await saveDraft()
        await tweetMovieById(tweetId as string)
    }

    const saveDraft = async () => {
        const newTweet = generateNewTweet()
        await updateTweetById(tweetId as string, newTweet as Movie)
    }

    const deleteTweet = async () => {
        await deleteTweetById(tweetId as string)
        nav(-1)
    }

    const removeChildThread = (id: string) => {
        const threadIdsCopy = [...threadTweets]
        const newThreadIds = threadIdsCopy.filter(thid => thid != id)
        setThreadTweets(newThreadIds)
    }

    return tweetContent ? (
        <div>
            <BodyAction back title="Preview" button={{ action: postTweet, text: "Post" }} action={{ text: "save", action: saveDraft }}>
                <div>
                    <TweetPreview tweet={tweetContent} setTweet={setEdited} />
                    <ButtonTweet onClick={deleteTweet} text="Delete" color="danger" />
                    <div>
                        {
                            tweetId && threadTweets.map(tw => {
                                return <TweetThreadChildren key={tw} id={tw} options={{ parentThread: tweetId, removeThread: removeChildThread }} />
                            })
                        }
                    </div>
                </div>
            </BodyAction>
        </div>
    ) :
        (
            <div>
                <BodyAction back title="Preview" button={{ inactive: true, action: postTweet, text: "Post" }}>
                    <div className="w-full h-full flex justify-center items-center">
                        <div>loading</div>
                    </div>
                </BodyAction>
            </div>
        )
}

export default TweetPreviewPage