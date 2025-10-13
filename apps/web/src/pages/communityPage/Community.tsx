import {
  ArrowLeft,
  Share2,
  Ellipsis,
  UtensilsCrossed,
  Plus,
} from "lucide-react";
import { User } from "lucide-react";
import Button from "@repo/ui/components/Button";
import { FilterIcon } from "@repo/ui/icons/FilterIcon";
import { useCommunity } from "../../react_queries/queries";
import Recipes from "../HomePage/Recipes";
import { useNavigate, useParams } from "react-router-dom";
import EmptyPage from "@repo/ui/components/EmptyPage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../utils/axiosInstance";
import { useSuccessMsgStore } from "../../stores/successMsgStore";
import { useAuthStore } from "../../stores/authStore";
import NotFound from "../../errors/NotFound";
import { useFailureMsgStore } from "../../stores/failureMsgStore";
import { CommunityPageSkeleton } from "../../loaders/Loaders";
export default function Community() {
  const navigate = useNavigate();
  const { communityId } = useParams();
  const setFailureMsg = useFailureMsgStore((s) => s.setFailureMsg);

  const queryClient = useQueryClient();
  const id = useAuthStore((s) => s.id);
  const setSuccessMsg = useSuccessMsgStore((s) => s.setSuccessMsg);
  //write mutation to remove user from community
  const removeUserMutation = useMutation({
    mutationFn: async () => {
      const response = await api.delete(
        `/api/v1/community/${communityId}/members`
      );
      return response.data;
    },
    onSuccess: (data) => {
      console.log(data);
      setSuccessMsg("You have left this community successfully");
      queryClient.invalidateQueries({ queryKey: ["community", communityId] });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  //write mutation to add user in community
  const addUserMutation = useMutation({
    mutationFn: async () => {
      const response = await api.post(
        `/api/v1/community/${communityId}/members`
      );
      return response.data;
    },
    onSuccess: (data) => {
      console.log(data);
      setSuccessMsg("You have joined this community successfully");
      queryClient.invalidateQueries({ queryKey: ["community", communityId] });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const { data, isLoading, error } = useCommunity(communityId);

  if (!communityId) return <NotFound />;

  if (isLoading) {
    return <CommunityPageSkeleton />;
  }

  if (!data || error) {
    setFailureMsg("Sorry, Can't get community data for you. Please try again.");
    return <CommunityPageSkeleton />;
  }

  const joined =
    data.CommunityMembers.some((member) => member.user.id === id) ?? false;

  return (
    <>
      <div className="mx-40 my-8 p-2">
        {/* first div  */}
        <div className="relative">
          <img
            src={data.coverImage}
            alt=""
            className="h-[200px] w-full object-cover rounded-lg"
          />
          <div className="absolute bottom-2 left-2 flex items-center justify-center gap-3">
            <div
              onClick={() => navigate("/communities")}
              className="w-10 h-10 rounded-full text-white flex justify-center items-center hover:bg-white hover:text-black"
            >
              <ArrowLeft className="stroke-2" />
            </div>
            <h1 className="text-3xl text-white">{data.name}</h1>
          </div>
          <div className="absolute bottom-2 right-4 flex items-center justify-center gap-3">
            <div>
              {joined ? (
                <button
                  onClick={() => removeUserMutation.mutate()}
                  className="cursor-pointer outline-2 outline-white text-white px-5 py-2 rounded-3xl hover:outline-orange-400 hover:bg-orange-400"
                >
                  <span className="font-semibold">Leave</span>
                </button>
              ) : (
                <Button onClick={() => addUserMutation.mutate()}>
                  <span className="font-normal">join</span>
                </Button>
              )}
            </div>
            <div className="w-10 h-10 rounded-full  flex justify-center items-center bg-white hover:text-black">
              <Share2 className="stroke-2" />
            </div>
            <div className="w-10 h-10 rounded-full  flex justify-center items-center bg-white hover:text-black">
              <Ellipsis className="stroke-2" />
            </div>
          </div>
        </div>
        {/* second div  */}
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center gap-4 ">
            <div className="text-gray-600 flex items-center gap-2">
              <User className="w-5 h-5" />
              <p>
                3456 <span className="text-sm">members</span>
              </p>
            </div>
            <div className="text-gray-600 flex items-center gap-2">
              <UtensilsCrossed className="w-5 h-5" />
              <p>
                1012 <span className="text-sm">recipes</span>
              </p>
            </div>
          </div>
          {joined && (
            <div>
              <Button onClick={() => {}}>
                <div className="flex items-center gap-1 font-normal">
                  <Plus className="w-5 h-5" /> Add Recipe
                </div>
              </Button>
            </div>
          )}
        </div>
        <div className="px-4">
          <p className="text-gray-500 text-xs">{data.description}</p>
        </div>
        {/* third div  */}
        <div className="my-3 flex items-center gap-3 justify-center">
          <input
            type="text"
            placeholder="Search Popular Recipe in Quick & Simple"
            className="w-[90%] h-[45px] rounded-4xl bg-gray-200 focus:outline-orange-400 px-4"
          />
          <div className="outline-2 outline-gray-200 rounded-3xl  flex justify-center items-center px-4 py-2 hover:outline-orange-400">
            <FilterIcon />
          </div>
        </div>

        {/* forth div  */}
        <div className="py-4">
          <h1 className="text-2xl py-4 font-semibold text-orange-400">
            Recipes
          </h1>
          <div className="border-b-2  border-gray-400"></div>
        </div>

        {/* fifth div  */}

        <div className="flex flex-row justify-center">
          {data.CommunityRecipe.length !== 0 ? (
            <>
              <Recipes
                recipes={data.CommunityRecipe.map((s) => ({
                  id: s.recipe.id,
                  title: s.recipe.title,
                  cookTime: s.recipe.cookTime,
                  imageUrl: s.recipe.imageUrl,
                  tags: s.recipe.tags,
                  cuisines: s.recipe.cuisines,
                  categories: s.recipe.categories,
                  user: s.recipe.user,
                }))}
              />
            </>
          ) : (
            <div className="py-10 flex flex-row justify-center">
              <EmptyPage
                message="There is no recipe"
                button="Post first Recipe in this community"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
