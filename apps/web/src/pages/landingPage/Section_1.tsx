import { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { categoriesMap } from "../../utils/ingredientsMap";
import { CategoryCard } from "@repo/ui/components/CategoryCard";
import { useNavigate } from "react-router-dom";
export default function Section_1() {
  return (
    <>
      <div className="mx-25 my-10 p-2 font-poppins flex-col space-y-10">
        <div>
          <div className="font-semibold flex justify-between items-center">
            <h1 className="text-2xl"> Recipe Categories</h1>
            <span className="text-gray-400 text-md font-semibold cursor-pointer hover:text-orange-400">
              See More
            </span>
          </div>
          <div className="text-lg text-gray-400 ">
            Explore a variety of handpicked recipe categories to match every
            mood, meal, and moment.
          </div>
        </div>
        <div>
          <CategorySection categories={categoriesMap} />
        </div>
        <div className="border border-gray-200"></div>
      </div>
    </>
  );
}

// category component
export function CategorySection({
  categories,
}: {
  categories: Record<string, string>;
}) {
  const navigate = useNavigate()
  // apply scrollable effect based on pixals not content
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    checkScroll();
    const container = scrollContainerRef.current;
    container?.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    return () => {
      container?.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.firstElementChild?.clientWidth || 200;
      const gap = 24; // 6 in tailwind = 24px
      const scrollAmount = (cardWidth + gap) * 3; // Scroll 3 cards at a time

      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };


  // function to navigate desired path
  function onMove(path:string,value:any){
     navigate(path,{state:value})
  }
  return (
    <div className="relative">
      {/* Left Arrow - Only show when can scroll */}
      {canScrollLeft && (
        <motion.button
          onClick={() => scroll("left")}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{
            scale: 1.15,
            backgroundColor: "rgba(249, 115, 22, 0.1)",
          }}
          whileTap={{ scale: 0.9 }}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/95 backdrop-blur-sm rounded-full p-1.5 shadow-md border border-gray-200 hover:bg-gray-600 transition-colors"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-4 h-4 text-gray-700" strokeWidth={2.5} />
        </motion.button>
      )}

      {/* Scrollable Categories Container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-scroll scroll-smooth px-2 scrollbar-hide"
      >
        {Object.entries(categories).map(([categoryName, imagePath], index) => (
          <motion.div
            key={categoryName}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.05,
              duration: 0.4,
              ease: "easeOut",
            }}
            className="flex-shrink-0"
          >
            <CategoryCard categoryName={categoryName} imagePath={imagePath} onMove={onMove}/>
          </motion.div>
        ))}
      </div>

      {/* Right Arrow - Only show when can scroll */}
      {canScrollRight && (
        <motion.button
          onClick={() => scroll("right")}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{
            scale: 1.15,
            backgroundColor: "rgba(249, 115, 22, 0.1)",
          }}
          whileTap={{ scale: 0.9 }}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/95 backdrop-blur-sm rounded-full p-1.5 shadow-md border border-gray-200 hover:bg-gray-600 transition-colors"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-4 h-4 text-gray-700 " strokeWidth={2.5} />
        </motion.button>
      )}
    </div>
  );
}
