type Props = {
  characterId: number;
  playerId: number;
};

export function isCharacterOwner({ characterId, playerId }: Props): boolean {
  if (characterId.toString() !== playerId.toString()) {
    return false;
  }

  return true;
}
