import { Request, Response } from "express";
import {
  checkFollowingId,
  createSubscriberData,
  deleteSubscriberData,
  findFollowers,
  findFollowings,
  findSubscriberData,
} from "../models/subscriber.model";
import { ApiError } from "../utils/customError";

// controller to handle follow operation
export const toggleFollowOperation = async (req: Request, res: Response) => {
  const userId = req.user; // store user id

  const followingId = req.body.followingId; // following user id

  // first check that followingId is  valid or not
  const validFollowingId = await checkFollowingId(followingId);

  if (!validFollowingId?.id) {
    throw new ApiError("User is not valid", 404);
  }

// Prevent self-follow
  if (userId === followingId) {
    throw new ApiError("You cannot follow yourself", 400);
  }

  // if following id is valid then check if user already followed him
  const existedData = await findSubscriberData(
    userId as string,
    validFollowingId.id
  );

  // if  data exist it means he want to unfollow  that person
  if (existedData) {
    //delete that data
    await deleteSubscriberData(existedData.followerId, existedData.followingId);
    // and return success response to client
    return res.json({ msg: "You have success Unfollowed him" });
  }

  // if data is not exist then it means he want to follow him
  await createSubscriberData(userId as string, validFollowingId.id);

  // then return success response data to  client
  return res.json({ msg: "You have successfully followed him" });
};

//controller to return follower and following data to client
export const getSubscribersData = async (req: Request, res: Response) => {
  const subscriberId = req.body.id; // store the id of that creators

  // now find all the followers of the client
  const followersCount = await findFollowers(subscriberId);
  // now find all the followings of the client
  const followingCount = await findFollowings(subscriberId);

  //  and return success response to user
  return res.json({
    data: { followers: followersCount, following: followingCount },
    msg: "Get the followers and following of user",
  });
};
