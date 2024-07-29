import { AggregateRoot } from '@shared/core/Entities/AggregateRoot';
import { Optional } from '@shared/core/types/Optional';
import { PlayerDTO } from '../dto/PlayerDTO';

export class Player extends AggregateRoot<PlayerDTO> {
  constructor(
    props: Optional<PlayerDTO, 'createdAt' | 'updatedAt' | 'masterName'>,
    id?: number,
  ) {
    const playerProps: PlayerDTO = {
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? null,
      name: props.name,
      password: props.password,
      masterName: props.masterName ?? null,
    };

    super(playerProps, id);
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get name() {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
    this.touch();
  }

  get password() {
    return this.props.password;
  }

  set password(password: string) {
    this.props.password = password;
    this.touch();
  }

  get masterName() {
    return this.props.masterName;
  }

  set masterName(masterName: string | null) {
    this.props.masterName = masterName;
    this.touch();
  }

  touch() {
    this.props.updatedAt = new Date();
  }
}

// Eventos de domínio
// class CharacterAddedToPlayerEvent implements DomainEvent {
//   constructor(
//     public readonly playerId: number,
//     public readonly characterId: number,
//   ) {}
// }

// class CharacterRemovedFromPlayerEvent implements DomainEvent {
//   constructor(
//     public readonly playerId: number,
//     public readonly characterId: number,
//   ) {}
// }
