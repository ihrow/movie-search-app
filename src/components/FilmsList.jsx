import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { MasonryLayout } from "./MasonryLayout";

export function FilmsList({ setPage }) {
  const intersectionRef = useRef();
  const { films, loading, error } = useSelector((state) => state.films);

  useEffect(() => {
    if (!intersectionRef.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setPage((prevPage) => prevPage + 1);
      }
    });

    observer.observe(intersectionRef.current);

    document.addEventListener("DOMContentLoaded", () => {
      return () => {
        observer.disconnect();
      };
    });
  }, [intersectionRef.current]);

  if (error) {
    return (
      <h3 className="mt-5 text-2xl font-bold text-red-600">
        {error === "Incorrect IMDb ID." ? "Enter movie name." : error}
        <div className="h-10 w-full" ref={intersectionRef} />
      </h3>
    );
  }

  return (
    <div className="flex flex-row flex-wrap items-center justify-center">
      {!error && <MasonryLayout films={films} />}
      {loading && (
        <div className="h-8 w-full text-center text-2xl font-bold text-black">
          Loading...
        </div>
      )}
      <div className="h-10 w-full" ref={intersectionRef} />
    </div>
  );
}
