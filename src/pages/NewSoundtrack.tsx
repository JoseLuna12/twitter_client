import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { generateSoundtrack } from "../api/soundtrack"
import BodyAction from "../components/bodyAction"
import ButtonTweet from "../components/form/buttonTweet"
import InputText from "../components/form/InputText"
import MovieOptions, { Option } from "../components/form/queryOptions"

const NewSoundtrack = () => {
    const [tweetOptions, setTweetOptions] = useState<{ [key: string]: boolean }>({ "Poster": true, "Url": true })
    const [name, setName] = useState("")
    const [id, setId] = useState("")
    const [url, setUrl] = useState("")
    const [newTweetId, setNewTweetId] = useState("")

    const nav = useNavigate()

    const handleOption = (option: Option) => {
        setTweetOptions(prev => ({
            ...prev,
            [option.name]: option.active
        }))
    }

    const generateTweet = async () => {
        const urlText = tweetOptions.Url ? url : false
        const tweet = {
            name,
            id,
            options: { ...tweetOptions, Url: urlText }
        }
        const { movieTweet } = await generateSoundtrack(tweet)
        const dbid = movieTweet as any
        const sbid = dbid.dbId
        setNewTweetId(sbid)
        console.log(sbid)
    }

    return (
        <div>
            <BodyAction button={{ action: generateTweet, text: "Visualize" }} title="Soundtrack">
                <div>
                    <MovieOptions handleOption={handleOption} defaults={[{ type: "Poster", default: tweetOptions.Poster }, { type: "Url", default: tweetOptions.Url }]} display={["Emoji", "Poster", "Url"]} />
                    <div className="space-y-2 pt-4">
                        <InputText onChange={setName} placeholder="name" />
                        <InputText onChange={setId} placeholder="id" />
                        <InputText onChange={setUrl} placeholder="Spotify url" />
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

export default NewSoundtrack