import { v2 as cloudinary } from "cloudinary";
import { prisma } from "@repo/database";

// configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//function to get all the images from cloudinary
export async function getAllRecipesImages() {
  const images: string[] = []; // store all the images got from cloudinary
  let nextCursor: string | undefined;
  try {
    do {
      const result = await cloudinary.api.resources({
        type: "upload",
        prefix: "Spoona/recipes",
        next_cursor: nextCursor,
      });
      images.push(...result.resources.map((r: any) => r.secure_url));
      nextCursor = result.next_cursor;
    } while (nextCursor);
    console.log("recipe images : ", images);
    return images;
  } catch (error) {
    console.error(" Failed to fetch upload preset!");
    console.error("Error:", error);
  }
}

//function to get all the images from cloudinary
export async function getAllCommunitiesImages() {
  const images: string[] = []; // store all the images got from cloudinary
  let nextCursor: string | undefined;
  try {
    do {
      const result = await cloudinary.api.resources({
        type: "upload",
        prefix: "Spoona/community_cover_image",
        next_cursor: nextCursor,
      });
      images.push(...result.resources.map((r: any) => r.secure_url));
      nextCursor = result.next_cursor;
    } while (nextCursor);
    console.log("communities cover images : ", images);
    return images;
  } catch (error) {
    console.error(" Failed to fetch upload preset!");
    console.error("Error:", error);
  }
}

// function to get all the recipe image url from database
export async function getAllDatabasesRecipesUrl() {
  const recipeUrls = await prisma.recipe.findMany({
    select: {
      imageUrl: true,
    },
  });
  const urls = recipeUrls.map((r) => r.imageUrl);
  return urls;
}

// function to get all the communities image from database
export async function getAllDatabasesCommunitiesUrl() {
  const communitiesUrls = await prisma.community.findMany({
    select: {
      coverImage: true,
    },
  });
  const urls = communitiesUrls.map((r) => r.coverImage);
  return urls;
}

// function to delete all the unused images
export async function cleanupUnusedImages() {
  try {
    // get communities urls
    const communitiesUrls = await getAllCommunitiesImages();
    // get recipes urls
    const recipeImages = await getAllRecipesImages();

    // get all imageurls from recipe table
    const recipeUrls = await getAllDatabasesRecipesUrl();
    //get all imageurls from communities table
    const communityUrls = await getAllDatabasesCommunitiesUrl();

    // find images that present in communitiesUrls but not in communityUrls and present in recipeImages but not in recipeUrls
    const recipeImageToDelete = recipeImages?.filter(
      (r) => !recipeUrls.includes(r)
    );
    const communityImageToDelete = communitiesUrls?.filter(
      (c) => !communityUrls.includes(c)
    );

    if (recipeImageToDelete) {
      let deletedCount = 0;
      for (const imageUrl of recipeImageToDelete) {
        try {
          const publicId = extractPublicId(imageUrl);
          await cloudinary.uploader.destroy(publicId);
          deletedCount++;
          console.log(
            ` Deleted [${deletedCount}/${recipeImageToDelete.length}]: ${publicId}`
          );
        } catch (error) {
          console.error(` Failed to delete: ${imageUrl}`, error);
        }
      }
    }

    if (communityImageToDelete) {
      let deletedCount = 0;
      for (const imageUrl of communityImageToDelete) {
        try {
          const publicId = extractPublicId(imageUrl);
          await cloudinary.uploader.destroy(publicId);
          deletedCount++;
          console.log(
            ` Deleted [${deletedCount}/${communityImageToDelete.length}]: ${publicId}`
          );
        } catch (error) {
          console.error(` Failed to delete: ${imageUrl}`, error);
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
}

// function to extract public id
function extractPublicId(url: string): string {
  // Example URL: https://res.cloudinary.com/demo/image/upload/v1234567890/Spoona/recipe123.jpg
  const parts = url.split("/");
  const uploadIndex = parts.findIndex(part => part === "upload");
  
  // Get everything after "upload/vXXXXXXXXX/" or "upload/"
  const pathParts = parts.slice(uploadIndex + 1);
  
  // Remove version if present (vXXXXXXXXX)
  const relevantParts = pathParts[0].startsWith("v") 
    ? pathParts.slice(1) 
    : pathParts;
  
  // Join and remove file extension
  const fullPath = relevantParts.join("/");
  return fullPath.replace(/\.[^.]+$/, ""); // Remove extension
}