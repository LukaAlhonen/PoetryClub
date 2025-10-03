/*
  Warnings:

  - You are about to drop the column `ownerId` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Like` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `SavedPoem` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[authorId,poemId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[authorId,poemId]` on the table `SavedPoem` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `authorId` to the `Collection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorId` to the `Like` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorId` to the `SavedPoem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Collection" DROP CONSTRAINT "Collection_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Comment" DROP CONSTRAINT "Comment_authorId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Like" DROP CONSTRAINT "Like_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Poem" DROP CONSTRAINT "Poem_authorId_fkey";

-- DropForeignKey
ALTER TABLE "public"."SavedPoem" DROP CONSTRAINT "SavedPoem_userId_fkey";

-- DropIndex
DROP INDEX "public"."Like_poemId_userId_key";

-- DropIndex
DROP INDEX "public"."SavedPoem_userId_poemId_key";

-- AlterTable
ALTER TABLE "public"."Collection" DROP COLUMN "ownerId",
ADD COLUMN     "authorId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "public"."Like" DROP COLUMN "userId",
ADD COLUMN     "authorId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "public"."SavedPoem" DROP COLUMN "userId",
ADD COLUMN     "authorId" UUID NOT NULL;

-- DropTable
DROP TABLE "public"."User";

-- CreateTable
CREATE TABLE "public"."Author" (
    "id" UUID NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "dateJoined" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Author_username_key" ON "public"."Author"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Author_email_key" ON "public"."Author"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Like_authorId_poemId_key" ON "public"."Like"("authorId", "poemId");

-- CreateIndex
CREATE UNIQUE INDEX "SavedPoem_authorId_poemId_key" ON "public"."SavedPoem"("authorId", "poemId");

-- AddForeignKey
ALTER TABLE "public"."Poem" ADD CONSTRAINT "Poem_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."Author"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SavedPoem" ADD CONSTRAINT "SavedPoem_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."Author"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Collection" ADD CONSTRAINT "Collection_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."Author"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Comment" ADD CONSTRAINT "Comment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."Author"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Like" ADD CONSTRAINT "Like_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."Author"("id") ON DELETE CASCADE ON UPDATE CASCADE;
