import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useAllCommunities } from "../../react_queries/queries";
import useMinLoader from "../../hooks/useMinLoader";
import { CommunityCardSkeleton } from "../../loaders/Loaders";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CommunityCard } from "@repo/ui/components/CommunitySection";

export default function Section_2() {
  const navigate = useNavigate();

  function moveToCommunity(path: string) {
    navigate(path);
  }

  const query = useAllCommunities();
  const { data, isLoading, error } = useMinLoader({ query, loadingTime: 800 });

  return (
    <>
      <div className="mx-25 my-10 p-2 font-poppins flex-col space-y-10">
        <div>
          <div className="font-semibold flex justify-between items-center">
            <h1 className="text-2xl">Discover Communities</h1>
            <span className="text-gray-400 text-md cursor-pointer hover:text-orange-400">
              See More
            </span>
          </div>
          <div className="text-lg text-gray-400 ">
            Join passionate cooks, bakers, and eaters sharing recipes and
            stories.
          </div>
        </div>
        {error ? (
          <div className="text-3xl text-center h-[100px]">
            Couldn't fetched the communities
          </div>
        ) : (
          <div className="w-full overflow-hidden">
            {" "}
            {/* Added width constraint and overflow hidden */}
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="skeleton"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-wrap justify-start gap-6"
                >
                  {Array.from({ length: 6 }).map((_, i) => (
                    <CommunityCardSkeleton
                      key={i}
                      width="w-[150px]"
                      height="h-[150px]"
                    />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="community-section"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full"
                >
                  <CommunitySection
                    width="w-[150px]"
                    height="h-[150px]"
                    data={data!}
                    onMove={moveToCommunity}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
        <div className="border border-gray-200"></div>
      </div>
    </>
  );
}



// here is community section will be showing  in landing page
export function CommunitySection({
  width,
  height,
  data,
  onMove,
}: {
  width: string;
  height: string;
  data: {
    id: string;
    name: string;
    coverImage: string;
    CommunityMembers: {
      user: {
        profileImage: string | null;
      };
    }[];
  }[];
  onMove: (path: string) => void;
}) {
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
  }, [data]); // Added data dependency to recheck when data loads

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth - 100;

      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative w-full max-w-full">
      {/* Left Arrow */}
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
          className="absolute left-0 top-20 -translate-y-1/2 z-20 bg-white/95 backdrop-blur-sm rounded-full p-1.5 shadow-md border border-gray-200 hover:bg-gray-100 transition-colors"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-4 h-4 text-gray-700" strokeWidth={2.5} />
        </motion.button>
      )}
      {/* scrollable communities container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto scroll-smooth px-2 scrollbar-hide"
      >
        {data.map((community, index) => (
          <motion.div
            key={community.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.05,
              duration: 0.4,
              ease: "easeOut",
            }}
            className="flex-shrink-0"
          >
            <CommunityCard
              key={index}
              community={community}
              width={width}
              height={height}
              move={onMove}
            />
          </motion.div>
        ))}
      </div>
      {/* right arrow */}
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
          className="absolute right-0 top-20 -translate-y-1/2 z-20 bg-white/95 backdrop-blur-sm rounded-full p-1.5 shadow-md border border-gray-200 hover:bg-gray-100 transition-colors"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-4 h-4 text-gray-700" strokeWidth={2.5} />
        </motion.button>
      )}
    </div>
  );
}
