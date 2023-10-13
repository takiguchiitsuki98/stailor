-- CreateTable
CREATE TABLE `Customer` (
    `forvalId` VARCHAR(191) NOT NULL,
    `syshanId` VARCHAR(191) NULL,
    `customerName` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `postcode` VARCHAR(191) NULL,
    `created` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated` DATETIME(3) NULL,

    PRIMARY KEY (`forvalId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Contract` (
    `supplyNumber` VARCHAR(191) NOT NULL,
    `syshanId` VARCHAR(191) NULL,
    `supplyName` VARCHAR(191) NULL,
    `supplyAdress` VARCHAR(191) NULL,
    `contractorName` VARCHAR(191) NULL,
    `contractDetails` VARCHAR(191) NULL,
    `contractCurrent` VARCHAR(191) NULL,
    `paymentMethod` VARCHAR(191) NULL,
    `created` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated` DATETIME(3) NULL,

    PRIMARY KEY (`supplyNumber`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BillinStatement` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `forvalId` VARCHAR(191) NOT NULL,
    `syshanId` VARCHAR(191) NOT NULL,
    `fitId` VARCHAR(191) NULL,
    `supplyNumberId` VARCHAR(191) NOT NULL,
    `userName` VARCHAR(191) NULL,
    `status` INTEGER NULL,
    `paymentMonth` INTEGER NULL,
    `useMonth` INTEGER NULL,
    `startDay` INTEGER NULL,
    `endDay` INTEGER NULL,
    `chargeItemCode` VARCHAR(191) NULL,
    `useAmount` INTEGER NULL,
    `totalAmount` INTEGER NULL,
    `government` INTEGER NULL,
    `tax` INTEGER NULL,
    `CO2Discharge` VARCHAR(191) NULL,
    `parentId` VARCHAR(191) NULL,
    `childId` VARCHAR(191) NULL,
    `created` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
