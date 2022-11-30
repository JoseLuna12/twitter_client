import { Movie } from "../context/twitterContext"
import { GetMovie } from "./getMovie"
import { generateTweetFromMovie } from "./movie"

export async function generateCinematography({name, id, options, images}: GetMovie){
    return generateTweetFromMovie({name, id, options, images}, "cinematography")
}