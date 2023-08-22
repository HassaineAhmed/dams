/*
  Warnings:

  - You are about to drop the column `comingSoon` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `howManyPics` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `new` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `path` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `trending` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Product` DROP COLUMN `comingSoon`,
    DROP COLUMN `howManyPics`,
    DROP COLUMN `new`,
    DROP COLUMN `path`,
    DROP COLUMN `trending`,
    ADD COLUMN `isComingSoon` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `isNew` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `isTrending` BOOLEAN NOT NULL DEFAULT false;
