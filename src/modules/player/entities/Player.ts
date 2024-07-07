import { Entity } from '@shared/core/Entities/Entity';
import { Optional } from '@shared/core/types/Optional';
import { PlayerDTO } from '../dto/PlayerDTO';

export class Player extends Entity<PlayerDTO> {
  constructor(
    props: Optional<PlayerDTO, 'createdAt' | 'updatedAt' | 'gameId'>,
    id?: number,
  ) {
    const playerProps: PlayerDTO = {
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? null,
      nickname: props.nickname,
      password: props.password,
      gameId: props.gameId ?? null,
      roleId: props.roleId ?? null,
    };

    super(playerProps, id);
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

  get password() {
    return this.props.password;
  }

  set password(password: string) {
    this.props.password = password;
    this.touch();
  }

  get gameId() {
    if (this.props.gameId === null) {
      throw new Error('gameId is null');
    }
    return this.props.gameId;
  }

  set gameId(gameId: number) {
    this.props.gameId = gameId;
    this.touch();
  }

  get roleId() {
    return this.props.roleId;
  }

  touch() {
    this.props.updatedAt = new Date();
  }
}
