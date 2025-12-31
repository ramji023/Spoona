import { ProfileIcon } from "@repo/ui/icons/profileIcon";
import Err from "../../errors/ErrorBoundary";
import useMinLoader from "../../hooks/useMinLoader";
import { UsersPageSkeleton } from "../../loaders/Loaders";
import {
  usePopularCreators,
  useUserRecipeData,
} from "../../react_queries/queries";
import { PopularCreator } from "../../types/user";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import { useFollowMutation } from "../../react_queries/mutation";

export default function Users() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  // write query to fetch updated user data
  const userQuery = useUserRecipeData(useAuthStore.getState().id);
  const { isLoading: userRecipeLoading } = useMinLoader({
    query: userQuery,
    loadingTime: 200,
  });

  // react query to fetch all creators data
  const query = usePopularCreators();
  const { data, isLoading, error } = useMinLoader({ query, loadingTime: 800 });

  // if there is any error then show error
  if (error) {
    return <Err />;
  }

  // if popular creator data is processing then  show loader skeleton
  if (isLoading) {
    return <UsersPageSkeleton />;
  }

  // if user is authenticated then filter out data
  const filteredData =
    isAuthenticated && data
      ? data.filter((c) => c.id !== useAuthStore.getState().id)
      : data;
  return (
    <>
      <div className="mx-30 px-10 py-6 my-6 flex flex-col gap-9">
        <div className="mb-3 flex flex-col justify-center gap-3">
          <div>
            <span className="text-sm text-gray-400">Spoona/Creators</span>
          </div>
          <div>
            <h1 className="text-2xl font-semibold">Creators</h1>
            <p className="text-md text-gray-500">
              Get inspired with recipe ideas and tips from your favorite food
              creators
            </p>
          </div>
        </div>
        <div className="mx-10">
          {filteredData?.map((user) => (
            <UserBox key={user.id} user={user} isLoading={isLoading || userRecipeLoading}/>
          ))}
        </div>
      </div>
    </>
  );
}

// userbox component to show user data
function UserBox({ user,isLoading }: { user: PopularCreator,isLoading:boolean }) {
  const navigate = useNavigate();
  const followingData = useAuthStore((s) => s.followingData); // user following data
  const followMutation = useFollowMutation(user.id); // call mutation function to handle subcriber based function
  return (
    <>
      <div className="flex justify-between items-center py-1 mb-5">
        <div className="flex gap-2 justify-center items-center">
          <div className="relative group">
            {user.profileImage ? (
              <>
                <img
                  src={user.profileImage}
                  alt=""
                  className="w-18 h-18 rounded-full"
                />
              </>
            ) : (
              <>
                <div className="w-18 h-18 rounded-full flex items-center justify-center">
                  <ProfileIcon className="w-18 h-18" />
                </div>
              </>
            )}
          </div>
          <div>
            <h1
              onClick={() => navigate(`${user.id}`)}
              className="text-md font-semibold px-2 cursor-pointer hover:text-orange-400"
            >
              {user.username}
            </h1>
            <p className="text-sm px-2 text-gray-600">{user.bio}</p>

            <div className="flex gap-4 items-center justify-center p-2 text-lg">
              <div className="font-semibold text-orange-400 text-sm">
                {user._count.Followings}{" "}
                <span className=" text-gray-400 text-xs">Following</span>
              </div>
              <div className="font-semibold text-orange-400 text-sm">
                {user._count.Followers}{" "}
                <span className=" text-gray-400 text-xs">Followers</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <button
            onClick={() => {
              followMutation.mutate(user.id);
            }}
            disabled={followMutation.isPending || isLoading}
            className={`${
              followingData?.includes(user.id) ? "text-orange-400" : ""
            } px-4 py-2 rounded-3xl text-md hover:text-orange-400 hover:outline-orange-400 font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2`}
          >
            {followMutation.isPending || isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
                <span>Processing</span>
              </>
            ) : (
              <span>
                {followingData?.includes(user.id) ? "Unfollow" : "Follow"}
              </span>
            )}
          </button>
        </div>
      </div>
      <div className="border-gray-300 border-t-1 py-2"></div>
    </>
  );
}
