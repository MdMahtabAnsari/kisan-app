import { Module } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { WalletsController } from './wallets.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { WalletsRepository } from './wallets.repository';

@Module({
  imports: [PrismaModule],
  providers: [WalletsService, WalletsRepository],
  controllers: [WalletsController],
  exports: [WalletsService, WalletsRepository],
})
export class WalletsModule {}
