import {
  createBrowserRouter,
} from "react-router-dom";
import AllTweets from "../pages/allTweets";
import Cinematography from "../pages/NewCinematography";
import NewDirector from "../pages/NewDirector";
import NewMovie from "../pages/NewMovie";
import NewPerson from "../pages/NewPerson";
import NewSoundtrack from "../pages/NewSoundtrack";
import TweetPreviewPage from "../pages/tweetPreviewPage";
import TweetHome from "../pages/tweetsHome";
import PalettePage from "../pages/palette";

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
    path: "/tweets",
    element: <AllTweets />
  },
  {
    path: "/preview/:tweetId",
    element: <TweetPreviewPage />,
  },
  {
    path: "/palette",
    element: <PalettePage />,
  },
]);

export default tweetRouter