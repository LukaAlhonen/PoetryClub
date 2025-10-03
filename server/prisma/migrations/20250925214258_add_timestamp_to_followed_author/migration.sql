-- AlterTable
ALTER TABLE "public"."FollowedAuthor" ADD COLUMN     "dateFollowed" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;
