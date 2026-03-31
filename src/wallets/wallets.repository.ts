import { Injectable } from '@nestjs/common';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { TransactionHost } from '@nestjs-cls/transactional';
import { PrismaService } from '../prisma/prisma.service';
import { WalletType } from 'generated/prisma/enums';

@Injectable()
export class WalletsRepository {
  constructor(
    private readonly prisma: TransactionHost<
      TransactionalAdapterPrisma<PrismaService>
    >,
  ) {}

  async createWallet(userId: string, type: WalletType) {
    return this.prisma.tx.wallet.create({
      data: {
        userId,
        type,
      },
    });
  }

  async getWalletByUserId(userId: string) {
    return this.prisma.tx.wallet.findFirst({
      where: {
        userId,
      },
    });
  }

  async getWalletByUserIdAndType(userId: string, type: WalletType) {
    return this.prisma.tx.wallet.findFirst({
      where: {
        userId,
        type,
      },
    });
  }

  async addPoints(walletId: string, points: number) {
    return this.prisma.tx.wallet.update({
      where: {
        id: walletId,
      },
      data: {
        points: {
          increment: points,
        },
      },
    });
  }

  async getActiveWalletsByUserId(userId: string) {
    return this.prisma.tx.wallet.findFirst({
      where: {
        userId,
        points: {
          gt: 0,
        },
      },
    });
  }
}
