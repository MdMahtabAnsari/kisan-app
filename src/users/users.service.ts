import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async isUserExists(identifier: string) {
    const user = await this.usersRepository.isUserExists(identifier);
    return !!user;
  }
}
