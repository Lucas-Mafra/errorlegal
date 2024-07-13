import { AggregateRoot } from '@shared/core/Entities/AggregateRoot';
import { Optional } from '@shared/core/types/Optional';
import { GameDTO } from '../dto/GameDTO';

export class Game extends AggregateRoot<GameDTO> {
  constructor(
    props: Optional<
      GameDTO,
      | 'createdAt'
      | 'updatedAt'
      | 'imageUrl'
      | 'activePlayers'
      | 'isActive'
      | 'totalPlayers'
      | 'inviteCode'
    >,
    id?: number,
  ) {
    const playerProps: GameDTO = {
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? null,
      name: props.name,
      description: props.description,
      imageUrl: props.imageUrl ?? null,
      isActive: props.isActive ?? true,
      totalPlayers: props.totalPlayers ?? 0,
      activePlayers: props.activePlayers ?? 0,
      masterId: props.masterId,
      inviteCode: props.inviteCode ?? '',
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

  get description() {
    return this.props.description;
  }

  set description(description: string) {
    this.props.description = description;
    this.touch();
  }

  get imageUrl() {
    return this.props.imageUrl;
  }

  set imageUrl(imageUrl: string | null) {
    this.props.imageUrl = imageUrl;
    this.touch();
  }

  get isActive() {
    return this.props.isActive;
  }

  set isActive(isActive: boolean) {
    this.props.isActive = isActive;
    this.touch();
  }

  get totalPlayers() {
    return this.props.totalPlayers;
  }

  set totalPlayers(totalPlayers: number) {
    this.props.totalPlayers = totalPlayers;
    this.touch();
  }

  get activePlayers() {
    return this.props.activePlayers;
  }

  set activePlayers(activePlayers: number) {
    this.props.activePlayers = activePlayers;
    this.touch();
  }

  get masterId() {
    return this.props.masterId;
  }

  set masterId(masterId: number) {
    this.props.masterId = masterId;
    this.touch();
  }

  get inviteCode() {
    return this.props.inviteCode;
  }

  touch() {
    this.props.updatedAt = new Date();
  }
}
