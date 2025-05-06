-- CreateTable
CREATE TABLE `ParkingSpot` (
    `id` VARCHAR(191) NOT NULL,
    `spotNumber` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `ParkingSpot_spotNumber_key`(`spotNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
