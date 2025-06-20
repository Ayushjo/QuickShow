import { UserButton } from "@clerk/clerk-react";
import React from "react";
import { assets } from "../../assets/assets";
import { LayoutDashboard, List, ListCollapse, SquarePlus } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { isPrimaryPointer } from "framer-motion";

const AdminSidebar = () => {
  const user = {
    firstName: "Admin",
    lastName: "User",
    imageUrl: assets.profile,
  };
  return (
    <div className="h-[calc(100vh-64px)] md:flex flex-col items-center pt-8 max-w-14 md:max-w-60 w-full border-r border-gray-300/20 text-sm   ">
      <img
        src={user.imageUrl}
        className="h-9 md:h-14 w-9 md:w-14 rounded-full mx-auto"
        alt=""
      />
      <h1 className=" mt-2 text-base max-md:hidden">
        {user.firstName} {user.lastName}
      </h1>

      <div className="w-full">
        <NavLink to={"/admin/"} end
          className={({ isActive }) =>
            `relative flex items-center max-md:justify-center gap-2 w-full py-2.5 md:pl-10 first:mt-6  text-gray-400 ${
              isActive && "bg-primary/15 text-primary group"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <LayoutDashboard className="w-5 h-5" />
              <h1 className="max-md:hidden">Dashboard</h1>
              <span className={`w-1.5 h-10 rounded-l right-0 absolute ${isActive&&"bg-primary"}`}></span>
            </>
          )}
        </NavLink>
        <NavLink to={"/admin/add-shows"}
          className={({ isActive }) =>
            `relative flex items-center max-md:justify-center gap-2 w-full py-2.5 md:pl-10 first:mt-6 text-gray-400 ${
              isActive && "bg-primary/15 text-primary group"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <SquarePlus className="w-5 h-5" />
              <h1 className="max-md:hidden">Add Shows</h1>
              <span className={`w-1.5 h-10 rounded-l right-0 absolute ${isActive&&"bg-primary"}`}></span>
            </>
          )}
        </NavLink>
        <NavLink to={"/admin/list-shows"}
          className={({ isActive }) =>
            `relative flex items-center max-md:justify-center gap-2 w-full py-2.5 md:pl-10 first:mt-6 text-gray-400 ${
              isActive && "bg-primary/15 text-primary group"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <List className="w-5 h-5" />
              <h1 className="max-md:hidden">List Shows</h1>
              <span className={`w-1.5 h-10 rounded-l right-0 absolute ${isActive&&"bg-primary"}`}></span>
            </>
          )}
        </NavLink>
        <NavLink to={"/admin/list-bookings"}
          className={({ isActive }) =>
            `relative flex items-center max-md:justify-center gap-2 w-full py-2.5 md:pl-10 first:mt-6 text-gray-400 ${
              isActive && "bg-primary/15 text-primary group"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <ListCollapse className="w-5 h-5" />
              <h1 className="max-md:hidden">List Bookings</h1>
              <span className={`w-1.5 h-10 rounded-l right-0 absolute ${isActive&&"bg-primary"}`}></span>
            </>
          )}
        </NavLink>
        
        
      </div>
    </div>
  );
};

export default AdminSidebar;
