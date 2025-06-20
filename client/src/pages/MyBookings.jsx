import { useEffect, useState } from "react";
import BlurCircle from "../components/BlurCircle";
import { dummyBookingData } from "../assets/assets";
import Loading from "../components/Loading";
import { timeFormat } from "../lib/timeFormat";
import { dateFormat } from "../lib/dateFotmat";

const MyBookings = () => {
  const currency = "$";
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getMyBookings = async () => {
    setBookings(dummyBookingData);
    setIsLoading(false);
  };

  useEffect(() => {
    getMyBookings();
  }, []);
  return !isLoading ? (
    <BlurCircle>
      <div className="relative z-10 px-6 md:px-16 lg:px-40 pt-32 md:pt-40 min-h-[80vh]">
        <h1 className="text-lg font-semibold mb-4">My Bookings</h1>

        {bookings.map((movies, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row gap-2 bg-primary/10 border border-primary/20 rounded-lg mt-8  p-2 max-w-3xl hover:scale-105 transition duration-500 "
          >
            <img
              src={movies.show.movie.poster_path}
              alt=""
              className="md:max-w-44 aspect-video min-h-48 object-cover object-bottom rounded"
            />
            <div className="flex justify-between w-full flex-1 ">
              <div className="flex flex-col p-4 mt-auto mb-auto">
                <p className="text-lg font-semibold">
                  {movies.show.movie.title}
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  {timeFormat(movies.show.movie.runtime)}
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  {dateFormat(movies.show.showDateTime)}
                </p>
              </div>
              <div className="flex flex-col p-4 mt-auto mb-auto text-right items-end ">
                <p className="text-2xl font-semibold flex gap-3 items-center justify-center">{currency}{movies.amount}{!movies.isPaid && <button className="bg-primary px-3 py-1.5 rounded-full  text-sm text-center font-medium">Pay Now</button>}</p>
                
                <p className="mt-2 text-gray-400 text-sm">Total Tickets: <span className="text-white">{movies.bookedSeats.length}</span></p>
                <p className="text-gray-400 text-sm mt-2">Seat number: {movies.bookedSeats.map((seat)=>(
                  <span className="text-white">{seat}{movies.bookedSeats.length>1 && movies.bookedSeats[movies.bookedSeats.length-1]!==seat?",":null}</span>
                ))}</p>

              </div>
            </div>
          </div>
        ))}
      </div>
    </BlurCircle>
  ) : (
    <Loading />
  );
};

export default MyBookings;
