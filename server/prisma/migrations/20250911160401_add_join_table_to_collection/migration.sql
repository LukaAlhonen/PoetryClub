/*
  Warnings:

  - You are about to drop the column `poems` on the `Collection` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Collection" DROP COLUMN "poems";

-- CreateTable
CREATE TABLE "public"."PoemLink" (
    "id" UUID NOT NULL,
    "collectionId" UUID NOT NULL,
    "poemId" UUID NOT NULL,

    CONSTRAINT "PoemLink_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PoemLink_collectionId_poemId_key" ON "public"."PoemLink"("collectionId", "poemId");

-- AddForeignKey
ALTER TABLE "public"."PoemLink" ADD CONSTRAINT "PoemLink_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "public"."Collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PoemLink" ADD CONSTRAINT "PoemLink_poemId_fkey" FOREIGN KEY ("poemId") REFERENCES "public"."Poem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
