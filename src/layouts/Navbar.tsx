import Button from "../components/Button";
import Logo from "../components/Logo";

export default function Navbar() {
  return (
    <>
      <div className="flex justify-around items-center p-3">
        <Logo />
        <div>
          <ul className="flex gap-x-10 items-center ">
            <li className="cursor-pointer hover:text-orange-400">Home</li>
            <li className="cursor-pointer hover:text-orange-400">Saved</li>
            <li className="cursor-pointer hover:text-orange-400">Planner</li>
            <li className="cursor-pointer hover:text-orange-400">Lists</li>
          </ul>
        </div>
        <div>
          <Button>login</Button>
          <span className="cursor-pointer text-lg hover:text-orange-400">Signup</span>
        </div>
      </div>
    </>
  );
}
