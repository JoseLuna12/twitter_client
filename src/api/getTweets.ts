import { getTweets, retweetById } from "./tweet";

export async function getAllTweets() {
    const tweets = await getTweets()
    return tweets.json()
}

export async function retweetByTweetId(id: string) {
    const response = await retweetById(id)
    return response.json()
}