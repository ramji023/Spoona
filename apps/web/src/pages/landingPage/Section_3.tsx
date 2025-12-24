import Profiles from "@repo/ui/components/ProfileIcon";
import { useFailureMsgStore } from "../../stores/failureMsgStore";
import { usePopularCreators } from "../../react_queries/queries";
import useMinLoader from "../../hooks/useMinLoader";
import { motion, AnimatePresence } from "motion/react";
import { UserCardSkeleton } from "../../loaders/Loaders";
import { useNavigate } from "react-router-dom";
export default function Section_3() {
  const navigate = useNavigate();
  // function to set the error message
  // const setFailureMsg = useFailureMsgStore((s) => s.setFailureMsg);
  const query = usePopularCreators();
  const { data, isLoading, error } = useMinLoader({ query, loadingTime: 800 });


  function moveToUserProfile(path: string) {
    navigate(path);
  }

  return (
    <>
      <div className="mx-25 my-10 p-2 font-poppins flex-col space-y-10">
        <div>
          <div className="font-semibold flex justify-between items-center">
            <h1 className="text-2xl">Popular Creators</h1>
            <span className="text-gray-400 text-md cursor-pointer hover:text-orange-400">
              See More
            </span>
          </div>
          <div className="text-lg text-gray-400 ">
            Explore the most followed and loved creators who are inspiring
            millions with their content, ideas, and passion. Dive into their
            profiles and discover why they stand out.
          </div>
        </div>
        {error ? <div className="text-3xl text-center  h-[100px]">Couldn't fetched the Popular creators</div> : 
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
                <Profiles data={data!} onMove={moveToUserProfile} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        }
        <div className="border border-gray-200"></div>
      </div>
    </>
  );
}
