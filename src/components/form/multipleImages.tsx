import { useState } from "react"
import ButtonTweet from "./buttonTweet"
import InputText from "./InputText"

export interface CustomImages {
    name?: string,
    id?: string,
    url: string
}

interface MultipleImagesInputProps {
    setImages: React.Dispatch<React.SetStateAction<CustomImages[]>>,
    onlyUrl?: boolean
}

const MultipleImagesInput = ({ setImages, onlyUrl }: MultipleImagesInputProps) => {
    const [imgType, setImgType] = useState<"name" | "id">("name")
    const [movie, setMovie] = useState("")
    const [imgUrl, setImg] = useState("")

    const handleTypeChange = (type: "name" | "id") => {
        setImgType(type)
    }

    const handleNewImage = () => {
        if (movie || onlyUrl) {
            const customImage = {
                url: imgUrl,
                [imgType]: movie
            }
            setImages(prev => {
                const newPrev = [...prev, customImage]
                return newPrev
            })
        }
    }

    return (
        <div>
            <div className="flex w-full px-2">
                {
                    !onlyUrl ?
                        <div className="flex-1 flex flex-col mr-2 place-content-center">
                            <div className="flex text-white h-1/2">
                                <button onClick={() => handleTypeChange("name")} className={`flex-1 flex justify-center place-items-center rounded-l-lg p-2 transition ${imgType == "name" ? "bg-tw-blue" : "bg-gray-500"}`}>
                                    <div>name</div>
                                </button>
                                <button onClick={() => handleTypeChange("id")} className={`flex-1 flex justify-center place-items-center rounded-r-lg p-2 transition ${imgType == "id" ? "bg-tw-blue" : "bg-gray-500"}`}>
                                    <div>id</div>
                                </button>
                            </div>
                        </div>
                        : <></>
                }
                <div className="w-full space-y-1">
                    {!onlyUrl ? <InputText placeholder="Movie" onChange={setMovie} /> : <></>}
                    <InputText placeholder="Image Url" onChange={setImg} />
                </div>
            </div>
            <div className="flex px-5 py-2">
                <div className="flex-1 flex place-items-center">
                    <h1 className="text-tw-blue text-sm">Add images</h1>
                </div>
                <div>
                    <button onClick={handleNewImage} className="bg-tw-blue px-3 py-1 text-white rounded-xl">+</button>
                </div>
            </div>
        </div>
    )
}

export default MultipleImagesInput