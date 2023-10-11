/*
  Warnings:

  - You are about to drop the column `productCode` on the `billinstatement` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `billinstatement` DROP COLUMN `productCode`,
    ADD COLUMN `chargeItemCode` VARCHAR(191) NULL,
    ADD COLUMN `useMonth` INTEGER NULL;
