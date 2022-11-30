import { useContext, useEffect, useState } from "react"
import { deleteTweetById, getMovie, getTweetById, updateTweetById } from "../api/getMovie"
import BodyAction from "../components/bodyAction"
import TweetPreview from "../components/tweet/tweetPreview"
import { Movie } from "../context/twitterContext"
import { useNavigate, useParams } from 'react-router-dom';
import ButtonTweet from "../components/form/buttonTweet"
import { tweetMovieById } from "../api/tweet"

const TweetPreviewPage = () => {

    const { tweetId } = useParams()
    const nav = useNavigate()

    const [tweetContent, setTweet] = useState<{ head: string, body: string, hashtag: string, images: string[] }>()
    const [editedTweet, setEdited] = useState({ head: "", body: "", hashtag: "", images: [""] })

    useEffect(() => {
        const loadMovie = async () => {
            if (tweetId) {
                const test = await getTweetById({ id: tweetId })
                setTweet(test)
                setEdited(test)
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

    return tweetContent ? (
        <div>
            <BodyAction back title="Preview" button={{ action: postTweet, text: "Post" }} action={{ text: "save", action: saveDraft }}>
                <div>
                    <TweetPreview tweet={tweetContent} setTweet={setEdited} />
                    <ButtonTweet onClick={deleteTweet} text="Delete" color="danger" />
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