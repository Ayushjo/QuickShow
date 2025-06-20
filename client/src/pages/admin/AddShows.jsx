import React, { useEffect, useState } from "react";
import { dummyShowsData } from "../../assets/assets";
import Loading from "../../components/Loading";
import { CheckIcon, CircleCheck, StarIcon } from "lucide-react";
import toast, { CheckmarkIcon } from "react-hot-toast";

const AddShows = () => {
  const currency = "$";
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [dateTimeSelection, setDateTimeSelection] = useState({});

  const [dateTimeInput, setDateTimeInput] = useState("");
  const [showPrice, setShowPrice] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchNowPlayingMovies = () => {
    setNowPlayingMovies(dummyShowsData);
    setLoading(false);
  };

  const handleDateTimeAdd = () => {
    if (!dateTimeInput) {
      toast.error("Please select a date and time first");
    } else {
      const [date, time] = dateTimeInput.split("T");
      setDateTimeSelection((prevDateTimeSelection) => {
        const times = prevDateTimeSelection[date] || [];
        if (!times.includes(time)) {
          return { ...prevDateTimeSelection, [date]: [...times, time] };
        } else {
          return prevDateTimeSelection;
        }
      });
    }
  };

  const handleRemoveTime = (date, time) => {
    setDateTimeSelection((prevDateTimeSelection) => {
      const filteredTimes = prevDateTimeSelection[date].filter(
        (t) => t !== time
      );
      if (filteredTimes.length === 0) {
        const newObj = {...prevDateTimeSelection}

        delete newObj[date]

        return newObj
      } else {
        return {
          ...prevDateTimeSelection,
          [date]: [...filteredTimes],
        };
      }
    });
  };

  useEffect(() => {
    fetchNowPlayingMovies();
  }, []);
  return !loading ? (
    <div>
      <h1 className="text-2xl">
        Add <span className="text-primary underline">Shows</span>
      </h1>
      <p className="mt-10 text-lg font-medium">Now Playing Movies</p>
      <div className="overflow-x-auto pb-4">
        <div className="group flex flex-wrap gap-4 mt-4 w-max">
          {nowPlayingMovies.map((movie, index) => (
            <div
              key={movie.id}
              onClick={() => setSelectedMovie(movie.id)}
              className={`relative max-w-40 cursor-pointer group-hover:opacity-30 hover:!opacity-100 hover:-translate-y-1 transition duration-300`}
            >
              {selectedMovie === movie.id && (
                <CheckIcon className="w-6 h-6  text-white bg-primary/80 top-1 right-1 absolute rounded-md aspect-square z-50 " />
              )}
              <div className="rounded-lg overflow-hidden relative">
                <img
                  src={movie.poster_path}
                  className="w-full object-cover brightness-90"
                  alt=""
                />

                <div className="text-sm flex items-center justify-between p-2 bg-black/70 w-full absolute bottom-0 left-0">
                  <p className="flex items-center gap-1 text-gray-400">
                    <StarIcon className="w-4 h-4 text-primary fill-primary" />
                    {movie.vote_average.toFixed(1)}
                  </p>
                  <p className="text-gray-300">
                    {(movie.vote_count / 100).toFixed(0)} Votes
                  </p>
                </div>
              </div>
              <p className="font-medium truncate">{movie.title}</p>
              <p className="text-gray-400 text-sm">{movie.release_date}</p>
            </div>
          ))}
        </div>
      </div>
      {/*Show Price Input */}
      <div className="mt-8">
        <label className="block text-sm font-medium mb-2">Show Price</label>
        <div className="inline-flex items-center gap-2 border border-gray-600 px-3 py-2 rounded-md">
          <p className="text-gray-400 text-sm">{currency}</p>
          <input
            type="number"
            min={0}
            value={showPrice}
            onChange={(e) => setShowPrice(e.target.value)}
            placeholder="Enter show Price"
            className="outline-none bg-black"
          />
        </div>
      </div>
      {/*Date Time Selection */}
      <div className="mt-6">
        <label className="block text-sm font-medium mb-2">
          Select Date and Time
        </label>
        <div className="inline-flex gap-5 border border-gray-600 p-1 pl-3 rounded-lg bg-black">
          <input
            type="datetime-local"
            value={dateTimeInput}
            onChange={(e) => setDateTimeInput(e.target.value)}
            className="outline-none rounded-md  text-white bg-transparent "
          />
          <button
            onClick={handleDateTimeAdd}
            className="bg-primary/90 text-white px-3 py-2 text-sm rounded-lg hover:bg-primary cursor-pointer"
          >
            Add Time
          </button>
        </div>
      </div>
      {/*Display Slected Times */}
      <div className="mt-6">
        {Object.keys(dateTimeSelection).length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">
              Selected Show Times
            </h3>
            {Object.entries(dateTimeSelection).map(([date, times]) => (
              <div
                key={date}
                className="bg-gray-900/50 border border-gray-700 rounded-lg p-4"
              >
                <h4 className="text-sm font-medium text-gray-300 mb-3">
                  {new Date(date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {times.map((time) => (
                    <div
                      key={time}
                      className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 text-primary px-3 py-1.5 rounded-md text-sm"
                    >
                      <span>{time}</span>
                      <button
                        onClick={() => handleRemoveTime(date, time)}
                        className="text-red-400 hover:text-red-300 ml-1"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <button className="bg-primary text-white px-8 py-2 mt-6 rounded hover:bg-primary-dull transition-all cursor-pointer">Add Show</button>
    </div>
  ) : (
    <Loading />
  );
};

export default AddShows;
