import { Injectable } from '@nestjs/common';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { TransactionHost } from '@nestjs-cls/transactional';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersRepository {
  constructor(
    private readonly prisma: TransactionHost<
      TransactionalAdapterPrisma<PrismaService>
    >,
  ) {}

  async isUserExists(identifier: string) {
    return this.prisma.tx.user.findFirst({
      where: {
        OR: [
          {
            email: identifier,
          },
          {
            phoneNumber: identifier,
          },
          {
            username: identifier,
          },
          {
            aadhaarNumber: identifier,
          },
        ],
      },
    });
  }

  async isEmailExists(email: string) {
    return this.prisma.tx.user.findFirst({
      where: {
        email: email,
      },
    });
  }

  async isUsernameExists(username: string) {
    return this.prisma.tx.user.findFirst({
      where: {
        username: username,
      },
    });
  }

  async isPhoneNumberExists(phoneNumber: string) {
    return this.prisma.tx.user.findFirst({
      where: {
        phoneNumber: phoneNumber,
      },
    });
  }

  async isAadhaarNumberExists(aadhaarNumber: string) {
    return this.prisma.tx.user.findFirst({
      where: {
        aadhaarNumber: aadhaarNumber,
      },
    });
  }
}
