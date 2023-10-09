/*
  Warnings:

  - You are about to drop the column `supplyNumber` on the `billinstatement` table. All the data in the column will be lost.
  - Added the required column `supplyNumberId` to the `BillinStatement` table without a default value. This is not possible if the table is not empty.
  - Made the column `forvalId` on table `billinstatement` required. This step will fail if there are existing NULL values in that column.
  - Made the column `syshanId` on table `billinstatement` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `billinstatement` DROP COLUMN `supplyNumber`,
    ADD COLUMN `supplyNumberId` VARCHAR(191) NOT NULL,
    MODIFY `forvalId` VARCHAR(191) NOT NULL,
    MODIFY `syshanId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Customer` (
    `forvalId` VARCHAR(191) NOT NULL,
    `syshanId` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `postcode` VARCHAR(191) NULL,
    `payment` VARCHAR(191) NULL,
    `created` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated` DATETIME(3) NULL,

    PRIMARY KEY (`forvalId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Contract` (
    `supplyNumber` VARCHAR(191) NOT NULL,
    `syshanId` VARCHAR(191) NULL,
    `contractMenu` VARCHAR(191) NULL,
    `contractCurrent` INTEGER NULL,
    `paymentMethod` VARCHAR(191) NULL,
    `created` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated` DATETIME(3) NULL,

    PRIMARY KEY (`supplyNumber`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
