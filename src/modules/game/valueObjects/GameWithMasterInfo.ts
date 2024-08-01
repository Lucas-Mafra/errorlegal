import { ValueObject } from '@shared/core/Entities/ValueObject';
import { GameWithMasterInfoDTO } from '../dto/GameWithMasterInfoDTO';

export class GameWithMasterInfo extends ValueObject<GameWithMasterInfoDTO> {
  constructor(props: GameWithMasterInfoDTO) {
    const gameWithMasterInfo = {
      id: props.id,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
      inviteCode: props.inviteCode,
      name: props.name,
      description: props.description,
      imageUrl: props.imageUrl,
      totalPlayers: props.totalPlayers,
      masterId: props.masterId,
      masterName: props.masterName,
    };

    super(gameWithMasterInfo);
  }

  get id() {
    return this.props.id;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get inviteCode() {
    return this.props.inviteCode;
  }

  get name() {
    return this.props.name;
  }

  get description() {
    return this.props.description;
  }

  get imageUrl() {
    return this.props.imageUrl;
  }

  get totalPlayers() {
    return this.props.totalPlayers;
  }

  get masterId() {
    return this.props.masterId;
  }

  get masterName() {
    return this.props.masterName;
  }
}
