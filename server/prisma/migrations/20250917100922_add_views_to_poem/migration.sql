/*
  Warnings:

  - Added the required column `views` to the `Poem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Poem" ADD COLUMN     "views" INTEGER NOT NULL;
