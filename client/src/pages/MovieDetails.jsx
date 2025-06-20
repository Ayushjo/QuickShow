import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dummyDateTimeData, dummyShowsData } from "../assets/assets";
import BlurCircle from "../components/BlurCircle";
import {
  Dot,
  Heart,
  PlayCircle,
  PlayCircleIcon,
  PlayIcon,
  StarIcon,
} from "lucide-react";
import { timeFormat } from "../lib/timeFormat";
import DateSelect from "../components/DateSelect";
import MovieCard from "../components/MovieCard,";
import Loading from "../components/Loading";

const MovieDetails = () => {
  const navigate = useNavigate()
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const getShow = async () => {
    const show = dummyShowsData.find((show) => show._id === id);
    if(show){
      setShow({
      movie: show,
      dateTime: dummyDateTimeData,
    });
    }
    else{
      setShow(null)
    }
    
  };
  useEffect(() => {
    getShow();
  }, [id]);
  return show ? (
    <div className="px-6 md:px-16 lg:px-40 pt-32 md:pt-44 ">
      <BlurCircle>
        <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto relative z-5">
          <img
            src={show.movie.poster_path}
            alt=""
            className="max-md:mx-auto rounded-xl max-w-72 object-cover h-96"
          />
          <div className="relative flex flex-col gap-3">
            <p className="text-primary">ENGLISH</p>
            <h1 className="text-4xl font-semibold max-w-96 text-balance">
              {show.movie.title}
            </h1>
            <div className="flex items-center gap-2 text-gray-300">
              <StarIcon className="w-5 h-5 text-primary fill-primary" />
              {show.movie.vote_average.toFixed(1)} User Rating
            </div>
            <p className="text-gray-400 mt-2 text-sm leading-tight max-w-xl">
              {show.movie.overview}
            </p>
            <p>
              {timeFormat(show.movie.runtime)}
              <Dot className="inline" />
              {show.movie.genres.map((genre) => genre.name).join(", ")}
              <Dot className="inline" /> {show.movie.release_date.split("-")[0]}
            </p>
            <div className="flex items-center flex-wrap gap-4 mt-4">
              <button className="flex items-center gap-2 px-7 py-3 text-sm bg-gray-800 hover:bg-gray-900 transition rounded-md font-medium cursor-pointer active:scale-95">
                <PlayCircleIcon className="w-5 h-5" />
                Watch Trailer
              </button>
              <a
                href="#dateSelect"
                className="px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition-none rounded-md font-medium cursor-pointer active:scale-95"
              >
                Buy Tickets
              </a>
              <button className="bg-gray-700 p-2.5 rounded-full transition-none cursor-pointer active:scale-95">
                <Heart className={`w-5 h-5 `} />
              </button>
            </div>
          </div>
        </div>
        <p className="text-lg font-medium mt-20">Your Favourite Cast</p>
        <div className="overflow-x-auto no-scrollbar mt-8 pb-4">
          <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-10 xl:grid-cols-12 items-center gap-6  w-max px-4">
            {show.movie.casts.slice(0, 12).map((cast, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center"
              >
                <img
                  src={cast.profile_path}
                  alt=""
                  className="rounded-full h-20 md:h-20 aspect-square object-cover"
                />
                <p className=" text-md">{cast.name}</p>
              </div>
            ))}
          </div>
        </div>
      </BlurCircle>
      <DateSelect dateTime={show.dateTime} movieId={id} />

      <BlurCircle>
        <div className="relative z-10">
          <p className="text-lg font-medium mt-12 mb-8">You May Also Like</p>
          <div className="flex flex-wrap max-sm:justify-center gap-8">
            {dummyShowsData.slice(0, 4).map((movie, index) => (
              <MovieCard movie={movie} key={index} />
            ))}
          </div>
          <div className="flex items-center justify-center mt-16">
            <button onClick={()=>{navigate("/movies");
              scrollTo(0,0);
            }} className="bg-primary hover:bg-primary-dull rounded px-8 py-3 text-sm font-medium ">Show More</button>
          </div>
          
        </div>
      </BlurCircle>
    </div>
  ) : (
    <Loading />
  );
};

export default MovieDetails;
