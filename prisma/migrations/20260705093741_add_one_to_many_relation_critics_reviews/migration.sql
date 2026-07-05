-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_criticId_fkey";

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_criticId_fkey" FOREIGN KEY ("criticId") REFERENCES "critics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
