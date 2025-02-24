/*
  Warnings:

  - You are about to drop the `PaymentSession` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "PaymentSession";

-- CreateTable
CREATE TABLE "paymentSession" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "paymentIntentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "paymentSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "paymentSession_paymentIntentId_key" ON "paymentSession"("paymentIntentId");
