-- CreateTable
CREATE TABLE "player_games" (
    "playerId" INTEGER NOT NULL,
    "gameId" INTEGER NOT NULL,

    CONSTRAINT "player_games_pkey" PRIMARY KEY ("playerId","gameId")
);

-- AddForeignKey
ALTER TABLE "player_games" ADD CONSTRAINT "player_games_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "players"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "player_games" ADD CONSTRAINT "player_games_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE CASCADE;
