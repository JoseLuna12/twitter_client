import { createContext, useState } from "react";

export type CurrentType = "movie" | "director"

export interface Movie {
    head: string,
    body: string,
    hashtag: string,
    url?: string,
    images: string[],
    later_id?: number
}

interface AllTweetsInterface {
    movie?: Movie,
    setMovie?: React.Dispatch<React.SetStateAction<Movie | undefined>>,
    currentType?: CurrentType,
    setCurrentType?: React.Dispatch<React.SetStateAction<CurrentType | undefined>>,
}
export const TwitterContext = createContext<AllTweetsInterface>({})