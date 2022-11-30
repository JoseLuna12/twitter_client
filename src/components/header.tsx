import { useState } from "react";
import { useNavigate } from "react-router-dom";


interface HeaderProps {
    title: string,
    back?: boolean,
    customAction?: {
        action: () => void,
        text: string
    }
}


const HeaderTweet = (props: HeaderProps) => {
    const navigate = useNavigate();
    const { title, back, customAction } = props

    const [loadingCA, setLoading] = useState(false)

    const customActionCallback = async () => {
        setLoading(true)
        await customAction?.action()
        setLoading(false)
    }
    const goBackPage = () => {
        navigate(-1)
    }
    return (
        <div className="mt-5 w-full text-center flex px-4">
            {
                back ?
                    <button className="text-tw-blue text-sm" onClick={goBackPage}>back</button>
                    : <></>
            }
            <div className="text-2xl font-bol flex-1">
                {title}
            </div>
            {
                customAction ?
                    <button disabled={loadingCA} className="text-green-600 text-sm" onClick={customAction.action}>{customAction.text}</button>
                    : <></>
            }
        </div>
    )
}

export default HeaderTweet