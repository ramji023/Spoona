import { prisma } from "@repo/database";

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

export const getAllCommunities = async()=>{
  return await prisma.community.findMany({
    select:{
      id:true,
      name:true,
      coverImage:true
    }
  })
}







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
export const addRecipe = async (communityData: {
  userId: string;
  communityId: string;
  recipeId: string;
}) => {
  return prisma.communityRecipe.create({
    data: {
      userId: communityData.userId,
      communityId: communityData.communityId,
      recipeId: communityData.recipeId,
    },
  });
};
