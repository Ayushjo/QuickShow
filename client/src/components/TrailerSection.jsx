import React, { useState } from "react";
import BlurCircle from "./BlurCircle";
import { dummyTrailers } from "../assets/assets";
import ReactPlayer from "react-player";
import { PlayCircleIcon } from "lucide-react";
const TrailerSection = () => {
  const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0]);
  return (
    <BlurCircle>
      <div className="px-6 md:px-16 lg:px-24 xl:px-44 py-20 overflow-hidden">
        <p className="text-gray-300 font-medium text-lg max-w-[960px] mx-auto md:mt-8 md:mb-8">
          Trailers
        </p>
        <div className="relative mt-6">
          <ReactPlayer
            url={currentTrailer.videoUrl}
            controls={false}
            className="mx-auto max-w-full"
            width="960px"
            height="540px"
          />
        </div>
        {/* Main container: Grid with 4 columns, centered, with responsive gaps */}
        <div className="grid md:grid-cols-4 grid-cols-2  gap-4 md:gap-8 mt-12 max-w-3xl mx-auto group md:mt-16">
          {dummyTrailers.map((trailer) => (
            <div
              key={trailer.image}
              onClick={() => setCurrentTrailer(trailer)}
              className="
        relative 
        cursor-pointer 
        h-60 
        transition-all 
        duration-300 
        hover:translate-y-1 
        group-hover:opacity-50 
        hover:!opacity-100
      "
            >
              {/* Trailer thumbnail image */}
              <img
                src={trailer.image}
                alt="Trailer thumbnail"
                className="
          w-full 
          h-full 
          object-cover 
          rounded-lg 
          brightness-75
        "
              />

              {/* Play button overlay - centered */}
              <PlayCircleIcon
                strokeWidth={1.6}
                className="
          absolute 
          top-1/2 
          left-1/2 
          transform 
          -translate-x-1/2 
          -translate-y-1/2 
          w-5 
          h-5 
          md:w-8 
          md:h-8
        "
              />
            </div>
          ))}
        </div>
      </div>
    </BlurCircle>
  );
};

export default TrailerSection;
