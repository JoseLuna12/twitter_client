import { GetMovie } from "./getMovie";
import { generateTweetFromMovie } from "./movie";

export async function generateSoundtrack({name, id, options}: GetMovie){
    return generateTweetFromMovie({name, id, options}, "soundtrack")
}