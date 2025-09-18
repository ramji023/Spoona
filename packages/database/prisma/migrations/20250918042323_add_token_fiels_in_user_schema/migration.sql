-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "token" TEXT;

-- CreateTable
CREATE TABLE "public"."Planner" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Planner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PlannerEntry" (
    "id" TEXT NOT NULL,
    "plannerId" TEXT NOT NULL,
    "urls" TEXT NOT NULL,
    "recipeUrl" TEXT NOT NULL,

    CONSTRAINT "PlannerEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PlannerEntry_plannerId_key" ON "public"."PlannerEntry"("plannerId");

-- AddForeignKey
ALTER TABLE "public"."Planner" ADD CONSTRAINT "Planner_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PlannerEntry" ADD CONSTRAINT "PlannerEntry_plannerId_fkey" FOREIGN KEY ("plannerId") REFERENCES "public"."Planner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
