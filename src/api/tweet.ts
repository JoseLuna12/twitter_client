const auth = import.meta.env.VITE_REQUEST_AUTH

export async function tweetMovieById(id: string){
    return fetch(import.meta.env.VITE_BACKEND_URL+"/api/tweet", {
        method: "POST",
        headers: {auth,'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        body: JSON.stringify({id})
    })
}