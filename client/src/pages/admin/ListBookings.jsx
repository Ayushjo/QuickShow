import { useEffect, useState } from "react";
import { assets, dummyBookingData } from "../../assets/assets";
import Loading from "../../components/Loading";
import { dateFormat } from "../../lib/dateFotmat";
import BlurCircle from "../../components/BlurCircle";

const ListBookings = () => {
  const currency = "$";

  const [bookings, setBookings] = useState([]);

  const [loading, setLoading] = useState(true);

  const getAllBookings = () => {
    setBookings(dummyBookingData);
    setLoading(false);
  };

  useEffect(() => {
    getAllBookings();
  }, []);

  return !loading ? (
    <div>
      <h1 className="text-2xl">
        List <span className="text-primary underline">Bookings</span>
      </h1>

      <div className="max-w-4xl mt-6 overflow-x-auto">
        <table className="w-full border-collapse rounded-md overflow-hidden text-nowrap">
          <thead className="bg-primary/20 text-left text-white">
            <tr className="text-base">
              <th className="p-2 font-medium pl-5">User Name</th>
              <th className="p-2 font-medium ">Movie Name</th>
              <th className="p-2 font-medium ">Show Time</th>
              <th className="p-2 font-medium ">Seats</th>
              <th className="p-2 font-medium ">Amount</th>
            </tr>
          </thead>
          <tbody className="text-sm font-light">
            {bookings.map((show, index) => (
              <tr
                key={index}
                className="border-b border-primary/10 bg-primary/5 even:bg-primary/10"
              >
                <td className="p-2 min-w-45 pl-5">{show.user.name}</td>
                <td className="p-2 ">{show.show.movie.title}</td>
                <td className="p-2 ">{dateFormat(show.show.showDateTime)}</td>
                <td className="p-2 ">
                  {show.bookedSeats.map(
                    (seat) =>
                      `${seat}${
                        show.bookedSeats.length > 1 &&
                        show.bookedSeats[show.bookedSeats.length - 1] !== seat
                          ? ","
                          : ""
                      }`
                  )}
                </td>
                <td className="p-2 ">
                  {currency}
                  {show.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default ListBookings;
