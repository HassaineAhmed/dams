-- CreateTable
CREATE TABLE `Admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Admin_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `ProductType_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Field` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `htmlType` VARCHAR(191) NOT NULL,
    `jsType` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Field_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `isAvailable` BOOLEAN NOT NULL DEFAULT false,
    `path` VARCHAR(191) NOT NULL DEFAULT '',
    `price` DOUBLE NOT NULL DEFAULT 0,
    `previous_price` DOUBLE NOT NULL DEFAULT 0,
    `howManyPics` INTEGER NOT NULL DEFAULT 3,
    `trending` BOOLEAN NOT NULL DEFAULT false,
    `comingSoon` BOOLEAN NOT NULL DEFAULT false,
    `new` BOOLEAN NOT NULL DEFAULT false,
    `productTypeName` VARCHAR(191) NOT NULL,
    `design` VARCHAR(191) NOT NULL DEFAULT '',
    `fit` VARCHAR(191) NOT NULL DEFAULT '',
    `material` VARCHAR(191) NOT NULL DEFAULT '',
    `model` VARCHAR(191) NOT NULL DEFAULT '',
    `reducedPrice` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `Product_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CodePromo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `codePromo` VARCHAR(191) NOT NULL,
    `count` INTEGER NOT NULL,
    `percentage` INTEGER NOT NULL,
    `profit` INTEGER NOT NULL,

    UNIQUE INDEX `CodePromo_codePromo_key`(`codePromo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductData` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productId` INTEGER NOT NULL,
    `fieldName` VARCHAR(191) NOT NULL,
    `dataTypeId` INTEGER NOT NULL,

    UNIQUE INDEX `ProductData_fieldName_dataTypeId_key`(`fieldName`, `dataTypeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dataType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `int` INTEGER NULL,
    `string` VARCHAR(191) NULL,
    `bolean` BOOLEAN NULL,
    `float` DOUBLE NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productName` VARCHAR(191) NOT NULL,
    `fullName` VARCHAR(191) NOT NULL,
    `phoneNumber` INTEGER NOT NULL,
    `secondPhoneNumber` INTEGER NULL,
    `wilaya` VARCHAR(191) NOT NULL,
    `fullAdress` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `size` VARCHAR(191) NOT NULL,
    `color` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL,
    `codePromo` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,
    `isPaid` BOOLEAN NOT NULL DEFAULT false,
    `isReturned` BOOLEAN NOT NULL DEFAULT false,
    `revenue` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_FieldToProductType` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_FieldToProductType_AB_unique`(`A`, `B`),
    INDEX `_FieldToProductType_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_productTypeName_fkey` FOREIGN KEY (`productTypeName`) REFERENCES `ProductType`(`name`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductData` ADD CONSTRAINT `ProductData_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductData` ADD CONSTRAINT `ProductData_fieldName_fkey` FOREIGN KEY (`fieldName`) REFERENCES `Field`(`name`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductData` ADD CONSTRAINT `ProductData_dataTypeId_fkey` FOREIGN KEY (`dataTypeId`) REFERENCES `dataType`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_productName_fkey` FOREIGN KEY (`productName`) REFERENCES `Product`(`name`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FieldToProductType` ADD CONSTRAINT `_FieldToProductType_A_fkey` FOREIGN KEY (`A`) REFERENCES `Field`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FieldToProductType` ADD CONSTRAINT `_FieldToProductType_B_fkey` FOREIGN KEY (`B`) REFERENCES `ProductType`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
