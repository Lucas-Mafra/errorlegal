import { ValueObject } from '@shared/core/Entities/ValueObject';
import { GameWithPlayerInfoDTO } from '../dto/GameWithPlayerInfoDTO';

export class GameWithPlayerInfo extends ValueObject<GameWithPlayerInfoDTO> {
  constructor(props: GameWithPlayerInfoDTO) {
    const gameInfoProps = {
      playerJoinedAt: props.playerJoinedAt,
      gameName: props.gameName,
      gameMasterId: props.gameMasterId,
      gameId: props.gameId,
      playerId: props.playerId,
      isMaster: props.isMaster ?? false,
    };

    super(gameInfoProps);
  }

  get playerJoinedAt(): Date {
    return this.props.playerJoinedAt;
  }

  get gameName(): string {
    return this.props.gameName;
  }

  get gameMasterId(): number {
    return this.props.gameMasterId;
  }

  get gameId(): number {
    return this.props.gameId;
  }

  get playerId(): number {
    return this.props.playerId;
  }

  get isMaster(): boolean {
    return this.props.isMaster;
  }
}
