import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async isUserExists(identifier: string) {
    const user = await this.usersRepository.isUserExists(identifier);
    return !!user;
  }

  async isEmailExists(email: string) {
    const user = await this.usersRepository.isEmailExists(email);
    return !!user;
  }

  async isUsernameExists(username: string) {
    const user = await this.usersRepository.isUsernameExists(username);
    return !!user;
  }

  async isPhoneNumberExists(phoneNumber: string) {
    const user = await this.usersRepository.isPhoneNumberExists(phoneNumber);
    return !!user;
  }

  async isAadhaarNumberExists(aadhaarNumber: string) {
    const user =
      await this.usersRepository.isAadhaarNumberExists(aadhaarNumber);
    return !!user;
  }
}
