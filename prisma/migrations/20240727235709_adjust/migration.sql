/*
  Warnings:

  - A unique constraint covering the columns `[nickname,game_id]` on the table `characters` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "characters_nickname_key";

-- CreateIndex
CREATE UNIQUE INDEX "characters_nickname_game_id_key" ON "characters"("nickname", "game_id");
