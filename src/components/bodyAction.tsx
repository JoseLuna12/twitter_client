import ButtonTweet from "./form/buttonTweet"
import HeaderTweet from "./header"

interface BodyProps {
    title: string,
    children: JSX.Element,
    button?: { inactive?: boolean, text: string, action: () => void },
    back?: boolean,
    action?: { action: () => void, text: string }
}

const BodyAction = (props: BodyProps) => {
    const { title, children, button, back, action } = props

    const customHeight = button ? `h-[85vh]` : ''

    return (
        <div className="flex justify-center">
            <div className=" w-full sm:w-1/2 lg:w-1/2">
                <div className={`overflow-y-auto ${customHeight}`}>
                    <HeaderTweet back={back} title={title} customAction={action} />
                    {children}
                </div>
                {
                    button ?
                        <ButtonTweet inactive={button.inactive} text={button.text} onClick={button.action} circular />
                        : <></>
                }
            </div>
        </div>
    )
}

export default BodyAction