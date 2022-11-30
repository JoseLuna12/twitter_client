import { useState } from "react"

type OptionsType = "Ai" | "Emoji" | "Thread" | "Poster" | "Url" | "Images"

interface DefaultsProps {
    type: OptionsType,
    default: boolean
}
interface MovioOptionsProps {
    display?: OptionsType[],
    defaults?: DefaultsProps[],
    handleOption: (option: Option) => void
}

export interface Option {
    name: OptionsType,
    active: boolean,
    show: boolean,
}

function getDefaultByType(type: OptionsType, defaults?: DefaultsProps[]): boolean {
    return defaults ? defaults?.find(df => df.type == type)?.default || false : false
}

function getDisplayByType(type: OptionsType, types?: OptionsType[]) {
    return types ? types.includes(type) : true
}

const MovieOptions = (props: MovioOptionsProps) => {

    const { display, defaults, handleOption } = props

    const [options, setOptions] = useState<Option[]>([
        {
            name: "Ai",
            active: getDefaultByType("Ai", defaults),
            show: getDisplayByType("Ai", display),
        },
        {
            name: "Images",
            active: getDefaultByType("Images", defaults),
            show: getDisplayByType("Images", display),
        },
        {
            name: "Emoji",
            active: getDefaultByType("Emoji", defaults),
            show: getDisplayByType("Emoji", display)
        },
        {
            name: "Thread",
            active: getDefaultByType("Thread", defaults),
            show: getDisplayByType("Thread", display)
        },
        {
            name: "Poster",
            active: getDefaultByType("Poster", defaults),
            show: getDisplayByType("Poster", display)
        },
        {
            name: "Url",
            active: getDefaultByType("Url", defaults),
            show: getDisplayByType("Url", display)
        }
    ])

    const toggleOption = (option: Option) => {
        const index = options.findIndex(op => op.name == option.name)
        const toggle = options[index].active
        const optionsCopy = [...options]
        optionsCopy[index].active = !toggle

        setOptions(optionsCopy)
        handleOption(optionsCopy[index])
    }

    return (
        <div id="options-buttons" className="flex space-x-2 overflow-x-auto px-3 pt-4">

            {
                options.map(opt => {
                    if (opt.show) {
                        return (
                            <div key={opt.name} onClick={() => toggleOption(opt)} className={`px-4 py-1 ${opt.active ? " bg-tw-blue" : "bg-gray-400"} text-sm text-white text-center rounded-full`
                            }>
                                {opt.name}
                            </div>
                        )
                    } else {
                        <></>
                    }
                })
            }
        </div >
    )
}

export default MovieOptions