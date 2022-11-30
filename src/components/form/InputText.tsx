import { ChangeEvent, useEffect, useState } from "react"

interface InputTextProps {
    placeholder?: string,
    label?: string,
    onChange: React.Dispatch<React.SetStateAction<string>>,
    defaultValue?: string
}
const InputText = (props: InputTextProps) => {
    const {placeholder, label, onChange, defaultValue} = props

    const [text, setText] = useState("")

    useEffect(()=> {
        const value = defaultValue ?? ""
        setText(value)
        onChange(value)
    }, [])

    const handleOnChange =(input: ChangeEvent<HTMLInputElement>) => {
        setText(input.target.value)
        onChange(input.target.value)
    }

    return (
        <div className="w-ful px-2">
            {label ?<label htmlFor="input" className="px-1">Test</label> : <></>}
            <input value={text} onChange={handleOnChange} placeholder={placeholder} className="w-full rounded-xl bg-gray-bg focus:outline-tw-blue px-3 py-2" type="text" />
        </div>
    )
}

export default InputText