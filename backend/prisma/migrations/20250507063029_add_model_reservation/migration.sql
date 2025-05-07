-- CreateTable
CREATE TABLE `Reservation` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `parkingSpotNumber` VARCHAR(191) NOT NULL,
    `reservedDate` DATETIME(3) NOT NULL,
    `reservedTime` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_parkingSpotNumber_fkey` FOREIGN KEY (`parkingSpotNumber`) REFERENCES `ParkingSpot`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
