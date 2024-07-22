/*
  Warnings:

  - You are about to drop the column `createdAt` on the `games` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `games` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `games` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "games" DROP COLUMN "createdAt",
DROP COLUMN "isActive",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "updated_at" TIMESTAMP(3);
