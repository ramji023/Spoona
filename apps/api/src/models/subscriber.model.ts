import { prisma } from "@repo/database";
import { ApiError } from "../utils/customError";

// create subsciber data
export async function createSubscriberData(
  followerId: string,
  followingId: string
) {
  try {
    return await prisma.subscriber.create({
      data: {
        followerId: followerId,
        followingId: followingId,
      },
    });
  } catch (err) {
    throw new ApiError(
      "Something went wrong while creating Subscriber data",
      404
    );
  }
}

// check Following id is valid
export async function checkFollowingId(id: string) {
  try {
    return await prisma.user.findUnique({
      where: { id: id },
      select: { id: true },
    });
  } catch (err) {
    throw new ApiError("Following Id is Invalid", 404);
  }
}

// find subscriber data
export async function findSubscriberData(
  followerId: string,
  followingId: string
) {
  try {
    return await prisma.subscriber.findUnique({
      where: {
        followerId_followingId: {
          followerId: followerId,
          followingId: followingId,
        },
      },
    });
  } catch (err) {
    throw new ApiError(
      "Something went wrong while finding Subscriber data",
      404
    );
  }
}

// delete subsciber data
export async function deleteSubscriberData(
  followerId: string,
  followingId: string
) {
  try {
    return await prisma.subscriber.delete({
      where: {
        followerId_followingId: {
          followerId: followerId,
          followingId: followingId,
        },
      },
    });
  } catch (err) {
    throw new ApiError(
      "Something went wrong while deleting Subscriber data",
      404
    );
  }
}

// model function to calculate creator followers
export async function findFollowers(id: string) {
  try {
    return await prisma.subscriber.count({
      where: {
        followingId: id,
      },
    });
  } catch (err) {
    throw new ApiError("Something went wrong while calculating followers", 404);
  }
}

// model function to calculate creator followings
export async function findFollowings(id: string) {
  try {
    return await prisma.subscriber.count({
      where: {
        followerId: id,
      },
    });
  } catch (err) {
    throw new ApiError(
      "Something went wrong while calculating followings",
      404
    );
  }
}
