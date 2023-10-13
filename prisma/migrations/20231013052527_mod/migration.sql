/*
  Warnings:

  - The primary key for the `customer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `address` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `customerName` on the `customer` table. All the data in the column will be lost.
  - Added the required column `parentId` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `customer` DROP PRIMARY KEY,
    DROP COLUMN `address`,
    DROP COLUMN `customerName`,
    ADD COLUMN `address1` VARCHAR(191) NULL,
    ADD COLUMN `address2` VARCHAR(191) NULL,
    ADD COLUMN `billingCode` VARCHAR(191) NULL,
    ADD COLUMN `customerName1` VARCHAR(191) NULL,
    ADD COLUMN `customerName2` VARCHAR(191) NULL,
    ADD COLUMN `honorific` VARCHAR(191) NULL,
    ADD COLUMN `parentId` VARCHAR(191) NOT NULL,
    ADD COLUMN `telephone` VARCHAR(191) NULL,
    MODIFY `forvalId` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`parentId`);
