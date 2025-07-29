import Profiles from "../../components/ProfileIcon";

export default function Section_3() {
  return (
    <>
      <div className="mx-25 my-10 p-2 font-poppins flex-col space-y-10">
        <div>
          <div className="text-2xl font-semibold">Popular Creators</div>
          <div className="text-lg text-gray-400 ">
            Explore the most followed and loved creators who are inspiring
            millions with their content, ideas, and passion. Dive into their
            profiles and discover why they stand out.
          </div>
        </div>
        <div>
          <Profiles />
        </div>
        <div className="border border-gray-200"></div>
      </div>
    </>
  );
}
