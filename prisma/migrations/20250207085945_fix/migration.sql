/*
  Warnings:

  - You are about to drop the column `people` on the `Event_Attendee` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Event_Attendee` DROP COLUMN `people`,
    ADD COLUMN `person` INTEGER NOT NULL DEFAULT 1;
