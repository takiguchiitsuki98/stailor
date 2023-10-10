/*
  Warnings:

  - You are about to drop the column `contractMenu` on the `contract` table. All the data in the column will be lost.
  - You are about to drop the column `payment` on the `customer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `contract` DROP COLUMN `contractMenu`,
    ADD COLUMN `contractDetails` VARCHAR(191) NULL,
    ADD COLUMN `contractorName` VARCHAR(191) NULL,
    ADD COLUMN `supplyName` VARCHAR(191) NULL,
    MODIFY `contractCurrent` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `customer` DROP COLUMN `payment`,
    ADD COLUMN `customerName` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Merchandise` (
    `chargeItemCode` VARCHAR(191) NOT NULL,
    `productName` VARCHAR(191) NULL,
    `unit` VARCHAR(191) NULL,
    `unitPrice` INTEGER NULL,
    `position` INTEGER NULL,
    `created` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated` DATETIME(3) NULL,

    PRIMARY KEY (`chargeItemCode`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
