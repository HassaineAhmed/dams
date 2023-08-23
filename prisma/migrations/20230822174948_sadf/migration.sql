/*
  Warnings:

  - You are about to drop the column `productTypeId` on the `ImageName` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `ImageName` DROP FOREIGN KEY `ImageName_productTypeId_fkey`;

-- AlterTable
ALTER TABLE `ImageName` DROP COLUMN `productTypeId`;
