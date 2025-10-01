import { CommunitySection } from "@repo/ui/components/CommunitySection";
import { LeftArrowIcon } from "@repo/ui/icons/LeftArrowIcon";
import Button from "@repo/ui/components/Button";
import { Plus } from "lucide-react";
import {useState } from "react";
import CommunityForm from "./CommunityForm";
import { useAllCommunities } from "../../react_queries/queries";
import { useNavigate } from "react-router-dom";
export default function CommunitiesPage() {

  const navigate = useNavigate();
  const { data, isLoading, error } = useAllCommunities();

  const [formOpen, setFormClose] = useState(false);
  if (isLoading) {
    console.log("communities is loading");
  }
  if (!data || error) {
    console.log("communities fetching error" + error);
    return <div className="text-6xl">Something is messedup</div>;
  }

  // console.log(filteredCommunity);
  function moveToCommunity(path: string) {
    navigate(path);
  }
  if (data) {
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
              <CommunitySection
                width="w-[200px]"
                height="h-[250px]"
                data={data}
                onMove={moveToCommunity}
              />
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
            <div>
              <CommunitySection
                width="w-[200px]"
                height="h-[250px]"
                data={data}
                onMove={moveToCommunity}
              />
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
            <div>
              <CommunitySection
                width="w-[200px]"
                height="h-[250px]"
                data={data}
                onMove={moveToCommunity}
              />
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
}
