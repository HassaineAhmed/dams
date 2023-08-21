/*
  Warnings:

  - A unique constraint covering the columns `[imageName]` on the table `ImageName` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `ImageName_imageName_key` ON `ImageName`(`imageName`);
