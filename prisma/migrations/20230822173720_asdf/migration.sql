-- AlterTable
ALTER TABLE `ImageName` ADD COLUMN `product2Id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Order` ADD COLUMN `product2Id` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Product2` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL DEFAULT 0,
    `isAvailable` BOOLEAN NOT NULL DEFAULT false,
    `isComingSoon` BOOLEAN NOT NULL DEFAULT false,
    `isTrending` BOOLEAN NOT NULL DEFAULT false,
    `isForMen` BOOLEAN NOT NULL,
    `isForWomen` BOOLEAN NOT NULL,
    `isNewArrival` BOOLEAN NOT NULL DEFAULT true,
    `design` VARCHAR(191) NOT NULL DEFAULT '',
    `fit` VARCHAR(191) NOT NULL DEFAULT '',
    `model` VARCHAR(191) NOT NULL DEFAULT '',
    `categoryName` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Product2_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ImageName` ADD CONSTRAINT `ImageName_product2Id_fkey` FOREIGN KEY (`product2Id`) REFERENCES `Product2`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product2` ADD CONSTRAINT `Product2_categoryName_fkey` FOREIGN KEY (`categoryName`) REFERENCES `Category`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_product2Id_fkey` FOREIGN KEY (`product2Id`) REFERENCES `Product2`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
