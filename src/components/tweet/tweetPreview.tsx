import { useEffect, useRef, useState } from "react"
import { Movie } from "../../context/twitterContext"
import ButtonTweet from "../form/buttonTweet"

const MAX_TWEET_CHARS = 280

interface TweetPreviewProps {
    tweet: Movie,
    setTweet: React.Dispatch<React.SetStateAction<Movie>>
}

const TweetImagePreview = (images: string[]) => {
    if (images.length == 1) {
        return (
            <div className="flex rounded-xl overflow-hidden">
                <img src={images[0]} alt="image" />
            </div>
        )
    }
    if (images.length == 2) {
        return (
            <div className="flex rounded-xl overflow-hidden">
                <div className="w-1/2 border" style={{ backgroundImage: `url("${images[0]}")`, aspectRatio: "1.8/1", backgroundSize: "cover", backgroundPosition: "center" }}></div>
                <div className="w-1/2 border" style={{ backgroundImage: `url("${images[1]}")`, aspectRatio: "1.8/1", backgroundSize: "cover", backgroundPosition: "center" }}></div>
            </div>
        )
    }
    if (images.length == 3) {
        return (
            <div className="flex rounded-xl overflow-hidden">
                <div className="w-1/2 border" style={{ backgroundImage: `url("${images[0]}")`, aspectRatio: "1.8/1", backgroundSize: "cover", backgroundPosition: "center" }}></div>
                <div className="w-1/2 boreder">
                    <div className="w-full border" style={{ backgroundImage: `url("${images[1]}")`, aspectRatio: "1.8/1", backgroundSize: "cover", backgroundPosition: "center" }}></div>
                    <div className="w-full border" style={{ backgroundImage: `url("${images[2]}")`, aspectRatio: "1.8/1", backgroundSize: "cover", backgroundPosition: "center" }}></div>
                </div>
            </div>
        )
    }

    if (images.length == 4) {
        return (
            <div className="flex rounded-xl overflow-hidden">
                <div className="w-1/2">
                    <div className="w-full border" style={{ backgroundImage: `url("${images[0]}")`, aspectRatio: "1.8/1", backgroundSize: "cover", backgroundPosition: "center" }}></div>
                    <div className="w-full border" style={{ backgroundImage: `url("${images[1]}")`, aspectRatio: "1.8/1", backgroundSize: "cover", backgroundPosition: "center" }}></div>
                </div>
                <div className="w-1/2">
                    <div className="w-full border" style={{ backgroundImage: `url("${images[2]}")`, aspectRatio: "1.8/1", backgroundSize: "cover", backgroundPosition: "center" }}></div>
                    <div className="w-full border" style={{ backgroundImage: `url("${images[3]}")`, aspectRatio: "1.8/1", backgroundSize: "cover", backgroundPosition: "center" }}></div>
                </div>
            </div>
        )
    }

    return <></>
}

const TweetPreview = ({ tweet, setTweet }: TweetPreviewProps) => {
    const [charsCount, setCharsCount] = useState(0)

    useEffect(() => {
        setCharsCount(getTweetLength(tweet))
    }, [])

    const headerRef = useRef(null)
    const bodyRef = useRef(null)
    const hashtagsRef = useRef(null)

    const getTweetLength = (tweet: Movie) => {
        const tweetText = tweet.head + tweet.body + tweet.hashtag + tweet.url
        return tweetText.length
    }

    const recalculateCharsCount = () => {
        const headerCurrent = headerRef?.current as unknown as HTMLDivElement
        const bodyCurrent = bodyRef?.current as unknown as HTMLDivElement
        const hashtagCurrent = hashtagsRef?.current as unknown as HTMLDivElement
        const totalChars = `${headerCurrent.textContent}${bodyCurrent.textContent}${hashtagCurrent.textContent}`
        setCharsCount(totalChars.length)
    }

    const updateTweet = (test: React.ChangeEvent<HTMLInputElement>) => {
        const name = test.target.dataset?.name as string
        const content = test.target.innerText
        recalculateCharsCount()
        setTweet(prev => {
            return {
                ...prev,
                [name]: content
            }
        })
    }

    return (
        <div className="w-full px-4 pt-5 pb-1 flex justify-center relative">
            <div className="bg-gray-bg rounded-xl w-full h-auto p-5">
                {tweet.later_id ? '🤖' : ''}
                <div ref={headerRef} data-name="head" style={{ whiteSpace: "pre-line" }} suppressContentEditableWarning contentEditable onInput={updateTweet} >
                    {tweet.head}
                </div>
                <div ref={bodyRef} data-name="body" style={{ whiteSpace: "pre-line" }} suppressContentEditableWarning contentEditable onInput={updateTweet}>
                    {tweet.body}
                </div>
                {
                    tweet.url ?
                        <div data-name="url" suppressContentEditableWarning contentEditable onInput={updateTweet} className="text-tw-blue">
                            {tweet.url}
                        </div>
                        : null
                }
                <br />
                <div ref={hashtagsRef} data-name="hashtag" suppressContentEditableWarning contentEditable className="text-tw-blue" onInput={updateTweet}>
                    {tweet.hashtag}
                </div>
                <div className="pt-3">
                    {TweetImagePreview(tweet.images)}
                </div>
            </div>
            <div className={`absolute right-2 top-2 w-12 h-12 rounded-full text-white flex justify-center place-items-center transition ${charsCount <= MAX_TWEET_CHARS ? "bg-tw-blue" : "bg-red-600"}`}>
                <div>{charsCount}</div>
            </div>
        </div>
    )
}

export default TweetPreview