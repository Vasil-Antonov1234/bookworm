-- CreateTable
CREATE TABLE "_BookToReview" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_BookToReview_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_BookToReview_B_index" ON "_BookToReview"("B");

-- AddForeignKey
ALTER TABLE "_BookToReview" ADD CONSTRAINT "_BookToReview_A_fkey" FOREIGN KEY ("A") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToReview" ADD CONSTRAINT "_BookToReview_B_fkey" FOREIGN KEY ("B") REFERENCES "reviews"("id") ON DELETE CASCADE ON UPDATE CASCADE;
