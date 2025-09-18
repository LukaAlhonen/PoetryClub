-- DropForeignKey
ALTER TABLE "public"."Poem" DROP CONSTRAINT "Poem_collectionId_fkey";

-- AlterTable
ALTER TABLE "public"."Poem" ALTER COLUMN "collectionId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Poem" ADD CONSTRAINT "Poem_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "public"."Collection"("id") ON DELETE SET NULL ON UPDATE CASCADE;
