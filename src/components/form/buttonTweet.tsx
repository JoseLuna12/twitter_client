

interface ButtonProps {
    onClick: () => void,
    inactive?: boolean,
    text: string,
    circular?: boolean,
    position?: "center" | "left" | "right",
    color?: "danger" | "normal" | "success"
}

const ButtonTweet = (props: ButtonProps) => {
    const { onClick, text, circular, position, color } = props

    const cssColor = !color ? 'bg-tw-blue' :
        color == "danger" ? "bg-red-600" :
            color == "success" ? "bg-green-600" : "bg-tw-blue"

    const cssPosition = !position ? "justify-center" :
        position == "left" ? "justify-end" :
            position == "right" ? "justify-start" :
                position == "center" ? "justify-center" : ""

    return (
        <div className={`w-full px-2 my-2 flex ${cssPosition}`}>
            <button disabled={props.inactive} className={`w-8/12 px-4 py-2 disabled:bg-opacity-50 ${cssColor} text-white ${circular ? 'rounded-2xl' : 'rounded-lg'}`} onClick={onClick}>
                {text}
            </button>
        </div>
    )
}

export default ButtonTweet