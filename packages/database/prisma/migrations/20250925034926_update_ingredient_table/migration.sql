-- DropForeignKey
ALTER TABLE "public"."SavedRecipe" DROP CONSTRAINT "SavedRecipe_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."SavedRecipe" DROP CONSTRAINT "SavedRecipe_userId_fkey";

-- AlterTable
ALTER TABLE "public"."Ingredient" ALTER COLUMN "name" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "quantity" SET DATA TYPE VARCHAR(50);

-- AddForeignKey
ALTER TABLE "public"."SavedRecipe" ADD CONSTRAINT "SavedRecipe_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SavedRecipe" ADD CONSTRAINT "SavedRecipe_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "public"."Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
