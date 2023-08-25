-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_categoryName_fkey`;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_categoryName_fkey` FOREIGN KEY (`categoryName`) REFERENCES `Category`(`name`) ON DELETE CASCADE ON UPDATE CASCADE;
