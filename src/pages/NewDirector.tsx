import { useContext, useState } from "react"
import InputText from "../components/form/InputText"
import BodyAction from "../components/bodyAction"
import TweetPreview from "../components/tweet/tweetPreview"
import { TwitterContext } from "../context/twitterContext"
import { getMovie } from "../api/getMovie"
import ButtonTweet from "../components/form/buttonTweet"
import { useNavigate } from "react-router-dom"
import MovieOptions, { Option } from "../components/form/queryOptions"
import MultipleImagesInput, { CustomImages } from "../components/form/multipleImages"
import { generateDirector } from "../api/director"

const NewDirector = () => {
    const [id, setId] = useState("")
    const [name, setName] = useState("")
    const [images, setImages] = useState<CustomImages[]>([])

    const [tweetOptions, setTweetOptions] = useState<{ [key: string]: boolean }>({ "Images": true, "Emoji": true })

    const nav = useNavigate()

    const [newTweetId, setNewTweetId] = useState("")

    const handleOption = (option: Option) => {
        setTweetOptions(prev => ({
            ...prev,
            [option.name]: option.active
        }))
    }

    const generateTweet = async () => {
        const tweet = {
            id,
            name,
            images,
            options: tweetOptions
        }
        console.log(tweet)
        // const urlText = tweetOptions.Url ? url : false
        const { movieTweet } = await generateDirector(tweet)
        console.log({ movieTweet })
        // await getMovie({ id, name, options: tweetOptions })
        const dbid = movieTweet as any
        const sbid = dbid.dbId
        setNewTweetId(sbid)
    }
    return (
        <div>
            <BodyAction title="Tweet Director" button={{ text: "Generate Tweet", action: generateTweet }}>
                <div>
                    <MovieOptions handleOption={handleOption} defaults={[{ type: "Emoji", default: tweetOptions.Emoji }, { type: "Images", default: tweetOptions.Images }]} display={["Emoji", "Poster", "Images"]} />
                    <div className="space-y-2 pt-4">
                        <InputText placeholder="id" onChange={setId} />
                        <InputText placeholder="name" onChange={setName} />
                        {tweetOptions.Images ? <MultipleImagesInput setImages={setImages} /> : <></>}
                    </div>

                    {
                        newTweetId ?
                            <div className="w-full h-44 flex place-items-center">
                                <div className="w-full">
                                    <ButtonTweet onClick={() => nav(`/preview/${newTweetId}`)} text="Visualize Tweet" color="success" />
                                </div>
                            </div>
                            : null
                    }
                    {
                        images.map((im, index) => {
                            return <p key={(im.id || im.name || im.url) + index}>{JSON.stringify(im)}</p>
                        })
                    }
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

export default NewDirector