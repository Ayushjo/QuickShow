import { dummyShowsData } from "../assets/assets";
import BlurCircle from "../components/BlurCircle";
import MovieCard from "../components/MovieCard,";

const Movies = () => {
  return dummyShowsData.length > 0 ? (
    <BlurCircle>
      <div className="relative my-40 mb-60 px-6 md:px-16 lg:px-40 xl:px-44 overflow-hidden min-h-[80vh] ">
        <h1 className="text-lg font-medium my-4">Now Showing</h1>
        <div className="flex flex-wrap max-sm:justify-center gap-8">
          {dummyShowsData.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      </div>
    </BlurCircle>
  ) : (
    <BlurCircle><div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold text-center">No Movies Available</h1>
      </div></BlurCircle>
  );
};

export default Movies;
