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
}
