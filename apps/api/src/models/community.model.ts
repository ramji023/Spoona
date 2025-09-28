import { Prisma, prisma, PrismaClient } from "@repo/database";

// create new community
export const createNewCommunity = async (communityData: {
  userId: string;
  name: string;
  description: string;
  coverImage: string;
}) => {
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
};

// fetch all the communities
export const getAllCommunities = async () => {
  return await prisma.community.findMany({
    select: {
      id: true,
      name: true,
      coverImage: true,
      CommunityMembers: {
        select: {
          user: {
            select: {
              profileImage: true,
            },
          },
        },
      },
    },
  });
};

// add members on a new community
export const addMember = async (communityData: {
  userId: string;
  communityId: string;
}) => {
  return await prisma.communityMembers.create({
    data: {
      userId: communityData.userId,
      communityId: communityData.communityId,
    },
  });
};

// add recipe on a community
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
  }
};

// get single community data
export const getCommunity = async (id: string) => {
  try {
    return await prisma.community.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        coverImage: true,
        CommunityMembers: {
          select: {
            user: {
              select: {
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
