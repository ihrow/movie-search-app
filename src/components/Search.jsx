import { useCallback } from "react";
import { motion } from "framer-motion";
import { AiOutlineSearch } from "react-icons/ai";
import { fadeIn } from "../utils/motion";

export function Search({ searchQuery, setSearchQuery }) {
  const handleChange = useCallback(
    (e) => {
      setSearchQuery(e.target.value);
    },
    [setSearchQuery]
  );

  return (
    <div className="my-6 flex w-full items-center justify-center text-center md:my-16 ">
      <motion.div
        variants={fadeIn("up", "tween", 0.2, 0.3)}
        initial="hidden"
        animate="show"
        whileHover={{ scale: 1.05 }}
        className="relative flex h-20 w-full items-center justify-start md:w-1/2"
      >
        <AiOutlineSearch className="absolute ml-3 text-black dark:text-white" fontSize={32} />
        <motion.input
          className="h-16 w-full rounded-lg border border-black bg-white px-12 text-lg font-bold text-black placeholder:font-medium placeholder:italic placeholder:text-black focus:outline-none dark:bg-[#222] dark:text-white dark:border-white dark:placeholder:text-white"
          type="text"
          placeholder="Star Wars..."
          value={searchQuery}
          onChange={handleChange}
        />
      </motion.div>
    </div>
  );
}
