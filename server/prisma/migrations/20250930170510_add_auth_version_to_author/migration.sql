/*
  Warnings:

  - The required column `authVersion` was added to the `Author` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "public"."Author" ADD COLUMN     "authVersion" UUID NOT NULL;
