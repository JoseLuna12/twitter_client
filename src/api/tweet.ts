const auth = import.meta.env.VITE_REQUEST_AUTH

export async function tweetMovieById(id: string) {
    return fetch(import.meta.env.VITE_BACKEND_URL + "/api/tweet", {
        method: "POST",
        headers: { auth, 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ id })
    })
}

export async function getTweets() {
    return fetch(import.meta.env.VITE_BACKEND_URL + "/api/supabase/tweets", {
        headers: { auth, 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    })
}

export async function getLaterTweets() {
    return fetch(import.meta.env.VITE_BACKEND_URL + "/api/supabase/later_tweets", {
        headers: { auth, 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    })
}

export async function retweetById(tweetId: string) {
    return fetch(import.meta.env.VITE_BACKEND_URL + "/api/tweet/retweet/" + tweetId, {
        headers: { auth, 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    })
}