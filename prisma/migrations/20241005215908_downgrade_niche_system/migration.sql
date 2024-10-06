/*
  Warnings:

  - You are about to drop the column `createdAt` on the `profile` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `profile` table. All the data in the column will be lost.
  - You are about to alter the column `name` on the `profile` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `image` on the `profile` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to drop the `niche` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `niches` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `niche` DROP FOREIGN KEY `Niche_profileId_fkey`;

-- AlterTable
ALTER TABLE `profile` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `niches` VARCHAR(191) NOT NULL,
    MODIFY `name` VARCHAR(191) NOT NULL,
    MODIFY `image` VARCHAR(191) NOT NULL,
    MODIFY `description` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `niche`;
