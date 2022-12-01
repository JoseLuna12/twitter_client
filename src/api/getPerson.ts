import { CustomImages } from "../components/form/multipleImages"
import { Movie } from "../context/twitterContext"

export interface GetMovie {
    name?: string,
    id?: string,
    options?: {[key: string]: boolean | string},
    images?: CustomImages[]
}

const auth = import.meta.env.VITE_REQUEST_AUTH

export async function getPerson({name, id, options, images}: GetMovie, type ="director"){
    const data = await fetch(import.meta.env.VITE_BACKEND_URL+"/api/person", {
        method: "POST",
        headers: {auth,'Content-Type': 'application/json',},
        body: JSON.stringify({name, id, options, images, type})
    })
    const movie = await data.json()
    if(options?.Thread){
        return movie as {movieTweet: Movie[]}
    }
    return movie as {movieTweet: Movie}
}