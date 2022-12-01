import { Link } from "react-router-dom"
import HeaderTweet from "../components/header"

const TweetTypeButton = ({ text, to }: { text: string, to: string }) => {
    return (
        <div className="w-full px-10 my-3">
            <Link to={to} className="w-full bg-gray-bg flex p-2 rounded-2xl border-2 border-gray-bg hover:bg-slate-100 hover:border-tw-blue transition">
                <div className="">
                    <img width={30} src="/twitterButton.png" alt="" />
                </div>
                <div className="flex-1 flex justify-center items-center font-semibold">
                    {text}
                </div>
            </Link>
        </div>
    )
}


const TweetHome = () => {
    return (
        <div>
            <HeaderTweet title="Tweet" />
            <TweetTypeButton text="Tweet Movie" to="/movie" />
            <TweetTypeButton text="Tweet Cinematography" to="/cinematography" />
            <TweetTypeButton text="Tweet Sountrack" to="/soundtrack" />
            <TweetTypeButton text="Tweet Director" to="/director" />
            <TweetTypeButton text="Tweet Featured Person" to="/person" />
            <div className="py-2">
                <TweetTypeButton text="View Tweets" to="/tweets" />
            </div>
        </div>
    )
}

export default TweetHome