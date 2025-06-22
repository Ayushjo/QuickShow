import axios from "axios";
import { response } from "express";
import { Movie } from "../models/Movie.js";
import { Shows } from "../models/Shows.js";

export const fetchNowPlayingMovies = async (req, res) => {
  try {
    const url = "https://api.themoviedb.org/3/movie/now_playing";
    const headers = {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDBB_API_KEY}`,
    };

    const { data } = await axios.get(url, { headers });
    const movies = data.results;
    res.status(200).json(movies);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

//Api to add a new Show to Show database

export const addShowToDatabase = async (req, res) => {
  try {
    const headers = {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDBB_API_KEY}`,
    };
    const { movieId, showsInput, showPrice } = req.body;

    let movie = await Movie.findById(movieId);

    if (!movie) {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}`,
        {
          headers,
        }
      );
      const movieApiData = data;

      const movieCreditsResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/credits`,
        { headers }
      );

      const movieCreditsData = movieCreditsResponse.data;

      const movieDetails = {
        _id: movieId,
        title: movieApiData.title,
        overview: movieApiData.overview,
        poster_path: movieApiData.poster_path,
        backdrop_path: movieApiData.backdrop_path,
        genres: movieApiData.genres,
        casts: movieCreditsData.cast,
        release_date: movieApiData.release_date,
        original_language: movieApiData.original_language,
        tagline: movieApiData.tagline || "",
        vote_average: movieApiData.vote_average,
        runtime: movieApiData.runtime,
      };
      movie = await Movie.create(movieDetails);
    }

    const showsToCreate = [];

    Object.entries(showsInput).forEach((show) => {
      const showDate = show[0];
      show[1].forEach((time) => {
        const dateTimeString = `${showDate}T${time}`;
        showsToCreate.push({
          movie: movieId,
          showDateTime: new Date(dateTimeString),
          showPrice,
          occupiedSeats: {},
        });
      });
    });

    let show;

    if (showsToCreate.length > 0) {
      show = await Shows.insertMany(showsToCreate);
    }

    res.status(200).json({ message: "Shows Added Succesfully", data: show });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

export const getShows = async (req, res) => {
  try {
    const shows = await Shows.find({ showDateTime: { $gte: new Date() } })
      .populate("movie")
      .sort({ showDateTime: 1 });

    const uniqueShows = new Map();

    shows.forEach((show) => {
      const movieId = show.movie._id.toString();

      if (!uniqueShows.has(movieId)) {
        uniqueShows.set(movieId, show);
      }
    });

    const uniqueShowsArray = Array.from(uniqueShows.values());

    return res
      .status(200)
      .json({ message: "Shows fetched Successfully", data: uniqueShowsArray });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const singleShows = async (req, res) => {
  try {
    const { id } = req.body;

    const shows = await Shows.find({
      movie: id,
      showDateTime: { $gte: new Date() },
    })
      .populate("movie")
      .sort({ showDateTime: 1 });

    return res.status(200).json({meesage:"Shows fetched successfully",data:shows})
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};
