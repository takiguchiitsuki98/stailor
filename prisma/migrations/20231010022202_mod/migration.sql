/*
  Warnings:

  - You are about to drop the column `electricityCharge` on the `billinstatement` table. All the data in the column will be lost.
  - You are about to drop the column `electricityChargeGovernment` on the `billinstatement` table. All the data in the column will be lost.
  - You are about to drop the column `electricityChargeTax` on the `billinstatement` table. All the data in the column will be lost.
  - You are about to drop the column `expenses` on the `billinstatement` table. All the data in the column will be lost.
  - You are about to drop the column `expensesGovernment` on the `billinstatement` table. All the data in the column will be lost.
  - You are about to drop the column `expensesTax` on the `billinstatement` table. All the data in the column will be lost.
  - You are about to drop the column `governmentGovernment` on the `billinstatement` table. All the data in the column will be lost.
  - You are about to drop the column `governmentTax` on the `billinstatement` table. All the data in the column will be lost.
  - You are about to drop the column `recycledEnergy` on the `billinstatement` table. All the data in the column will be lost.
  - You are about to drop the column `recycledEnergyGovernment` on the `billinstatement` table. All the data in the column will be lost.
  - You are about to drop the column `recycledEnergyTax` on the `billinstatement` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `billinstatement` DROP COLUMN `electricityCharge`,
    DROP COLUMN `electricityChargeGovernment`,
    DROP COLUMN `electricityChargeTax`,
    DROP COLUMN `expenses`,
    DROP COLUMN `expensesGovernment`,
    DROP COLUMN `expensesTax`,
    DROP COLUMN `governmentGovernment`,
    DROP COLUMN `governmentTax`,
    DROP COLUMN `recycledEnergy`,
    DROP COLUMN `recycledEnergyGovernment`,
    DROP COLUMN `recycledEnergyTax`,
    ADD COLUMN `productCode` VARCHAR(191) NULL,
    ADD COLUMN `tax` INTEGER NULL,
    ADD COLUMN `totalAmount` INTEGER NULL;
