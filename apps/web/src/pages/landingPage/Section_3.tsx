import { usePopularCreators } from "../../react_queries/queries";
import useMinLoader from "../../hooks/useMinLoader";
import { motion, AnimatePresence } from "motion/react";
import { UserCardSkeleton } from "../../loaders/Loaders";
import { useNavigate } from "react-router-dom";
import { PopularCreator } from "../../types/user";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAuthStore } from "../../stores/authStore";
export default function Section_3() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated); // state to check wheather user is authenticated or not
  const navigate = useNavigate();
  // function to set the error message
  // const setFailureMsg = useFailureMsgStore((s) => s.setFailureMsg);
  const query = usePopularCreators();
  const { data, isLoading, error } = useMinLoader({ query, loadingTime: 800 });

  function moveToUserProfile(path: string) {
    navigate(path);
  }

  // if user is authenticated then filter out data
  const filteredData =
    isAuthenticated && data
      ? data.filter((c) => c.id !== useAuthStore.getState().id)
      : data;
  return (
    <>
      <div className="mx-25 my-10 p-2 font-poppins flex-col space-y-10">
        <div>
          <div className="font-semibold flex justify-between items-center">
            <h1 className="text-2xl">Popular Creators</h1>
            <span
              onClick={() => navigate("creators")}
              className="text-gray-400 text-md cursor-pointer hover:text-orange-400"
            >
              See More
            </span>
          </div>
          <div className="text-lg text-gray-400 ">
            Explore the most followed and loved creators who are inspiring
            millions with their content, ideas, and passion. Dive into their
            profiles and discover why they stand out.
          </div>
        </div>
        {error ? (
          <div className="text-3xl text-center  h-[100px]">
            Couldn't fetched the Popular creators
          </div>
        ) : (
          <div>
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
                    <UserCardSkeleton key={i} />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="community-section"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Profiles data={filteredData!} onMove={moveToUserProfile} />
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

// profiles component to render popular creators data
function Profiles({
  data,
  onMove,
}: {
  data: PopularCreator[];
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
  }, [data]);

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
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/95 backdrop-blur-sm rounded-full p-1.5 shadow-md border border-gray-200 hover:bg-gray-100 transition-colors"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-4 h-4 text-gray-700" strokeWidth={2.5} />
        </motion.button>
      )}

      {/* Scrollable Profiles Container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto scroll-smooth px-2 scrollbar-hide"
      >
        {data.map((user, index) => (
          <motion.div
            key={user.id || index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.05,
              duration: 0.4,
              ease: "easeOut",
            }}
            className="flex-shrink-0"
          >
            <ProfileCard user={user} onMove={onMove} />
          </motion.div>
        ))}
      </div>

      {/* Right Arrow */}
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
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/95 backdrop-blur-sm rounded-full p-1.5 shadow-md border border-gray-200 hover:bg-gray-100 transition-colors"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-4 h-4 text-gray-700" strokeWidth={2.5} />
        </motion.button>
      )}
    </div>
  );
}

// component to show profileCard to user
function ProfileCard({ user,onMove }: { user: PopularCreator ,onMove:(path:string)=>void}) {
   const followingData = useAuthStore((s)=>s.followingData) // user following data
  return (
    <>
      <div
      onClick={()=>{
        onMove(`creators/${user.id}`)
      }}
      className="cursor-pointer w-[160px] h-[180px] rounded-2xl group border border-gray-300 hover:border-orange-400 flex flex-col items-center justify-around hover:shadow-xl">
        <div className="overflow-hidden w-[90px]] h-[90px] rounded-full mt-1">
          <img
            src={
              user.profileImage ??
              `https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y`
            }
            // alt={user.username}
            className="w-[90px] h-full transition-transform duration-300 group-hover:scale-120 ease-in-out object-cover"
          />
        </div>
        <div className="w-full text-center text-sm text-black group-hover:text-orange-400">
          {user.username}
        </div>
        <div >
          <button className="bg-orange-400 py-1 px-4 text-sm text-white rounded-lg hover:bg-orange-500">
             {followingData?.includes(user.id) ? "Unfollow" : "Follow"}
          </button>
        </div>
      </div>
    </>
  );
}
