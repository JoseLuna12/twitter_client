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
import { generatePerson } from "../api/person"
import ImageVisualizer from "../components/tweet/imageVisualizer"

const NewPerson = () => {
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
        const { movieTweet } = await generatePerson(tweet)

        const dbid = movieTweet as any
        const sbid = dbid?.[0]?.dbId || dbid.dbid
        console.log(sbid)
        setNewTweetId(sbid)
    }

    const removeImageByIndex = async (id: number) => {
        const newImages: CustomImages[] = []
        images.forEach((img, index) => {
            if (index != id) {
                newImages.push(img)
            }
        })
        setImages(newImages)
    }
    return (
        <div>
            <BodyAction title="Tweet Person" button={{ text: "Generate Tweet", action: generateTweet }}>
                <div>
                    <MovieOptions handleOption={handleOption} defaults={[{ type: "Emoji", default: tweetOptions.Emoji }, { type: "Images", default: tweetOptions.Images }]} display={["Emoji", "Poster", "Images", "Poster", "Thread"]} />
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
                            return (
                                <div key={(im.id || im.name || im.url) + index} className="px-5">
                                    <ImageVisualizer {...im} />
                                    <div className="w-1/2">
                                        <ButtonTweet position="right" onClick={() => removeImageByIndex(index)} text="Remove" color="danger" circular />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </BodyAction>
        </div>
    )
}

export default NewPerson