import { Module } from '@nestjs/common';
import { RechargesService } from './recharges.service';
import { RechargesController } from './recharges.controller';
import { RechargesRepository } from './recharges.repository';
import { PaymentsModule } from '../payments/payments.module';
import { WalletsModule } from 'src/wallets/wallets.module';

@Module({
  imports: [PaymentsModule, WalletsModule],
  providers: [RechargesService, RechargesRepository],
  controllers: [RechargesController],
  exports: [RechargesService, RechargesRepository],
})
export class RechargesModule {}
