import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ImageSlider() {
  const [index, setIndex] = useState(1);
  const [key, setKey] = useState(0); // force re-render for AnimatePresence
  const totalImages = 30;

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => {
        const nextIndex = (prevIndex % totalImages) + 1;
        setKey(nextIndex); // update key to re-render motion.img
        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const formattedIndex = String(index).padStart(2, "0");
  const src = `./screenshots/${formattedIndex}.png`;

  return (
    <div className="sm:hidden absolute w-full h-full overflow-hidden opacity-20">
      <AnimatePresence mode="wait">
        <motion.img
          key={key}
          src={src}
          alt={`Screenshot ${formattedIndex}`}
          className="object-cover w-full h-full "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        />
      </AnimatePresence>
    </div>
  );
}
