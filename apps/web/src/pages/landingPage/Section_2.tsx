import { CommunitySection } from "@repo/ui/components/CommunitySection";
import { useAllCommunities } from "../../react_queries/queries";
import { useNavigate } from "react-router-dom";
import { CommunityCardSkeleton } from "../../loaders/Loaders";
import { motion, AnimatePresence } from "motion/react";
export default function Section_2() {
  const navigate = useNavigate();
  function moveToCommunity(path: string) {
    navigate(path);
  }
  const { data, isLoading, error } = useAllCommunities();

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
        <div className="flex flex-row justify-center">
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
        <div className="border border-gray-200"></div>
      </div>
    </>
  );
}
