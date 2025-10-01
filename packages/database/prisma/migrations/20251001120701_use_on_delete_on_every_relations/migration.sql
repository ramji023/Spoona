-- DropForeignKey
ALTER TABLE "public"."Community" DROP CONSTRAINT "Community_creatorId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CommunityMembers" DROP CONSTRAINT "CommunityMembers_communityId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CommunityMembers" DROP CONSTRAINT "CommunityMembers_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CommunityRecipe" DROP CONSTRAINT "CommunityRecipe_communityId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CommunityRecipe" DROP CONSTRAINT "CommunityRecipe_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CommunityRecipe" DROP CONSTRAINT "CommunityRecipe_userId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Community" ADD CONSTRAINT "Community_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CommunityMembers" ADD CONSTRAINT "CommunityMembers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CommunityMembers" ADD CONSTRAINT "CommunityMembers_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "public"."Community"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CommunityRecipe" ADD CONSTRAINT "CommunityRecipe_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "public"."Community"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CommunityRecipe" ADD CONSTRAINT "CommunityRecipe_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "public"."Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CommunityRecipe" ADD CONSTRAINT "CommunityRecipe_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
