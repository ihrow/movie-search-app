import { useEffect } from "react";
import { motion } from "framer-motion";
import { getHigherResolutionImage } from "../helpers/image.js";
import { useActions } from "../hooks/useActions";
import { fadeIn } from "../utils/motion";
import { useNavigate } from "react-router-dom";
import noPoster from "../assets/no-poster.jpg";
import { validateIsStringApplicable } from "../helpers/string.js";

export function FilmsListItem({ idx, film }) {
  const navigate = useNavigate();
  const { fetchFilmPlot } = useActions();

  /**
   * As basic search request doesn't return plot,
   * we need to fetch it separately for each film.
   */
  useEffect(() => {
    fetchFilmPlot(film.imdbID);
  }, []);

  return (
    <motion.div
      className="my-6 w-full cursor-pointer rounded-lg border-gray-700 bg-gray-800 shadow-lg md:my-8"
      variants={fadeIn(idx % 2 === 0 ? "right" : "left", "spring", 0.2, 0.5)}
      initial="hidden"
      whileInView="show"
      whileHover={{ scale: 1.05 }}
      onClick={() => {
        navigate(`/${film.imdbID}`);
      }}
    >
      <img
        className="w-full rounded-t-lg"
        src={
          validateIsStringApplicable(film.Poster)
            ? getHigherResolutionImage(film.Poster, 1000)
            : noPoster
        }
        alt="Film Poster"
      />
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
          {film.Title}
        </h5>
        <p className="mb-3 text-sm font-semibold text-gray-200">
          {`Released: ${film.Year}`}
        </p>
        <p className="mb-3 font-normal text-white">
          {validateIsStringApplicable(film.Plot)
            ? film.Plot
            : "No plot available"}
        </p>
      </div>
    </motion.div>
  );
}
