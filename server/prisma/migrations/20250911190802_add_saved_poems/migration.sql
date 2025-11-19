-- CreateTable
CREATE TABLE "public"."SavedPoem" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "poemId" UUID NOT NULL,
    "dateSaved" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SavedPoem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SavedPoem_userId_poemId_key" ON "public"."SavedPoem"("userId", "poemId");

-- AddForeignKey
ALTER TABLE "public"."SavedPoem" ADD CONSTRAINT "SavedPoem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SavedPoem" ADD CONSTRAINT "SavedPoem_poemId_fkey" FOREIGN KEY ("poemId") REFERENCES "public"."Poem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
