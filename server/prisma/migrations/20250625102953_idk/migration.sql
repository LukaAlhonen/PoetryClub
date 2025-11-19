/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Poem` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Poem_title_key" ON "Poem"("title");
