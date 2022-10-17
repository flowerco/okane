import { PieChartColorList1 } from "../../values/customColors";
import { MinPieChart } from "../widgets/MinPieChart";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectSubs } from "../../redux/subsSlice";
import { SetStateAction, useEffect, useState } from "react";
import { fetchSubs } from "../../redux/subsSlice";
import { Loading } from "../widgets/Loading";
import { Error } from "../widgets/Error";
import { ItemList } from "../widgets/ItemList";
import { useNavigate } from "react-router-dom";
import {
  SubscriptionType,
  YoutubeItem,
  YoutubeRequest,
} from "../../values/customTypes";
import { YoutubeEmbed } from "../widgets/YoutubeEmbed";
import { stringify } from "querystring";

export const YoutubeScreen = () => {
  const [status, setStatus] = useState("idle");
  const [embedId, setEmbedId] = useState("8BccvFe_EoE");
  const [playlist, setPlaylist] = useState([] as YoutubeItem[]);

  const YOUTUBE_PLAYLIST_API_URL =
    "https://www.googleapis.com/youtube/v3/playlistItems";
  const getYoutubeProps = async () => {
    try {
      console.log(
        "API key url: ",
        `${YOUTUBE_PLAYLIST_API_URL}?key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
      );
      const res = await fetch(
        `${YOUTUBE_PLAYLIST_API_URL}?part=snippet&playlistId=PLBi4zMBuGwfHM9FGT42hdXHddBy3mzIMe&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
      );
      const output: YoutubeRequest = await res.json();
      console.log("Youtube fetched data: ", output.items);
      setStatus("success");
      return output.items;
    } catch (err) {
      setStatus("failed");
      console.log("Error in Youtube fetch: ", err);
    }
  };

  const handleClick = (id: string) => {
    setEmbedId(id);
  };

  useEffect(() => {
    if (status === "idle") {
      setStatus("loading");
      getYoutubeProps().then((data) => setPlaylist(data!));
    }
  }, [status]);

  if (status === "loading") {
    return <Loading />;
  }
  if (status === "failed") {
    return <Error error={"Error!"} />;
  }

  return (
    <div className="grid grid-cols-1 grid-rows-2 h-full w-full justify-items-center text-white sm:grid-cols-3 sm:grid-rows-1 sm:py-6">
      <div className="flex flex-col justify-center text-center w-full max-w-3xl px-3 space-y-4 sm:-mt-24 sm:col-span-2">
        <h1 className="mt-3 text-3xl font-semibold">Okané on Youtube</h1>
        <p className="text-md">
          {" "}
          Welcome to the Okané youtube channel. Your number one source for
          inspirational, motivational videos to help you on your saving journey!
        </p>
        <YoutubeEmbed embedId={embedId} />
      </div>
      <ul className="flex flex-col w-full max-w-3xl pb-10 px-3 space-y-3">
        <p className="text-2xl font-bold py-3 px-3 sm:px-0 sm:text-xl">The Official Okané Playlist:</p>
        <div className="flex flex-col w-full overflow-auto pl-12 sm:pl-0 sm:max-h-[70vh]">
          {playlist.map((item) => {
            const { id, snippet } = item;
            const { title, thumbnails, resourceId } = snippet;
            const { medium } = thumbnails;
            const { videoId } = resourceId;
            return (
              <li
                key={id}
                onClick={() => handleClick(videoId)}
                className="flex justify-between items-center px-6 py-6 mb-6 rounded-xl border-2 border-white cursor-pointer hover:border-yellow-600 sm:flex-col"
              >
                <p className="text-xl font-semibold sm:text-lg">{title}</p>
                <p>
                  <img
                    className="rounded-lg"
                    width={medium.width}
                    height={medium.height}
                    src={medium.url}
                    alt=""
                  />
                </p>
              </li>
            );
          })}
        </div>
      </ul>
    </div>
  );
};
