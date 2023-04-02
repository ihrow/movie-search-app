import Masonry from "react-masonry-css";
import { FilmsListItem } from "./FilmsListItem";

const breakpointObj = {
  default: 4,
  4000: 8,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
};

export function MasonryLayout({ films }) {
  /**
   * Since every poster has different size, we will use Masonry to render the list
   */
  return (
    <Masonry
      className="mb-5 flex overflow-x-hidden"
      columnClassName="mx-3"
      breakpointCols={breakpointObj}
    >
      {films.map((film, idx) => (
        <FilmsListItem key={film.imdbID} idx={idx} film={film} />
      ))}
    </Masonry>
  );
}
