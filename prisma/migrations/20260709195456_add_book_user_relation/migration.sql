-- AlterTable
ALTER TABLE "books" ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
