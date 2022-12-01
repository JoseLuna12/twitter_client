import { useContext, useState } from "react"
import InputText from "../components/form/InputText"
import BodyAction from "../components/bodyAction"
import TweetPreview from "../components/tweet/tweetPreview"
import { TwitterContext } from "../context/twitterContext"
import { getMovie } from "../api/getMovie"
import ButtonTweet from "../components/form/buttonTweet"
import { useNavigate } from "react-router-dom"
import MovieOptions, { Option } from "../components/form/queryOptions"

const NewMovie = () => {
    const [id, setId] = useState("")
    const [name, setName] = useState("")
    const [url, setUrl] = useState("")

    const [tweetOptions, setTweetOptions] = useState<{ [key: string]: boolean }>({ "Ai": true })

    const nav = useNavigate()

    const [newTweetId, setNewTweetId] = useState("")

    const handleOption = (option: Option) => {
        setTweetOptions(prev => ({
            ...prev,
            [option.name]: option.active
        }))
    }

    const generateTweet = async () => {
        const urlText = tweetOptions.Url ? url : false
        const { movieTweet } = await getMovie({ id, name, options: { ...tweetOptions, Url: urlText } })
        const dbid = movieTweet as any
        const sbid = dbid.dbId
        setNewTweetId(sbid)
    }
    return (
        <div>
            <BodyAction title="Tweet Movie" button={{ text: "Generate Tweet", action: generateTweet }}>
                <div>
                    <MovieOptions handleOption={handleOption} defaults={[{ type: "Ai", default: true }]} display={["Ai", "Emoji", "Poster", "Url"]} />
                    <div className="space-y-2 pt-4">
                        <InputText placeholder="id" onChange={setId} />
                        <InputText placeholder="name" onChange={setName} />
                        {
                            tweetOptions.Url ?
                                <InputText placeholder="url" onChange={setUrl} />
                                : <></>
                        }
                    </div>

                    {
                        newTweetId ?
                            <div className="w-full h-44 flex place-items-center">
                                <div className="w-full">
                                    <ButtonTweet onClick={() => nav(`/preview/${newTweetId}`)} text="Visualize Tweet" color="success" />
                                </div>
                            </div>
                            : <></>
                    }
                </div>
            </BodyAction>
        </div>
    )
}

export default NewMovie