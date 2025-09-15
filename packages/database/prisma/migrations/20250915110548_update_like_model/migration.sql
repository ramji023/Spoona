/*
  Warnings:

  - Changed the type of `status` on the `Like` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."likeType" AS ENUM ('like', 'dislike');

-- AlterTable
ALTER TABLE "public"."Like" DROP COLUMN "status",
ADD COLUMN     "status" "public"."likeType" NOT NULL;
