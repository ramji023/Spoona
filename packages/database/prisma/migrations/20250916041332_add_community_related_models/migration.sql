-- CreateTable
CREATE TABLE "public"."Community" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "coverImage" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "creatorId" TEXT NOT NULL,

    CONSTRAINT "Community_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CommunityMembers" (
    "id" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "communityId" TEXT NOT NULL,

    CONSTRAINT "CommunityMembers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CommunityRecipe" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "communityId" TEXT NOT NULL,
    "recipeId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "CommunityRecipe_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CommunityRecipe_recipeId_key" ON "public"."CommunityRecipe"("recipeId");

-- AddForeignKey
ALTER TABLE "public"."Community" ADD CONSTRAINT "Community_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CommunityMembers" ADD CONSTRAINT "CommunityMembers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CommunityMembers" ADD CONSTRAINT "CommunityMembers_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "public"."Community"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CommunityRecipe" ADD CONSTRAINT "CommunityRecipe_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "public"."Community"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CommunityRecipe" ADD CONSTRAINT "CommunityRecipe_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "public"."Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CommunityRecipe" ADD CONSTRAINT "CommunityRecipe_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
