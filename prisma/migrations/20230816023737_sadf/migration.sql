/*
  Warnings:

  - The primary key for the `ProductType` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `_FieldToProductType` DROP FOREIGN KEY `_FieldToProductType_B_fkey`;

-- AlterTable
ALTER TABLE `ProductType` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `_FieldToProductType` MODIFY `B` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `_FieldToProductType` ADD CONSTRAINT `_FieldToProductType_B_fkey` FOREIGN KEY (`B`) REFERENCES `ProductType`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
