import {
  createBrowserRouter,
} from "react-router-dom";
import Cinematography from "../pages/NewCinematography";
import NewDirector from "../pages/NewDirector";
import NewMovie from "../pages/NewMovie";
import NewPerson from "../pages/NewPerson";
import NewSoundtrack from "../pages/NewSoundtrack";
import TweetPreviewPage from "../pages/tweetPreviewPage";
import TweetHome from "../pages/tweetsHome";

const tweetRouter = createBrowserRouter([
  {
    path: "/",
    element: <TweetHome />,
  },
  {
    path: "/movie",
    element: <NewMovie />
  },
  {
    path: "/cinematography",
    element: <Cinematography />
  },
  {
    path: "/soundtrack",
    element: <NewSoundtrack />
  },
  {
    path: "/director",
    element: <NewDirector />
  },
  {
    path: "/person",
    element: <NewPerson />
  },
  {
    path: "/preview/:tweetId",
    element: <TweetPreviewPage />,
  }
]);

export default tweetRouter