-- CreateTable
CREATE TABLE "public"."Comment" (
    "id" UUID NOT NULL,
    "authorId" UUID NOT NULL,
    "poemId" UUID NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Comment" ADD CONSTRAINT "Comment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Comment" ADD CONSTRAINT "Comment_poemId_fkey" FOREIGN KEY ("poemId") REFERENCES "public"."Poem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
