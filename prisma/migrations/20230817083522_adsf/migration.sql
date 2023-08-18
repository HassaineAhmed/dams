/*
  Warnings:

  - You are about to alter the column `B` on the `_FieldToProductType` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - Added the required column `sizingSystem` to the `ProductType` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_FieldToProductType` DROP FOREIGN KEY `_FieldToProductType_A_fkey`;

-- DropForeignKey
ALTER TABLE `_FieldToProductType` DROP FOREIGN KEY `_FieldToProductType_B_fkey`;

-- AlterTable
ALTER TABLE `ProductType` ADD COLUMN `sizingSystem` ENUM('letters', 'numbers') NOT NULL;

-- AlterTable
ALTER TABLE `_FieldToProductType` MODIFY `B` INTEGER NOT NULL;
