/*
  Warnings:

  - You are about to drop the column `parkingSpotNumber` on the `Reservation` table. All the data in the column will be lost.
  - Added the required column `parkingSpotId` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Reservation` DROP FOREIGN KEY `Reservation_parkingSpotNumber_fkey`;

-- DropIndex
DROP INDEX `Reservation_parkingSpotNumber_fkey` ON `Reservation`;

-- AlterTable
ALTER TABLE `Reservation` DROP COLUMN `parkingSpotNumber`,
    ADD COLUMN `parkingSpotId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_parkingSpotId_fkey` FOREIGN KEY (`parkingSpotId`) REFERENCES `ParkingSpot`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
