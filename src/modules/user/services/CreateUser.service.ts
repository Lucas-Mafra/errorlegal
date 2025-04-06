import { Injectable } from '@nestjs/common';
import { HashGenerator } from '@providers/cryptography/contracts/HashGenerator';
import { Service } from '@shared/core/contracts/Service';
import { Either, left, right } from '@shared/core/errors/Either';
import { CreateUserDTO } from '../dto/CreateUserDTO';
import { User } from '../entities/User';
import { NameAlreadyExistsError } from '../errors/NameAlreadyExistsError';
import { UserRepository } from '../repositories/contracts/UserRepository';

type Request = CreateUserDTO;

type Errors = NameAlreadyExistsError;

type Response = {
  user: User;
};

@Injectable()
export class CreateUserService implements Service<Request, Errors, Response> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    password,
  }: CreateUserDTO): Promise<Either<Errors, Response>> {
    const nameAlreadyExists = await this.userRepository.findUniqueByName(name);

    if (nameAlreadyExists) {
      return left(new NameAlreadyExistsError());
    }

    const hashedPassword = await this.hashGenerator.hash(password);

    const user = new User({
      name,
      password: hashedPassword,
    });

    await this.userRepository.create(user);

    return right({
      user,
    });
  }
}
