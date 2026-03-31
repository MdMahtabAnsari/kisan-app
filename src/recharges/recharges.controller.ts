import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { RechargesService } from './recharges.service';
import { Session, type UserSession } from '@thallesp/nestjs-better-auth';
import { VerifyRechargeDto } from './dto/verifyRecharge.dto';
import { WalletTypeDto } from './dto/walletType.dto';

@Controller('recharges')
export class RechargesController {
  constructor(private readonly rechargesService: RechargesService) {}

  @Post()
  async recharge(@Body() type: WalletTypeDto, @Session() session: UserSession) {
    const userId = session.user.id;
    return this.rechargesService.recharge(userId, type.type);
  }

  @Post('verify')
  async verifyRecharge(@Body() verifyRechargeDto: VerifyRechargeDto) {
    const { orderId, paymentId, signature } = verifyRechargeDto;
    return this.rechargesService.verifyRecharge(orderId, paymentId, signature);
  }

  @Get('rate/:type')
  async getExchangeRate(@Param() walletTypeDto: WalletTypeDto) {
    return this.rechargesService.getExchangeRate(walletTypeDto.type);
  }
}
