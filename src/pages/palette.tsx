import { FC, useState } from "react";
import BodyAction from "../components/bodyAction";
import InputText from "../components/form/InputText";
import ButtonTweet from "../components/form/buttonTweet";
import MovieOptions, { Option } from "../components/form/queryOptions";
import { useNavigate } from "react-router-dom";
import { getMovie } from "../api/getMovie";

const PalettePage: FC = () => {
    const nav = useNavigate()

    const [id, setId] = useState("")
    const [name, setName] = useState("")
    const [url, setUrl] = useState("")
    const [newTweetId, setNewTweetId] = useState("")


    const generateTweet = async () => {

        let url_palette = `${import.meta.env.VITE_BACKEND_URL}/api/color/wasm?url=${url}`

        const { movieTweet } = await getMovie({ id, name, images: [{ url: url_palette }], options: { Palette: true } })
        const dbid = movieTweet as any
        const sbid = dbid.dbId
        setNewTweetId(sbid)
    }

    return (
        <div>
            <BodyAction title="Tweet Movie" button={{ text: "Generate Tweet", action: generateTweet }}>
                <div>
                    <div className="space-y-2 pt-4">
                        <InputText placeholder="id" onChange={setId} />
                        <InputText placeholder="name" onChange={setName} />
                        <InputText placeholder="image" onChange={setUrl} />
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

export default PalettePage