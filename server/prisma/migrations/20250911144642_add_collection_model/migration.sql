-- CreateTable
CREATE TABLE "public"."Collection" (
    "id" UUID NOT NULL,
    "ownerId" UUID NOT NULL,
    "poems" UUID[],

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Collection" ADD CONSTRAINT "Collection_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
