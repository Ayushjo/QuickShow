import React from "react";
import { assets } from "../assets/assets";
import { ArrowRight, CalendarIcon, ClockIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {motion} from "framer-motion"
const HeroSection = () => {
    const navigate = useNavigate()
  return (
    <div className='flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-36 bg-[url("/backgroundImage.png")] bg-cover bg-center h-screen'>
      <motion.img
        src={assets.marvelLogo}
        alt=""
        className="max-h-11 lg:h-11 mt-20"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.6 }}
      />
      <motion.h1
        className="text-5xl md:text-[70px] md:leading-tight font-semibold max-w-110"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.7 }}
      >
        Guardians <br /> of the Galaxy
      </motion.h1>

      <div className="flex items-center gap-4 text-gray-300">
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
          Action | Adventure | Sci-Fi
        </motion.span>
        <motion.div
          className="flex items-center gap-1"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
            delay: 0.9,
          }}
        >
          <CalendarIcon className="w-4.5 h-4.5" /> 2018
        </motion.div>
        <motion.div
          className="flex items-center gap-1"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
            delay: 1,
          }}
        >
          <ClockIcon className="w-4.5 h-4.5" /> 2h 8m
        </motion.div>
      </div>
      <motion.p
        className="max-w-md text-gray-300"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.9 }}
      >
        In a post-apocalyptic world where cities ride on wheels and consume each
        other to survive, two people meet in London and try to stop a
        conspiracy.
      </motion.p>
      <motion.button
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 10, delay: 1 }}
        whileTap={{scale:0.8}}
        onClick={() => navigate("/movies")}
        className="flex items-center gap-1 px-6 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer"
      >
        Expore Movies
        <ArrowRight className="w-5 h-5" />
      </motion.button>
    </div>
  );
};

export default HeroSection;
