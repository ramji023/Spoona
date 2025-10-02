/*
  Warnings:

  - You are about to drop the column `endDate` on the `Planner` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Planner` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Planner` table. All the data in the column will be lost.
  - You are about to drop the `PlannerEntry` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `date` to the `Planner` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."PlannerEntry" DROP CONSTRAINT "PlannerEntry_plannerId_fkey";

-- AlterTable
ALTER TABLE "public"."Planner" DROP COLUMN "endDate",
DROP COLUMN "name",
DROP COLUMN "startDate",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "food" TEXT,
ADD COLUMN     "foodUrl" TEXT;

-- DropTable
DROP TABLE "public"."PlannerEntry";
