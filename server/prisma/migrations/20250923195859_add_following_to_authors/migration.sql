-- CreateTable
CREATE TABLE "public"."FollowedAuthor" (
    "id" UUID NOT NULL,
    "followerId" UUID NOT NULL,
    "followingId" UUID NOT NULL,

    CONSTRAINT "FollowedAuthor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FollowedAuthor_followerId_followingId_key" ON "public"."FollowedAuthor"("followerId", "followingId");

-- AddForeignKey
ALTER TABLE "public"."FollowedAuthor" ADD CONSTRAINT "FollowedAuthor_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "public"."Author"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FollowedAuthor" ADD CONSTRAINT "FollowedAuthor_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "public"."Author"("id") ON DELETE CASCADE ON UPDATE CASCADE;
