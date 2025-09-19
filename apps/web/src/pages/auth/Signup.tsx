import Logo from "@repo/ui/components/Logo";

export default function Signup({
  open,
  signin,
  signup,
}: {
  open: boolean;
  signin: React.Dispatch<React.SetStateAction<boolean>>;
  signup: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  if (!open) return;
  if (open) {
    return (
      <div className="fixed top-0 left-0 w-full h-full backdrop-blur-[3px] z-50 flex justify-center items-center">
        <div className="w-[400px] h-[470px] bg-gray-200 rounded-2xl  p-6 flex flex-col gap-4  ">
          <div className=" flex flex-col gap-5 items-center justify-center p-4">
            <div className="">
              <Logo />
            </div>
            <h1 className=" text-lg text-gray-400">create your account</h1>
          </div>
          <div className="">
            <div className="flex flex-col gap-2 py-1">
              <label className="text-lg">Username</label>
              <input
                type="text"
                placeholder="Enter username"
                className="p-2 rounded-lg outline-1 outline-gray-400 focus:outline-orange-400"
              />
            </div>
            <div className="flex flex-col gap-2 py-1 ">
              <label className="text-lg">Password</label>
              <input
                type="text"
                placeholder="Enter Strong Password"
                className="p-2 rounded-lg outline-1 outline-gray-400 focus:outline-orange-400"
              />
            </div>
          </div>
          <div className="flex justify-center items-center">
            <button className="px-4 py-2 text-white bg-orange-400 rounded-xl cursor-pointer text-lg hover:font-semibold">
              Signup
            </button>
          </div>
          <div className="">
            <p className="text-sm text-gray-500 text-center">
              If you have already registered,{" "}
              <span
                onClick={() => {
                  signup(false);
                  signin(true);
                }}
                className="cursor-pointer text-gray-800 hover:text-orange-400"
              >
                Signin
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
