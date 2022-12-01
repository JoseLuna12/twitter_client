import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { deleteTweetById, getTweetById, removeChildThreadFromParentById, updateTweetById } from "../../api/getMovie"
import ButtonTweet from "../form/buttonTweet"
import TweetPreview from "./tweetPreview"

interface Tweet {
    head: string
    body: string
    hashtag: string
    images: string[]
}
interface TweetPreviewProps {
    customSave?: () => void,
    parentThread: string,
    removeThread: (id: string) => void
}

const TweetThreadChildren = ({ id, options }: { id: string, options: TweetPreviewProps },) => {

    const nav = useNavigate()

    const [tweetContent, setTweet] = useState<Tweet>()
    const [editedTweet, setEdited] = useState<Tweet>({ head: "", body: "", hashtag: "", images: [""] })

    useEffect(() => {
        const loadMovie = async () => {
            if (id) {
                const tweetMovie = await getTweetById({ id })
                setTweet(tweetMovie)
                setEdited(tweetMovie)
            }
        }
        loadMovie()
    }, [])

    const saveDraft = async () => {
        await updateTweetById(id, editedTweet)
    }

    const deleteTweet = async () => {
        await removeChildThreadFromParentById(options.parentThread, id)
        options.removeThread(id)
    }

    return (
        <div>
            {
                tweetContent ?
                    <div className="pl-10">
                        <TweetPreview tweet={tweetContent} setTweet={setEdited} />
                        <div className="flex space-x-3">
                            <ButtonTweet onClick={saveDraft} text="Save" color="success" />
                            <ButtonTweet onClick={deleteTweet} text="Delete" color="danger" />
                        </div>
                    </div>
                    : <>...loading</>
            }
        </div>
    )
}

export default TweetThreadChildren
