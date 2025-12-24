import { Prisma, prisma, PrismaClient } from "@repo/database";
import { ApiError } from "../utils/customError";

/***
 *
 *
 *
 *
 *
 *
 *
 *
 */
// create new community
export const createNewCommunity = async (communityData: {
  userId: string;
  name: string;
  description: string;
  coverImage: string;
}) => {
  try {
    return await prisma.community.create({
      data: {
        creatorId: communityData.userId,
        name: communityData.name,
        description: communityData.description,
        coverImage: communityData.coverImage,
      },
      select: {
        id: true,
        name: true,
        description: true,
        coverImage: true,
        user: {
          select: {
            username: true,
            profileImage: true,
          },
        },
      },
    });
  } catch (err) {
    throw new ApiError(
      "Something went wrong while creating new community",
      404
    );
  }
};

// model functions to fetch all the communities
export const getAllCommunities = async () => {
  try {
    return await prisma.community.findMany({
      select: {
        id: true,
        name: true,
        coverImage: true,
        CommunityMembers: {
          select: {
            user: {
              select: {
                id: true,
                profileImage: true,
              },
            },
          },
        },
      },
    });
  } catch (err) {
    throw new ApiError(
      "Something went wrong while fetching all communities data",
      404
    );
  }
};

export const findCommunityById = async (id: string) => {
  try {
    return await prisma.community.findUnique({ where: { id: id } });
  } catch (err) {
    throw new ApiError("Community Id is invalid", 404);
  }
};

//model function to add members on a new community
export const addMember = async (communityData: {
  userId: string;
  communityId: string;
}) => {
  try {
    return await prisma.communityMembers.create({
      data: {
        userId: communityData.userId,
        communityId: communityData.communityId,
      },
    });
  } catch (err) {
    throw new ApiError("Something went wrong while adding in community", 404);
  }
};

// model function to leave member on a new community
export const deleteMember = async (communityData: {
  userId: string;
  communityId: string;
}) => {
  try {
    return await prisma.communityMembers.deleteMany({
      where: {
        userId: communityData.userId,
        communityId: communityData.communityId,
      },
    });
  } catch (err) {
    throw new ApiError(
      "Something went wrong while removing you from community",
      404
    );
  }
};

//model function to add recipe on a community
export const addRecipe = async (
  communityData: { userId: string; communityId: string; recipeId: string },
  client: Prisma.TransactionClient | PrismaClient = prisma
) => {
  try {
    return client.communityRecipe.create({
      data: communityData,
    });
  } catch (err) {
    console.log(err);
    throw new ApiError(
      "Something went wrong while uploading recipe in community",
      404
    );
  }
};

// model function to get single community data
export const getCommunity = async (id: string) => {
  try {
    return await prisma.community.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        description: true,
        coverImage: true,
        CommunityMembers: {
          select: {
            user: {
              select: {
                id: true,
                profileImage: true,
              },
            },
          },
        },
        CommunityRecipe: {
          select: {
            recipe: {
              select: {
                id: true,
                title: true,
                imageUrl: true,
                tags: true,
                cuisines: true,
                categories: true,
                cookTime: true,
                user: {
                  select: {
                    username: true,
                    profileImage: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  } catch (err) {
    throw err;
  }
};
/***
 *
 *
 *
 *
 *
 *
 *
 *
 */
