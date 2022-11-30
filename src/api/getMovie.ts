import { CustomImages } from "../components/form/multipleImages"
import { Movie } from "../context/twitterContext"

export interface GetMovie {
    name?: string,
    id?: string,
    options?: {[key: string]: boolean | string},
    images?: CustomImages[]
}

const auth = import.meta.env.VITE_REQUEST_AUTH

export async function getMovie({name, id, options}: GetMovie){
    const data = await fetch(import.meta.env.VITE_BACKEND_URL+"/api/movie", {
        method: "POST",
        headers: {auth,'Content-Type': 'application/json',},
        body: JSON.stringify({name, id, options, type: 'list'})
    })
    const movie = await data.json()
    return movie as {movieTweet: Movie}
}

export async function getTweetById({id}: {id: string}){
    const data = await fetch(import.meta.env.VITE_BACKEND_URL+`/api/supabase/tweet/${id}`, {
        headers: {auth}
    })
    const tweet = await data.json()
    return tweet as Movie
}

export async function updateTweetById(id: string, tweet: Movie){
    const data = await fetch(import.meta.env.VITE_BACKEND_URL+`/api/supabase/tweet/${id}`, {
        method: "PUT",
        headers: {auth,'Content-Type': 'application/json',},
        body: JSON.stringify({tweet})
    })
    const tweetId = await data.json()
    return tweetId
}

export async function deleteTweetById(id: string){
    const data = await fetch(import.meta.env.VITE_BACKEND_URL+`/api/supabase/tweet/${id}`, {
        method: "DELETE",
        headers: {auth,'Content-Type': 'application/json',},
    })
    const tweetId = await data.json()
    return tweetId
}