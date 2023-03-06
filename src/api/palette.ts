import { CustomImages } from "../components/form/multipleImages"
import { Movie } from "../context/twitterContext"

export interface GetMovie {
    name?: string,
    id?: string,
    options?: { [key: string]: boolean | string },
    images?: CustomImages[]
}

const auth = import.meta.env.VITE_REQUEST_AUTH

export async function generatePaletteTweetForMovie({ name, id, options, images }: GetMovie, type = "palette") {
    const data = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/movie", {
        method: "POST",
        headers: { auth, 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ name, id, options, images, type })
    })
    const movie = await data.json()
    return movie as { movieTweet: Movie }
}