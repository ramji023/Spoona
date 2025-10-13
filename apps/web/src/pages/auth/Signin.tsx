import Logo from "@repo/ui/components/Logo";
import { useForm } from "react-hook-form";
import { User } from "../../types/user";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../utils/axiosInstance";
import { useAuthStore } from "../../stores/authStore";
import { useNavigate } from "react-router-dom";
import { useSuccessMsgStore } from "../../stores/successMsgStore";
import { Spinner } from "../../loaders/Loaders";
import { motion } from "motion/react";
export default function Signin() {
  const navigate = useNavigate();
  const setIsAuthenticated = useAuthStore((s) => s.setIsAuthenticated);
  const setToken = useAuthStore((s) => s.setToken);

  // success store
  const setSuccessMsg = useSuccessMsgStore((s) => s.setSuccessMsg);

  // signup mutation using react-query
  const signinMutation = useMutation({
    mutationFn: async (data: User) => {
      console.log("data from signin mutation : ", data);
      const response = await api.post("/api/v1/user/auth/signin", data);
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Signin successful:", data);
      setIsAuthenticated(true);
      setToken(data.data.accessToken, data.data.id);
      setSuccessMsg(`Welcome back! ${data.data.name}`);
      navigate("/");
    },
    onError: (err) => {
      console.error("signin failed : ", err);
    },
  });

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
    signinMutation.mutate(data);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full backdrop-blur-[3px] z-50 flex justify-center items-center">
      <div className="w-[400px] h-[470px] bg-gray-200 rounded-2xl  p-6 flex flex-col gap-3  ">
        <div className=" flex flex-col gap-5 items-center justify-center p-4">
          <div className="">
            <Logo />
          </div>
          <h1 className=" text-lg text-gray-400">Sign in to Continue</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="">
            <div>
              {signinMutation.isError && (
                <p className="text-red-500 text-xs flex justify-center items-center">
                  Error: {(signinMutation.error as Error).message}{" "}
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
                placeholder="Enter Password"
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
              disabled={signinMutation.isPending}
              className="relative px-6 py-2 text-white bg-orange-400 rounded-xl cursor-pointer text-lg font-medium hover:font-semibold flex items-center justify-center"
            >
              <span
                className={`${signinMutation.isPending ? "opacity-0" : "opacity-100"} transition-opacity duration-200`}
              >
                Signin
              </span>

              {/* Spinner */}
              {signinMutation.isPending && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Spinner />
                </div>
              )}
            </button>
          </div>
        </form>
        <div className="">
          <p className="text-sm text-gray-500 text-center">
            If you are not registered,{" "}
            <span
              onClick={() => {
                navigate("/auth/signup");
              }}
              className="cursor-pointer text-gray-800 hover:text-orange-400"
            >
              Signup
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
