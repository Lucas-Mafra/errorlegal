import { AggregateRoot } from '@shared/core/Entities/AggregateRoot';
import { Optional } from '@shared/core/types/Optional';
import { CharacterDTO } from '../dto/CharacterDTO';

export class Character extends AggregateRoot<CharacterDTO> {
  constructor(
    props: Optional<CharacterDTO, 'createdAt' | 'updatedAt'>,
    id?: number,
  ) {
    const characterProps: CharacterDTO = {
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? null,
      gameId: props.gameId,
      playerId: props.playerId,
      nickname: props.nickname,
    };

    super(characterProps, id);
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get nickname() {
    return this.props.nickname;
  }

  set nickname(nickname: string) {
    this.props.nickname = nickname;
    this.touch();
  }

  get playerId() {
    return this.props.playerId;
  }

  set playerId(playerId: number) {
    this.props.playerId = playerId;
    this.touch();
  }

  get gameId() {
    return this.props.gameId;
  }

  set gameId(gameId: number) {
    this.props.gameId = gameId;
    this.touch();
  }

  touch() {
    this.props.updatedAt = new Date();
  }
}
