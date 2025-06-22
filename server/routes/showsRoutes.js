import { Router } from "express";
import { addShowToDatabase, fetchNowPlayingMovies, getShows, singleShows } from "../controllers/showControllers.js";
import { protectAdmin } from "../middlewares/auth.js";
import { requireAuth } from "@clerk/express";


const router = Router()


router.route("/now-playing").get(fetchNowPlayingMovies)
router.route("/add-shows").post(addShowToDatabase)
router.route("/get-allShows").get(getShows)
router.route("/get-singleShow").post(singleShows)
export default router