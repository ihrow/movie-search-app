import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { MasonryLayout } from "./MasonryLayout";
import { AiOutlineArrowUp } from "react-icons/ai";

export function FilmsList({ setPage }) {
  const [isButtonToTopVisible, setIsButtonToTopVisible] = useState(false);
  const intersectionRef = useRef();
  const { films, loading, error } = useSelector((state) => state.films);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const onScroll = () => {
    if (window.scrollY > 1000) {
      setIsButtonToTopVisible(true);
    } else {
      setIsButtonToTopVisible(false);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
  },[]);

  useEffect(() => {
    if (!intersectionRef.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setPage((prevPage) => prevPage + 1);
      }
    });

    setTimeout(() => {
      observer.observe(intersectionRef.current);
    }, 1000);

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
      {isButtonToTopVisible && (
        <div className="fixed bottom-0 left-100 w-full text-2xl font-bold text-black mb-6">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded-full"
            onClick={scrollToTop}
          >
            <AiOutlineArrowUp fontSize={32} fontWeight='bold' />
          </button>
        </div>
      )}
      <div className="h-10 w-full" ref={intersectionRef} />
    </div>
  );
}
