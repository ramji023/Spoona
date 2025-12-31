import EmptyPage from "@repo/ui/components/EmptyPage";
import { useParams } from "react-router-dom";
import { useCreatorData, useUserRecipeData } from "../../react_queries/queries";
import useMinLoader from "../../hooks/useMinLoader";
import { UserProfileSkeleton } from "../../loaders/Loaders";
import Err from "../../errors/ErrorBoundary";
import { ProfileIcon } from "@repo/ui/icons/profileIcon";
import Recipes from "../HomePage/Recipes";
import { useAuthStore } from "../../stores/authStore";
import { useFollowMutation } from "../../react_queries/mutation";

export default function User() {
  // fetch user following data
  const followingData = useAuthStore((s) => s.followingData);

  // write query to fetch updated user data
  const userQuery = useUserRecipeData(useAuthStore.getState().id)
  const {isLoading:userRecipeLoading} = useMinLoader({query:userQuery,loadingTime:200})
  // fetch creator id data
  const creatorId = useParams().creatorId;
  //  console.log("creator id : ",creatorId)
  // run query to fetch creator data
  const query = useCreatorData(creatorId);
  const { data, isLoading, error } = useMinLoader({ query, loadingTime: 800 });

  // call usefollowMutation hooks to send follower data to server
  const followMutation = useFollowMutation(creatorId);

  // if creator data is processing then show loader
  if (isLoading) {
    return <UserProfileSkeleton />;
  }
  //  console.log("data : ",data)
  // if there is any error while fetching creator data or creatorId is not provided
  if (error || !creatorId) {
    // console.log(error)
    return <Err />;
  }

  if (data) {
    // console.log(data)
    return (
      <>
        <div className="mx-30 p-10 my-10">
          {/* first section  */}
          <div className="flex justify-between items-center py-2 mb-10">
            <div className="flex gap-2 justify-center items-center">
              <div className="relative group">
                {data.profileImage ? (
                  <>
                    <img
                      src={data.profileImage}
                      alt=""
                      className="w-30 h-30 rounded-full"
                    />
                  </>
                ) : (
                  <>
                    <div className="w-30 h-30 rounded-full flex items-center justify-center">
                      <ProfileIcon className="w-30 h-30" />
                    </div>
                  </>
                )}
              </div>

              <div>
                <h1 className="text-3xl font-semibold p-2">{data.username}</h1>
                <p className="text-xs px-2 text-gray-600">{data.bio}</p>

                <div className="flex gap-4 items-center justify-center p-2 text-lg">
                  <div className="font-semibold text-orange-400 text-xl">
                    {data._count.Followings}{" "}
                    <span className=" text-gray-400 text-lg">Following</span>
                  </div>
                  <div className="font-semibold text-orange-400 text-xl">
                    {data._count.Followers}{" "}
                    <span className=" text-gray-400 text-lg ">Followers</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <button
                onClick={() => {
                  followMutation.mutate(data.id);
                }}
                disabled={followMutation.isPending || isLoading || userRecipeLoading}
                className={`${
                  followingData?.includes(data.id)
                    ? "text-orange-400 outline-orange-400"
                    : "outline-gray-400"
                } outline-1 px-4 py-2 rounded-3xl text-md hover:text-orange-400 hover:outline-orange-400 font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[100px]`}
              >
                {followMutation.isPending || isLoading || userRecipeLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing</span>
                  </>
                ) : followingData?.includes(data.id) ? (
                  "Unfollow"
                ) : (
                  "Follow"
                )}
              </button>
            </div>
          </div>
          <div className="border-gray-300 border-t-2 py-5"></div>
          {/* second div  */}
          {data.recipes.length !== 0 ? (
            <div>
              <Recipes recipes={data.recipes} />
            </div>
          ) : (
            <div>
              <EmptyPage message="No Recipe Posted" button="Go Back" />
            </div>
          )}
        </div>
      </>
    );
  }
  return null;
}
