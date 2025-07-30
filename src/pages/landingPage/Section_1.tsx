import { CategorySection } from "../../components/CategoryCard";
export default function Section_1() {
  return (
    <>
      <div className="mx-25 my-10 p-2 font-poppins flex-col space-y-10">
        <div>
          <div className="font-semibold flex justify-between items-center">
            <h1 className="text-2xl"> Recipe Categories</h1>
            <span className="text-gray-400 text-md font-semibold cursor-pointer hover:text-orange-400">
              See More
            </span>
          </div>
          <div className="text-lg text-gray-400 ">
            Explore a variety of handpicked recipe categories to match every
            mood, meal, and moment.
          </div>
        </div>
        <div>
          <CategorySection />
        </div>
        <div className="border border-gray-200"></div>
      </div>
    </>
  );
}
