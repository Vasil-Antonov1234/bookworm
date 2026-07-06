/*
  Warnings:

  - You are about to drop the `_BookToCritic` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BookToCritic" DROP CONSTRAINT "_BookToCritic_A_fkey";

-- DropForeignKey
ALTER TABLE "_BookToCritic" DROP CONSTRAINT "_BookToCritic_B_fkey";

-- DropTable
DROP TABLE "_BookToCritic";

-- CreateTable
CREATE TABLE "books_critics" (
    "bookId" INTEGER NOT NULL,
    "criticId" INTEGER NOT NULL,
    "review" TEXT,

    CONSTRAINT "books_critics_pkey" PRIMARY KEY ("bookId","criticId")
);

-- AddForeignKey
ALTER TABLE "books_critics" ADD CONSTRAINT "books_critics_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "books_critics" ADD CONSTRAINT "books_critics_criticId_fkey" FOREIGN KEY ("criticId") REFERENCES "critics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
