import './App.css'
import {
  RouterProvider,
} from "react-router-dom";
import tweetRouter from './routes'
import { Movie, TwitterContext, CurrentType } from './context/twitterContext'
import { useState } from 'react';

function App() {

  const [movie, setMovie] = useState<Movie>()
  const [type, setType] = useState<CurrentType>()

  return (
    <TwitterContext.Provider value={{ movie, setMovie, currentType: type, setCurrentType: setType, }}>
      <RouterProvider router={tweetRouter} />
    </TwitterContext.Provider>
  )
}

export default App
