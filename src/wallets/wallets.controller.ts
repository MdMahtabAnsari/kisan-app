import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { CreateWalletDto } from './dto/createWallet.dto';
import { Session, type UserSession } from '@thallesp/nestjs-better-auth';
import { WalletTypeDto } from 'src/recharges/dto/walletType.dto';

@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Post()
  async createWallet(
    @Body() createWalletDto: CreateWalletDto,
    @Session() session: UserSession,
  ) {
    const userId = session.user.id;
    return this.walletsService.createWallet(userId, createWalletDto.type);
  }

  @Get('/:type')
  async getWallet(
    @Session() session: UserSession,
    @Param() walletTypeDto: WalletTypeDto,
  ) {
    const userId = session.user.id;
    return this.walletsService.getWallet(userId, walletTypeDto.type);
  }
  @Get()
  async getActiveWallets(@Session() session: UserSession) {
    const userId = session.user.id;
    return this.walletsService.getActiveWallets(userId);
  }
}
