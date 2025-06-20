import {
  ChartLineIcon,
  CircleDollarSign,
  icons,
  PlayCircleIcon,
  StarIcon,
  StarsIcon,
  UsersIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { dummyDashboardData } from "../../assets/assets";
import Loading from "../../components/Loading.jsx";
import BlurCircle from "../../components/BlurCircle";
import { dateFormat } from "../../lib/dateFotmat";

const Dashboard = () => {
  const currency = "$";
  const [dashboardData, setDashboardData] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    activeShows: [],
    totalUser: 0,
  });

  const [loading, setLoading] = useState(true);

  const dashboardCards = [
    {
      title: "Total Bookings",
      value: dashboardData.totalBookings || "0",
      icon: ChartLineIcon,
    },
    {
      title: "Total Revenue",
      value: `$${dashboardData.totalRevenue}` || "0",
      icon: CircleDollarSign,
    },
    {
      title: "Active Shows",
      value: dashboardData.activeShows.length || [],
      icon: PlayCircleIcon,
    },
    {
      title: "Total Users",
      value: dashboardData.totalUser || "0",
      icon: UsersIcon,
    },
  ];

  const fetchDashboardData = async () => {
    setDashboardData(dummyDashboardData);
    setLoading(false);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);
  return !loading ? (
    <>
      <h1 className="text-2xl">
        Admin <span className="text-primary underline">Dashboard</span>
      </h1>

      <div className="mt-8 flex flex-wrap gap-4 relative z-10">
        {dashboardCards.map((item, index) => (
          <div
            key={index}
            className="flex gap-8 items-center justify-center bg-primary/20 px-4 py-3 rounded-md border border-primary/10 max-w-56 w-full"
          >
            <div className="flex flex-col items-start">
              <h1 className=" font-medium">{item.title}</h1>

              <p className="text-xl">{item.value}</p>
            </div>
            <item.icon className="w-6 h-6" />
          </div>
        ))}
      </div>
      <p className="mt-10 text-lg font-medium">Active Shows</p>
      <div className="relative flex flex-wrap gap-6 mt-4 max-w-5xl">
        {dashboardData.activeShows.map((item, index) => (
          <div
            key={item.id}
            className="w-56 rounded-lg overflow-hidden h-full pb-3 bg-primary/10 border border-primary/20 hover:translate-y-1 duration-300"
          >
            <img
              src={item.movie.poster_path}
              className="h-60 w-full object-cover"
              alt=""
            />
            <p className="text-sm font-mediumn p-2 truncate">
              {item.movie.title}
            </p>
            <div className="flex justify-between items-center px-2">
              <p className="text-lg font-medium">
                {currency}
                {item.showPrice}
              </p>
              <p className="flex text-sm text-gray-300 gap-1 ">
                <StarIcon className="w-5 h-5 text-primary fill-primary" />
                <p>{item.movie.vote_average.toFixed(1)}</p>
              </p>
            </div>
            <p className="text-sm text-gray-400 px-2 pt-2">
              {dateFormat(item.showDateTime)}
            </p>
          </div>
        ))}
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Dashboard;
