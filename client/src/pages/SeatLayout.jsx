import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BlurCircle from "../components/BlurCircle";

import { assets, dummyDateTimeData, dummyShowsData } from "../assets/assets";
import Loading from "../components/Loading";
import { AlignRightIcon, ArrowRightIcon, ClockIcon } from "lucide-react";
import toast from "react-hot-toast";

const SeatLayout = () => {
  const { id, date } = useParams();

  const [selectedSeat, setSelectedSeat] = useState([]);

  const [selectedTimings, setSelectedTimings] = useState(null);

  const [show, setShow] = useState(null);

  const navigate = useNavigate();

  const getShow = async () => {
    const show = dummyShowsData.find((show) => show._id === id);
    if (show) {
      setShow({
        movie: show,
        dateTime: dummyDateTimeData,
      });
    }
  };

  const alertExceedBookings = () => {
    if (selectedSeat.length === 6) {
      toast("You can only select 5 seats");
      setSelectedSeat((prevSelectedSeats) => {
        const newestSeat = [...prevSelectedSeats][0];
        const newSelectedSeats = prevSelectedSeats.filter(
          (seat) => seat !== newestSeat
        );
        return newSelectedSeats;
      });
    }
  };

  useEffect(() => {
    alertExceedBookings();
  }, [selectedSeat]);

  useEffect(() => {
    getShow();
  }, [id]);

  const array1 = ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9"];
  const array2 = ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9"];
  const array3 = ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9"];
  const array4 = ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9"];
  const array5 = ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9"];
  const array6 = ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9"];
  const array7 = ["G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9"];
  const array8 = ["H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9"];
  const array9 = ["I1", "J2", "I3", "I4", "I5", "I6", "I7", "I8", "I9"];
  const array10 = ["J1", "I2", "J3", "J4", "J5", "J6", "J7", "J8", "J9"];

  const seatSelectionHandler = (item)=>{
    if(!selectedTimings){
      toast("Please select timings first")
    }
    else{
      setSelectedSeat((prevSelectedSeats) => {
        const copyPreviousSelectedSeats = [...prevSelectedSeats];
        const seat = copyPreviousSelectedSeats.find((seat) => seat === item);
        if (seat) {
          const newSeatsArray = copyPreviousSelectedSeats.filter(
            (seatings) => seatings !== seat
          );
          return newSeatsArray;
        } else {
          return [item, ...prevSelectedSeats];
        }
      });
    }
  }

  return show ? (
    <BlurCircle>
      <div className="relative z-10 flex flex-col md:flex-row px-4 sm:px-6 md:px-16 lg:px-40 py-16 sm:py-24 md:py-32 md:pt-52">
        {/*Available timings */}
        <div className="w-full md:w-60 bg-primary/10 border border-primary/20 rounded-lg py-6 md:py-10 h-max md:sticky md:top-30 mb-8 md:mb-0">
          <p className="text-base sm:text-lg font-semibold px-4 sm:px-6">
            Available Timings
          </p>
          <div className="flex flex-row md:flex-col mt-3 md:mt-5 overflow-x-auto md:overflow-x-visible gap-2 md:gap-0 px-4 sm:px-6 md:px-0">
            {show.dateTime[date].map((item, index) => (
              <div
                onClick={() => {
                  setSelectedTimings(item.time);
                }}
                className={`flex items-center gap-2 px-4 sm:px-6 py-3 min-w-max rounded-md md:rounded-r-md cursor-pointer transition mt-0 md:mt-4 hover:bg-primary/20 ${
                  selectedTimings === item.time ? "bg-primary" : null
                }`}
                key={index}
              >
                <ClockIcon className="w-4 h-4" />
                <p className="text-sm whitespace-nowrap">
                  {item.time.slice(11, 16)} PM
                </p>
              </div>
            ))}
          </div>
        </div>

        {/*Seats Layout */}
        <div className="relative flex-1 flex flex-col items-center">
          <h1 className="text-xl sm:text-2xl font-semibold mb-4 text-center">
            Select Your Seats
          </h1>
          <img src={assets.screenImage} alt="" className="max-w-full h-auto" />
          <p className="text-gray-400 text-sm mb-6">SCREEN SIDE</p>
          <div className="flex flex-col mt-8 sm:mt-12 w-full max-w-4xl overflow-x-auto">
            <div className="grid grid-cols-9 grid-rows-2 gap-1.5 sm:gap-2.5 mx-auto min-w-max">
              {array1.map((item, index) => (
                <span
                  onClick={() => seatSelectionHandler(item)}
                  key={index}
                  className={`flex items-center justify-center aspect-square rounded border-2 border-primary/20 w-6 h-6 sm:w-8 sm:h-8 text-xs sm:text-sm text-center text-gray-200 cursor-pointer ${
                    selectedSeat.find((seat) => seat === item)
                      ? "bg-primary"
                      : null
                  }`}
                >
                  {item}
                </span>
              ))}
              {array2.map((item, index) => (
                <span
                  onClick={() => seatSelectionHandler(item)}
                  key={index}
                  className={`flex items-center justify-center aspect-square rounded border-2 border-primary/20 w-6 h-6 sm:w-8 sm:h-8 text-xs sm:text-sm text-center text-gray-200 cursor-pointer ${
                    selectedSeat.find((seat) => seat === item)
                      ? "bg-primary"
                      : null
                  }`}
                >
                  {item}
                </span>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mt-8 sm:mt-12 overflow-x-auto">
              <div className="grid grid-cols-9 grid-rows-2 gap-1.5 sm:gap-2.5 mx-auto min-w-max">
                {array3.map((item, index) => (
                  <span
                    onClick={() => seatSelectionHandler(item)}
                    key={index}
                    className={`flex items-center justify-center aspect-square rounded border-2 border-primary/20 w-6 h-6 sm:w-8 sm:h-8 text-xs sm:text-sm text-center text-gray-200 cursor-pointer ${
                      selectedSeat.find((seat) => seat === item)
                        ? "bg-primary"
                        : null
                    }`}
                  >
                    {item}
                  </span>
                ))}
                {array4.map((item, index) => (
                  <span
                    onClick={() => seatSelectionHandler(item)}
                    key={index}
                    className={`flex items-center justify-center aspect-square rounded border-2 border-primary/20 w-6 h-6 sm:w-8 sm:h-8 text-xs sm:text-sm text-center text-gray-200 cursor-pointer ${
                      selectedSeat.find((seat) => seat === item)
                        ? "bg-primary"
                        : null
                    }`}
                  >
                    {item}
                  </span>
                ))}
              </div>
              <div className="grid grid-cols-9 grid-rows-2 gap-1.5 sm:gap-2.5 mx-auto min-w-max">
                {array5.map((item, index) => (
                  <span
                    onClick={() => seatSelectionHandler(item)}
                    key={index}
                    className={`flex items-center justify-center aspect-square rounded border-2 border-primary/20 w-6 h-6 sm:w-8 sm:h-8 text-xs sm:text-sm text-center text-gray-200 cursor-pointer ${
                      selectedSeat.find((seat) => seat === item)
                        ? "bg-primary"
                        : null
                    }`}
                  >
                    {item}
                  </span>
                ))}
                {array6.map((item, index) => (
                  <span
                    onClick={() => seatSelectionHandler(item)}
                    key={index}
                    className={`flex items-center justify-center aspect-square rounded border-2 border-primary/20 w-6 h-6 sm:w-8 sm:h-8 text-xs sm:text-sm text-center text-gray-200 cursor-pointer ${
                      selectedSeat.find((seat) => seat === item)
                        ? "bg-primary"
                        : null
                    }`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mt-8 sm:mt-12 overflow-x-auto">
              <div className="grid grid-cols-9 grid-rows-2 gap-1.5 sm:gap-2.5 mx-auto min-w-max">
                {array7.map((item, index) => (
                  <span
                    onClick={() => seatSelectionHandler(item)}
                    key={index}
                    className={`flex items-center justify-center aspect-square rounded border-2 border-primary/20 w-6 h-6 sm:w-8 sm:h-8 text-xs sm:text-sm text-center text-gray-200 cursor-pointer ${
                      selectedSeat.find((seat) => seat === item)
                        ? "bg-primary"
                        : null
                    }`}
                  >
                    {item}
                  </span>
                ))}
                {array8.map((item, index) => (
                  <span
                    onClick={() => seatSelectionHandler(item)}
                    key={index}
                    className={`flex items-center justify-center aspect-square rounded border-2 border-primary/20 w-6 h-6 sm:w-8 sm:h-8 text-xs sm:text-sm text-center text-gray-200 cursor-pointer ${
                      selectedSeat.find((seat) => seat === item)
                        ? "bg-primary"
                        : null
                    }`}
                  >
                    {item}
                  </span>
                ))}
              </div>
              <div className="grid grid-cols-9 grid-rows-2 gap-1.5 sm:gap-2.5 mx-auto min-w-max">
                {array9.map((item, index) => (
                  <span
                    onClick={() => seatSelectionHandler(item)}
                    key={index}
                    className={`flex items-center justify-center aspect-square rounded border-2 border-primary/20 w-6 h-6 sm:w-8 sm:h-8 text-xs sm:text-sm text-center text-gray-200 cursor-pointer ${
                      selectedSeat.find((seat) => seat === item)
                        ? "bg-primary"
                        : null
                    }`}
                  >
                    {item}
                  </span>
                ))}
                {array10.map((item, index) => (
                  <span
                    onClick={() => seatSelectionHandler(item)}
                    key={index}
                    className={`flex items-center justify-center aspect-square rounded border-2 border-primary/20 w-6 h-6 sm:w-8 sm:h-8 text-xs sm:text-sm text-center text-gray-200 cursor-pointer ${
                      selectedSeat.find((seat) => seat === item)
                        ? "bg-primary"
                        : null
                    }`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <button onClick={()=>navigate("/my-bookings")} className="bg-primary hover:bg-primary-dull rounded-3xl px-8 py-3 mt-20 flex items-center text-sm font-bold gap-2 group  ">
            Proceed to Checkout
            <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition duration-300 " />
          </button>
        </div>
      </div>
    </BlurCircle>
  ) : (
    <Loading />
  );
};

export default SeatLayout;
