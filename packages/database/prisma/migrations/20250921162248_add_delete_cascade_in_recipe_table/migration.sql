-- DropForeignKey
ALTER TABLE "public"."Recipe" DROP CONSTRAINT "Recipe_userId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Recipe" ADD CONSTRAINT "Recipe_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
