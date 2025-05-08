/*
  Warnings:

  - You are about to drop the column `spotNumber` on the `ParkingSpot` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `ParkingSpot` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `ParkingSpot` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `ParkingSpot_spotNumber_key` ON `ParkingSpot`;

-- AlterTable
ALTER TABLE `ParkingSpot` DROP COLUMN `spotNumber`,
    ADD COLUMN `slug` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `ParkingSpot_slug_key` ON `ParkingSpot`(`slug`);
