import { ValueObject } from '@shared/core/Entities/ValueObject';
import { CharacterWithGameInfoDTO } from '../dto/CharacterWithGameInfoDTO';

export class CharacterWithGameInfo extends ValueObject<CharacterWithGameInfoDTO> {
  constructor(props: CharacterWithGameInfoDTO) {
    const characterWithGameInfoProps = {
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
      gameId: props.gameId,
      playerId: props.playerId,
      nickname: props.nickname,
      gameName: props.gameName,
    };

    super(characterWithGameInfoProps);
  }

  get gameName() {
    return this.props.gameName;
  }

  get nickname() {
    return this.props.nickname;
  }

  get playerId() {
    return this.props.playerId;
  }

  get gameId() {
    return this.props.gameId;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }
}
