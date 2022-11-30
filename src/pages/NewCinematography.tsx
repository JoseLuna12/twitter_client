import { useState } from "react"
import { generateCinematography } from "../api/cinematography"
import BodyAction from "../components/bodyAction"
import InputText from "../components/form/InputText"
import MultipleImagesInput, { CustomImages } from "../components/form/multipleImages"
import MovieOptions, { Option } from "../components/form/queryOptions"

const Cinematography = () => {
    const [id, setId] = useState("")
    const [name, setName] = useState("")
    // const [url, setUrl] = useState("")
    const [newTweetId, setNewTweetId] = useState("")
    const [tweetOptions, setTweetOptions] = useState<{ [key: string]: boolean }>({ Images: true })
    const [images, setImages] = useState<CustomImages[]>([])

    const handleOption = (option: Option) => {
        setTweetOptions(prev => ({
            ...prev,
            [option.name]: option.active
        }))
    }

    const generateTweet = async () => {
        // const urlText = tweetOptions.Url ? url : false
        const cinematographyObj = {
            id,
            name,
            options: tweetOptions,
            images
        }
        const { movieTweet } = await generateCinematography(cinematographyObj)
        // //await getMovie({ id, name, options: { ...tweetOptions, Url: urlText } })
        const dbid = movieTweet as any
        const sbid = dbid.dbId
        setNewTweetId(sbid)
    }

    return (
        <div>
            <BodyAction title="Cinematography" button={{ action: generateTweet, text: "Generate Tweet" }}>
                <div>
                    <MovieOptions handleOption={handleOption} display={["Emoji", "Thread", "Images"]} defaults={[{ type: "Images", default: tweetOptions.Images }]} />
                    <div className="space-y-2 pt-4">
                        <InputText onChange={setId} placeholder="Id" />
                        <InputText onChange={setName} placeholder="Name" />

                        {tweetOptions.Images ? <MultipleImagesInput onlyUrl setImages={setImages} /> : <></>}
                        {
                            newTweetId
                        }
                        {
                            images.map((im, index) => {
                                return <p key={(im.id || im.name || im.url) + index}>{JSON.stringify(im)}</p>
                            })
                        }
                    </div>
                </div>
            </BodyAction>
        </div>
    )
}

export default Cinematography