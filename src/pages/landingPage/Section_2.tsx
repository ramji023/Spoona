import { CommunitySection } from "../../components/CommunitySection";

export default function Section_2() {
  return (
    <>
      <div className="mx-25 my-10 p-2 font-poppins flex-col space-y-10">
        <div>
          <div className="text-2xl font-semibold">Discover Communities</div>
          <div className="text-lg text-gray-400 ">
            Join passionate cooks, bakers, and eaters sharing recipes and
            stories.
          </div>
        </div>
        <div>
          <CommunitySection />
        </div>
        <div className="border border-gray-200"></div>
      </div>
    </>
  );
}
