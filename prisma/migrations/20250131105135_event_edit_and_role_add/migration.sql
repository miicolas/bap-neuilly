/*
  Warnings:

  - You are about to drop the `Event` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `role` ENUM('USER', 'SELLER', 'ADMIN') NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE `Event`;

-- CreateTable
CREATE TABLE `Event_Attendee` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `gender` ENUM('MALE', 'FEMALE', 'OTHER') NOT NULL,
    `age` INTEGER NOT NULL,
    `city` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Event_Attendee_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
