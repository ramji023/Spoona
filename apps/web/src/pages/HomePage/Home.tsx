import LeftSection from "./LeftSection";
import RightSection from "./RightSection";
const Home = () => {
  return (
    <>
      <div className="mx-4 my-4 flex">
        {/* left section  */}
        <div className="flex-2/3 mr-2 p-3">
          <LeftSection />
        </div>
        {/* right section  */}
        <div className="flex-1/3 ml-2 p-4">
          <RightSection />
        </div>
      </div>
    </>
  );
};

export default Home;
