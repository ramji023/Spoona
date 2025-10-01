import { CommunitySection } from "@repo/ui/components/CommunitySection";
import { useAllCommunities } from "../../react_queries/queries";
import { useNavigate } from "react-router-dom";

export default function Section_2() {
  const navigate = useNavigate();
  function moveToCommunity(path: string) {
    navigate(path);
  }
  const { data, isLoading, error } = useAllCommunities();
  if (isLoading) {
    console.log("communities is loading");
  }
  if (!data || error) {
    console.log("communities fetching error" + error);
    return <div className="text-6xl">Something is messedup</div>;
  }
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
          <CommunitySection
            width="w-[150px]"
            height="h-[150px]"
            data={data}
            onMove={moveToCommunity}
          />
        </div>
        <div className="border border-gray-200"></div>
      </div>
    </>
  );
}
