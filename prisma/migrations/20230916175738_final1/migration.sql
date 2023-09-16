/*
  Warnings:

  - You are about to drop the column `isPaid` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `isReturned` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Order` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "OrderStage" ADD VALUE 'returned';

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "isPaid",
DROP COLUMN "isReturned",
DROP COLUMN "price";
