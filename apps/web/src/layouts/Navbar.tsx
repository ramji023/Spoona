import Button from "@repo/ui/components/Button";
import Logo from "@repo/ui/components/Logo";
import { Link } from "react-router-dom";
interface NavbarProp {
  signin: React.Dispatch<React.SetStateAction<boolean>>;
  signup: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function Navbar({ signin, signup }: NavbarProp) {
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
          <Button
            onClick={() => {
              signup(false);
              signin(true);
            }}
          >
            login
          </Button>
          <span
            onClick={() => {
              signin(false);
              signup(true);
            }}
            className="cursor-pointer outline-1 outline-gray-400 px-5 py-2 rounded-3xl hover:outline-orange-400"
          >
            Signup
          </span>
        </div>
      </div>
    </>
  );
}
