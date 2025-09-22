import Logo from "@repo/ui/components/Logo";
import { useForm } from "react-hook-form";
import { User } from "../../types/user";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useSuccessMsgStore } from "../../stores/successMsgStore";
export default function Signup() {

  // use success store
  const setSuccessMsg = useSuccessMsgStore((s) => s.setSuccessMsg);


  const navigate = useNavigate();
  // signup mutation using react-query
  const signupMutation = useMutation({
    mutationFn: async (data: User) => {
      console.log("data from signup mutation : ", data);
      const response = await api.post("/api/v1/user/auth/signup", data);
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Signup successful:", data);
      setSuccessMsg("Signup successful! Please Signin to continue.");
      navigate("/auth/signin");
    },
    onError: (err) => {
      console.error("signup failed : ", err);
    },
  });

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();
  const onSubmit = (data: User) => {
    console.log(data);
    signupMutation.mutate(data);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full backdrop-blur-[3px] z-50 flex justify-center items-center">
      <div className="w-[400px] h-[470px] bg-gray-200 rounded-2xl  p-6 flex flex-col gap-3  ">
        <div className=" flex flex-col gap-5 items-center justify-center p-4">
          <div className="">
            <Logo />
          </div>
          <h1 className=" text-lg text-gray-400">create your account</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="">
            <div>
              {signupMutation.isError && (
                <p className="text-red-500 text-xs flex justify-center items-center">
                  Error: {(signupMutation.error as Error).message}{" "}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-1 py-1">
              <label className="text-lg">Email</label>
              <input
                type="text"
                placeholder="Enter email"
                {...register("email", {
                  required: { value: true, message: "Email is required" },
                  maxLength: {
                    value: 20,
                    message: "Email should be less than 20 characters",
                  },
                  minLength: {
                    value: 5,
                    message: "Email should be more than 5 characters",
                  },
                })}
                className="p-2 rounded-lg outline-1 outline-gray-400 focus:outline-orange-400"
              />
              <span className="text-red-500 text-xs min-h-[16px] flex flex-row-reverse">
                {(errors.email?.message as string) ?? ""}
              </span>
            </div>
            <div className="flex flex-col gap-1 py-1 ">
              <label className="text-lg">Password</label>
              <input
                type="text"
                placeholder="Enter Strong Password"
                {...register("password", {
                  required: { value: true, message: "Password is required" },
                  maxLength: {
                    value: 20,
                    message: "Password should be less than 12 characters",
                  },
                  minLength: {
                    value: 5,
                    message: "Password should be more than 5 characters",
                  },
                })}
                className="p-2 rounded-lg outline-1 outline-gray-400 focus:outline-orange-400"
              />
              <span className="text-red-500 text-xs min-h-[16px] flex flex-row-reverse">
                {(errors.password?.message as string) ?? ""}
              </span>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="px-4 py-2 text-white bg-orange-400 rounded-xl cursor-pointer text-lg hover:font-semibold"
            >
              Signup
            </button>
          </div>
        </form>
        <div className="">
          <p className="text-sm text-gray-500 text-center">
            If you have already registered,{" "}
            <span
              onClick={() => {
                navigate("/auth/signin");
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
