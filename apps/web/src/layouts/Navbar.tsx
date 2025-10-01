import Button from "@repo/ui/components/Button";
import Logo from "@repo/ui/components/Logo";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { UserIcon } from "@repo/ui/icons/UserIcon";
import { useMutation } from "@tanstack/react-query";
import { api } from "../utils/axiosInstance";
export default function Navbar() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const setIsAuthenticated = useAuthStore((s) => s.setIsAuthenticated);
  const setToken = useAuthStore((s) => s.setToken);
  const navigate = useNavigate();

  // implment logout functionality
  const logoutMutation = useMutation({
    mutationFn: async () => {
      // perform any logout related api calls if needed
      const response = await api.post("/api/v1/user/auth/signout", null);
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Logout successful:", data);
      setIsAuthenticated(false);
      setToken("","");
      navigate("/");
    },
    onError: (err) => {
      console.error("Logout failed:", err);
    },
  });

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
        {isAuthenticated ? (
          <div className="flex gap-7 items-center cursor-pointer">
            <div
              onClick={() => navigate("account")}
              className="w-10 h-10 rounded-full bg-orange-400 flex justify-center items-center"
            >
              <UserIcon />
            </div>
            <span
              onClick={() => {
                logoutMutation.mutate();
              }}
              className="cursor-pointer outline-1 outline-gray-400 px-5 py-2 rounded-3xl hover:outline-orange-400"
            >
              Logout
            </span>
          </div>
        ) : (
          <div>
            <Button
              onClick={() => {
                navigate("/auth/signin");
              }}
            >
              login
            </Button>
            <span
              onClick={() => {
                navigate("/auth/signup");
              }}
              className="cursor-pointer outline-1 outline-gray-400 px-5 py-2 rounded-3xl hover:outline-orange-400"
            >
              Signup
            </span>
          </div>
        )}
      </div>
    </>
  );
}
