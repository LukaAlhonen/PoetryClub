/*
  Warnings:

  - Added the required column `text` to the `Poem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Poem" ADD COLUMN     "text" TEXT NOT NULL;
