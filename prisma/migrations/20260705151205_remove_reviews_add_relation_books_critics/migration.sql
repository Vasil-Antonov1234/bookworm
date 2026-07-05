/*
  Warnings:

  - You are about to drop the column `avatar` on the `critics` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `critics` table. All the data in the column will be lost.
  - You are about to drop the `_BookToReview` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `reviews` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `age` to the `critics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `critics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `critics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `placeOfBorn` to the `critics` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_BookToReview" DROP CONSTRAINT "_BookToReview_A_fkey";

-- DropForeignKey
ALTER TABLE "_BookToReview" DROP CONSTRAINT "_BookToReview_B_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_criticId_fkey";

-- AlterTable
ALTER TABLE "critics" DROP COLUMN "avatar",
DROP COLUMN "name",
ADD COLUMN     "age" INTEGER NOT NULL,
ADD COLUMN     "fullName" TEXT NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "placeOfBorn" TEXT NOT NULL;

-- DropTable
DROP TABLE "_BookToReview";

-- DropTable
DROP TABLE "reviews";

-- CreateTable
CREATE TABLE "_BookToCritic" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_BookToCritic_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_BookToCritic_B_index" ON "_BookToCritic"("B");

-- AddForeignKey
ALTER TABLE "_BookToCritic" ADD CONSTRAINT "_BookToCritic_A_fkey" FOREIGN KEY ("A") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToCritic" ADD CONSTRAINT "_BookToCritic_B_fkey" FOREIGN KEY ("B") REFERENCES "critics"("id") ON DELETE CASCADE ON UPDATE CASCADE;
