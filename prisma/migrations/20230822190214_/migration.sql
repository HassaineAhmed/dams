/*
  Warnings:

  - You are about to drop the column `product2Id` on the `ImageName` table. All the data in the column will be lost.
  - You are about to drop the column `product2Id` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the `Product2` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductType` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `sizingSystem` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `ImageName` DROP FOREIGN KEY `ImageName_product2Id_fkey`;

-- DropForeignKey
ALTER TABLE `Order` DROP FOREIGN KEY `Order_product2Id_fkey`;

-- DropForeignKey
ALTER TABLE `Product2` DROP FOREIGN KEY `Product2_categoryName_fkey`;

-- AlterTable
ALTER TABLE `Category` ADD COLUMN `sizingSystem` ENUM('letters', 'numbers') NOT NULL;

-- AlterTable
ALTER TABLE `ImageName` DROP COLUMN `product2Id`,
    ADD COLUMN `categoryId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Order` DROP COLUMN `product2Id`;

-- DropTable
DROP TABLE `Product2`;

-- DropTable
DROP TABLE `ProductType`;

-- AddForeignKey
ALTER TABLE `ImageName` ADD CONSTRAINT `ImageName_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
