import { GetMovie } from "./getMovie"
import { getPerson } from "./getPerson"


export async function generatePerson({name, id, options, images}: GetMovie){
    return getPerson({name, id, options, images}, "person")
}