import React from "react";
import BlurCircle from "./BlurCircle";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const DateSelect = ({ dateTime, movieId }) => {
  const [isClicked, setIsClicked] = useState(null);
  const navigate = useNavigate();
  const bookingsHandler = () => {
    if (!isClicked) {
      return toast("Please select a date");
    } else {
      navigate(`/movies/${movieId}/${isClicked}`);
      scrollTo(0,0)
    }
  };
  return (
    <BlurCircle>
      <div
        id="dateSelect"
        className="flex flex-col md:flex-row items-center justify-between gap-10 relative p-8 bg-primary/10 border border-primary/20 rounded-lg z-10 mt-12"
      >
        <div>
          <p className="text-lg font-semibold">Choose Date</p>
          <div className="flex items-center gap-6 text-sm mt-5">
            <ChevronLeftIcon width={28} />
            <span className="grid grid-cols-3 md:flex md:flex-wrap md:max-w-lg gap-4">
              {Object.keys(dateTime).map((date, index) => (
                <button
                  onClick={() => setIsClicked(date)}
                  key={index}
                  className={`flex flex-col items-center justify-center h-14 w-14 aspect-square rounded cursor-pointer ${
                    isClicked === date ? "bg-primary" : null
                  } `}
                >
                  <span>{new Date(date).getDate()}</span>
                  <span>
                    {new Date(date).toLocaleDateString("en-US", {
                      month: "short",
                    })}
                  </span>
                </button>
              ))}
            </span>
            <ChevronRightIcon width={28} />
          </div>
          <button onClick={bookingsHandler} className="bg-primary hover:bg-primary-dull/90 text-white px-8 py-2 mt-6 rounded transition-all cursor-pointer">
            Book Now
          </button>
        </div>
      </div>
    </BlurCircle>
  );
};

export default DateSelect;
