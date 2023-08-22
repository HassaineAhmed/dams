/*
  Warnings:

  - Added the required column `isForMen` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isForWomen` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Product` ADD COLUMN `isForMen` BOOLEAN NOT NULL,
    ADD COLUMN `isForWomen` BOOLEAN NOT NULL;
