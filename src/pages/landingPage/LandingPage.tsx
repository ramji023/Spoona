// import Footer from "../../layouts/Footer";
import Navbar from "../../layouts/Navbar";
import FloatingButton from "../../components/FloatingButton";
import Section_1 from "./Section_1";
import Section_2 from "./Section_2";
import Section_3 from "./Section_3";
import Section_4 from "./Section_4";
import Footer from "../../layouts/Footer";
export default function LandingPage() {
  return (
    <>
      <Navbar />
      <FloatingButton />
      <div
        className={`bg-[url('/Hero_3.png')] w-full h-[480px] bg-cover mb-5`}
      ></div>
      <Section_1 />
      <Section_2 />
      <Section_3 />
      <Section_4 />
      <Footer/>
    </>
  );
}
