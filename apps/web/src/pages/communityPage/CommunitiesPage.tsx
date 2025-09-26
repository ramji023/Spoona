import { CommunitySection } from "@repo/ui/components/CommunitySection";

export default function CommunitiesPage() {
  return (
    <>
      <div className="mx-40 my-10 p-2">
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
            <CommunitySection width="w-[200px]" height="h-[250px]" />
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
            <CommunitySection width="w-[200px]" height="h-[250px]" />
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
            <CommunitySection width="w-[200px]" height="h-[250px]" />
          </div>
        </div>
      </div>
    </>
  );
}
