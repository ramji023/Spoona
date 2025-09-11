import Button from "@repo/ui/components/Button";
import Logo from "@repo/ui/components/Logo";
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <>
      <div className="flex justify-around items-center p-3">
        <Link to="/">
          <Logo />
        </Link>
        <div>
          <ul className="flex gap-x-10 items-center ">
            <Link to="home" className="cursor-pointer hover:text-orange-400">
              Recipes
            </Link>
            <Link to="saved" className="cursor-pointer hover:text-orange-400">
              Saved
            </Link>
            <Link to="planner" className="cursor-pointer hover:text-orange-400">
              Planner
            </Link>
            <Link
              to="communities"
              className="cursor-pointer hover:text-orange-400"
            >
              Communities
            </Link>
          </ul>
        </div>
        <div>
          <Button>login</Button>
          <span className="cursor-pointer outline-1 outline-gray-400 px-5 py-2 rounded-3xl hover:outline-orange-400">
            Signup
          </span>
        </div>
      </div>
    </>
  );
}
