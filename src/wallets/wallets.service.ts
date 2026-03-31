import { Injectable } from '@nestjs/common';
import { WalletsRepository } from './wallets.repository';
import { WalletType } from 'generated/prisma/enums';
import { ConflictException } from '@nestjs/common/exceptions';

@Injectable()
export class WalletsService {
  constructor(private readonly walletsRepository: WalletsRepository) {}

  async createWallet(userId: string, type: WalletType) {
    const existingWallet =
      await this.walletsRepository.getWalletByUserIdAndType(userId, type);

    if (existingWallet) {
      throw new ConflictException('User already has a wallet');
    }

    return this.walletsRepository.createWallet(userId, type);
  }

  async getWallet(userId: string, type: WalletType) {
    return this.walletsRepository.getWalletByUserIdAndType(userId, type);
  }

  async getActiveWallets(userId: string) {
    return this.walletsRepository.getActiveWalletsByUserId(userId);
  }
}
