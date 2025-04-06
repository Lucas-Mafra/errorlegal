import { Repository } from '@shared/core/contracts/Repository';
import { User } from '../../entities/User';

export abstract class UserRepository implements Repository<User> {
  abstract findUnique(id: number): Promise<User | null>;
  abstract findUniqueByName(name: string): Promise<User | null>;
  abstract create(user: User): Promise<void>;
  abstract save(user: User): Promise<void>;
  abstract delete(id: number): Promise<void>;
  abstract findMany(ctx?: unknown): Promise<User[]>;
}
