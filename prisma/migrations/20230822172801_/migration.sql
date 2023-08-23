/*
  Warnings:

  - You are about to drop the column `productTypeName` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `Field` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductData` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FieldToProductType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `dataType` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoryName` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_productTypeName_fkey`;

-- DropForeignKey
ALTER TABLE `ProductData` DROP FOREIGN KEY `ProductData_dataTypeId_fkey`;

-- DropForeignKey
ALTER TABLE `ProductData` DROP FOREIGN KEY `ProductData_fieldName_fkey`;

-- DropForeignKey
ALTER TABLE `ProductData` DROP FOREIGN KEY `ProductData_productId_fkey`;

-- AlterTable
ALTER TABLE `Product` DROP COLUMN `productTypeName`,
    ADD COLUMN `categoryName` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `Field`;

-- DropTable
DROP TABLE `ProductData`;

-- DropTable
DROP TABLE `_FieldToProductType`;

-- DropTable
DROP TABLE `dataType`;

-- CreateTable
CREATE TABLE `Category` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Category_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_categoryName_fkey` FOREIGN KEY (`categoryName`) REFERENCES `Category`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;
