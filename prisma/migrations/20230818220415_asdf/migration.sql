/*
  Warnings:

  - You are about to drop the column `imageName` on the `ProductType` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `ProductType` DROP COLUMN `imageName`;

-- CreateTable
CREATE TABLE `ImageName` (
    `id` VARCHAR(191) NOT NULL,
    `imageName` VARCHAR(191) NOT NULL,
    `productTypeId` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ImageName` ADD CONSTRAINT `ImageName_productTypeId_fkey` FOREIGN KEY (`productTypeId`) REFERENCES `ProductType`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ImageName` ADD CONSTRAINT `ImageName_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
