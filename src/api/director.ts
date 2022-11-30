import { Movie } from "../context/twitterContext"
import { getDirector } from "./getDirector"
import { GetMovie } from "./getMovie"
import { generateTweetFromMovie } from "./movie"

export async function generateDirector({name, id, options, images}: GetMovie){
    return getDirector({name, id, options, images})
}