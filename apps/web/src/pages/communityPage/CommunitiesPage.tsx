import { motion, AnimatePresence } from "motion/react";
import { CommunitySection } from "@repo/ui/components/CommunitySection";
import { LeftArrowIcon } from "@repo/ui/icons/LeftArrowIcon";
import Button from "@repo/ui/components/Button";
import { Plus } from "lucide-react";
import { useState } from "react";
import CommunityForm from "./CommunityForm";
import { useAllCommunities } from "../../react_queries/queries";
import { useNavigate } from "react-router-dom";
import { CommunityCardSkeleton } from "../../loaders/Loaders";
import { useFailureMsgStore } from "../../stores/failureMsgStore";
import useMinLoader from "../../hooks/useMinLoader";
import Err from "../../errors/ErrorBoundary";
export default function CommunitiesPage() {
  // function to set the error message
  const setFailureMsg = useFailureMsgStore((s) => s.setFailureMsg);
  const navigate = useNavigate();
  // react query to fetch all the communities data
  const query = useAllCommunities()
  const { data, isLoading, error } = useMinLoader({query,loadingTime:800});

  // manage state to open the community form
  const [formOpen, setFormClose] = useState(false);

  // console.log(filteredCommunity);
  // function to navigate to the given path
  function moveToCommunity(path: string) {
    navigate(path);
  }

  if (error) {
    setFailureMsg("Can't get communities for you. Please try again.");
    return <Err/>
  }
  return (
    <>
      <div className="mx-40 my-10 p-2">
        {/* main div  */}
        <div className="flex justify-between items-center py-8">
          <div className="flex items-center gap-1 ">
            <div
              onClick={() => {
                navigate(-1);
              }}
              className="w-10 h-10 rounded-full cursor-pointer hover:bg-gray-100 flex justify-center items-center font-semibold"
            >
              <LeftArrowIcon />
            </div>
            <h1 className="text-3xl font-semibold">Communities</h1>
          </div>
          <div>
            <Button onClick={() => setFormClose(true)}>
              <div className="flex items-center gap-1 font-normal">
                <Plus />
                <span>Create Your Community</span>
              </div>
            </Button>
          </div>
        </div>
        {/* first div  */}
        <div className="font-poppins flex-col space-y-10 py-4">
          <div>
            <div className="font-semibold flex justify-between items-center">
              <h1 className="text-2xl">Discover New Communities</h1>
              <span className="text-gray-400 text-md cursor-pointer hover:text-orange-400">
                See More
              </span>
            </div>
            <div className="text-lg text-gray-400 ">
              Join passionate cooks, bakers, and eaters sharing recipes and
              stories.
            </div>
          </div>
          <div className="flex flex-row justify-center items-center">
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
                      width="w-[200px]"
                      height="h-[250px]"
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
                    width="w-[200px]"
                    height="h-[250px]"
                    data={data!}
                    onMove={moveToCommunity}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        {/* second div  */}
        <div className="font-poppins flex-col space-y-10 py-4 my-10">
          <div>
            <div className="font-semibold flex justify-between items-center">
              <h1 className="text-2xl">Quick & Simple</h1>
              <span className="text-gray-400 text-md cursor-pointer hover:text-orange-400">
                See More
              </span>
            </div>
            <div className="text-lg text-gray-400 ">
              Join passionate cooks, bakers, and eaters sharing recipes and
              stories.
            </div>
          </div>
          <div className="flex flex-row justify-center items-center">
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
                      width="w-[200px]"
                      height="h-[250px]"
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
                    width="w-[200px]"
                    height="h-[250px]"
                    data={data!}
                    onMove={moveToCommunity}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* third div  */}
        <div className="font-poppins flex-col space-y-10 py-4 my-10">
          <div>
            <div className="font-semibold flex justify-between items-center">
              <h1 className="text-2xl">Healthy</h1>
              <span className="text-gray-400 text-md cursor-pointer hover:text-orange-400">
                See More
              </span>
            </div>
            <div className="text-lg text-gray-400 ">
              Join passionate cooks, bakers, and eaters sharing recipes and
              stories.
            </div>
          </div>
          <div className="flex flex-row justify-center items-center">
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
                      width="w-[200px]"
                      height="h-[250px]"
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
                    width="w-[200px]"
                    height="h-[250px]"
                    data={data!}
                    onMove={moveToCommunity}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* open popup model */}
        {formOpen && (
          <CommunityForm open={formOpen} close={() => setFormClose(false)} />
        )}
      </div>
    </>
  );
}
