/*
  Warnings:

  - The primary key for the `Product` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `ProductData` DROP FOREIGN KEY `ProductData_productId_fkey`;

-- AlterTable
ALTER TABLE `Product` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `ProductData` MODIFY `productId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `ProductData` ADD CONSTRAINT `ProductData_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
