type Props = {
  masterId: number;
  playerId: number;
};

export function isMaster({ masterId, playerId }: Props): boolean {
  if (masterId.toString() !== playerId.toString()) {
    return false;
  }

  return true;
}
