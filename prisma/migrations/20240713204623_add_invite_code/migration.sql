/*
  Warnings:

  - A unique constraint covering the columns `[invite_code]` on the table `games` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `active_players` to the `games` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `games` table without a default value. This is not possible if the table is not empty.
  - The required column `invite_code` was added to the `games` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `total_players` to the `games` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "games" ADD COLUMN     "active_players" INTEGER NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "image_url" TEXT,
ADD COLUMN     "invite_code" TEXT NOT NULL,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "total_players" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "games_invite_code_key" ON "games"("invite_code");
