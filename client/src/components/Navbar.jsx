import React, { useState } from "react";
import { assets } from "../assets/assets";
import { Heading1, MenuIcon, Search, TicketPlus, User, XIcon } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import {motion} from "framer-motion"
const Navbar = () => {
  // State to control mobile menu visibility
  const [isOpen, setIsOpen] = useState(false);
  const {user} = useUser()
  const {openSignIn} = useClerk()
  const navigate=  useNavigate()
  return (
    <>
      {/* Main Navbar Container - Fixed positioning with backdrop blur */}
      <div className="fixed top-0 left-0 z-50 flex w-full justify-between items-center px-4 sm:px-6 md:px-16 lg:px-36 py-3 sm:py-5 bg-transparent backdrop-blur-sm ">
        {/* Logo Section - Always visible */}
        <Link to={"/"} className="flex-shrink-0">
          <motion.img
            src={assets.logo}
            alt="Logo"
            className="w-24 sm:w-32 md:w-36 h-auto"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
              delay: 0.3,
            }}
          />
        </Link>

        {/* Desktop Navigation Menu - Hidden on mobile/tablet, visible on desktop */}
        <motion.div
          className="hidden md:flex bg-white/10 backdrop-blur-md rounded-full px-6 lg:px-12 py-3 lg:py-4 border border-white/10 gap-4 lg:gap-6 items-center"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
            delay: 0.5,
          }}
        >
          <Link
            to={"/"}
            className="text-sm lg:text-base hover:text-white/80 transition-colors"
          >
            <motion.span
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: 0.6,
              }}
            >
              Home
            </motion.span>
          </Link>
          <Link
            to={"/movies"}
            className="text-sm lg:text-base hover:text-white/80 transition-colors"
          >
            <motion.span
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: 0.7,
              }}
            >
              Movies
            </motion.span>
          </Link>
          <Link
            to={"/"}
            className="text-sm lg:text-base hover:text-white/80 transition-colors"
          >
            <motion.span
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: 0.8,
              }}
            >
              Theatres
            </motion.span>
          </Link>
          <Link
            to={"/"}
            className="text-sm lg:text-base hover:text-white/80 transition-colors"
          >
            <motion.span
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: 0.9,
              }}
            >
              Releases
            </motion.span>
          </Link>
          <Link
            to={"/favourite"}
            className="text-sm lg:text-base hover:text-white/80 transition-colors"
          >
            <motion.span
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: 1,
              }}
            >
              Favourites
            </motion.span>
          </Link>
        </motion.div>

        {/* Right Side Controls */}
        <motion.div
          className="flex gap-3 sm:gap-4 md:gap-8 items-center"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
            delay: 0.8,
          }}
        >
          {/* Search Icon - Hidden on mobile, visible on larger screens */}
          <Search className="hidden sm:block w-5 h-5 md:w-6 md:h-6 cursor-pointer hover:text-white/80 transition-colors" />

          {/* Login Button - Always visible but responsive sizing */}
          {!user ? (
            <button
              onClick={openSignIn}
              className="px-3 py-1 sm:px-4 sm:py-1 md:px-7 md:py-2 bg-primary hover:bg-primary-dull transition-all rounded-full font-medium cursor-pointer text-xs sm:text-sm md:text-base"
            >
              Log In
            </button>
          ) : (
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="My Bookings"
                  labelIcon={<TicketPlus width={15} />}
                  onClick={() => navigate("/my-bookings")}
                />
              </UserButton.MenuItems>
            </UserButton>
          )}

          {/* Mobile Menu Toggle - Only visible on mobile/tablet */}
          {isOpen ? (
            <XIcon
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden w-6 h-6 sm:w-7 sm:h-7 cursor-pointer hover:text-white/80 transition-colors"
            />
          ) : (
            <MenuIcon
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden w-6 h-6 sm:w-7 sm:h-7 cursor-pointer hover:text-white/80 transition-colors"
            />
          )}
        </motion.div>
      </div>

      {/* Mobile Menu Overlay - Only visible when isOpen is true */}
      {isOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Background Overlay - Darkens the background */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)} // Close menu when clicking on overlay
          />

          {/* Mobile Menu Content */}
          <div className="absolute top-20 left-4 right-4 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden">
            {/* Mobile Navigation Links */}
            <div className="flex flex-col">
              <Link
                to={"/"}
                onClick={() => setIsOpen(false)} // Close menu when link is clicked
                className="px-6 py-4 text-base hover:bg-white/10 transition-colors border-b border-white/10 last:border-b-0"
              >
                Home
              </Link>
              <Link
                to={"/movies"}
                onClick={() => setIsOpen(false)}
                className="px-6 py-4 text-base hover:bg-white/10 transition-colors border-b border-white/10 last:border-b-0"
              >
                Movies
              </Link>
              <Link
                to={"/"}
                onClick={() => setIsOpen(false)}
                className="px-6 py-4 text-base hover:bg-white/10 transition-colors border-b border-white/10 last:border-b-0"
              >
                Theaters
              </Link>
              <Link
                to={"/"}
                onClick={() => setIsOpen(false)}
                className="px-6 py-4 text-base hover:bg-white/10 transition-colors border-b border-white/10 last:border-b-0"
              >
                Releases
              </Link>
              <Link
                to={"/favourite"}
                onClick={() => setIsOpen(false)}
                className="px-6 py-4 text-base hover:bg-white/10 transition-colors border-b border-white/10 last:border-b-0"
              >
                Favourites
              </Link>

              {/* Mobile Search Option */}
              <div className="px-6 py-4 flex items-center gap-3 hover:bg-white/10 transition-colors cursor-pointer">
                <Search className="w-5 h-5" />
                <span className="text-base">Search</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
