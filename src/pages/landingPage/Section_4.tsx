import Recipes from "../../components/Recipes";

export default function Section_4() {
  return (
    <>
      <div className="mx-25 my-10 p-2 font-poppins flex-col space-y-10">
        <div>
          <div className="font-semibold flex justify-between items-center">
            <h1 className="text-2xl ">Discover Recipes</h1>
            <span className="text-gray-400 text-md cursor-pointer hover:text-orange-400">
              See More
            </span>
          </div>
          <div className="text-lg text-gray-400 ">
            Find and share everyday cooking inspiration with ratings and reviews
            you can trust. Recipes for easy dinners, healthy eating, fast and
            cheap, kid-friendly, and more.
          </div>
        </div>
        <div>
          <Recipes />
        </div>
        {/* <div className="border border-gray-200"></div> */}
      </div>
    </>
  );
}
