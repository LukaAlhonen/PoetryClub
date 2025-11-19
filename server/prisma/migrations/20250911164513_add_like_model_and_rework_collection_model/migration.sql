/*
  Warnings:

  - You are about to drop the `PoemLink` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `collectionId` to the `Poem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."PoemLink" DROP CONSTRAINT "PoemLink_collectionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."PoemLink" DROP CONSTRAINT "PoemLink_poemId_fkey";

-- AlterTable
ALTER TABLE "public"."Poem" ADD COLUMN     "collectionId" UUID NOT NULL;

-- DropTable
DROP TABLE "public"."PoemLink";

-- CreateTable
CREATE TABLE "public"."Like" (
    "id" UUID NOT NULL,
    "poemId" UUID NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Like_poemId_userId_key" ON "public"."Like"("poemId", "userId");

-- AddForeignKey
ALTER TABLE "public"."Poem" ADD CONSTRAINT "Poem_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "public"."Collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Like" ADD CONSTRAINT "Like_poemId_fkey" FOREIGN KEY ("poemId") REFERENCES "public"."Poem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Like" ADD CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
