/*
  Warnings:

  - Added the required column `paymentMethod` to the `paymentSession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `paymentSession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "paymentSession" ADD COLUMN     "paymentMethod" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "paymentSession_userId_idx" ON "paymentSession"("userId");

-- AddForeignKey
ALTER TABLE "paymentSession" ADD CONSTRAINT "paymentSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
