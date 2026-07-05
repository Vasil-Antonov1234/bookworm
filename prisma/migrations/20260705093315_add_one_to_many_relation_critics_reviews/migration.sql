/*
  Warnings:

  - Added the required column `criticId` to the `reviews` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "reviews" ADD COLUMN     "criticId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_criticId_fkey" FOREIGN KEY ("criticId") REFERENCES "critics"("id") ON DELETE CASCADE ON UPDATE CASCADE;
