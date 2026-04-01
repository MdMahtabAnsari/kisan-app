import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { RechargesRepository } from './recharges.repository';
import { WalletsRepository } from 'src/wallets/wallets.repository';
import { CreateRechargeDto } from './dto/createRecharge.dto';
import { randomUUID } from 'crypto';
import { RazorpayService } from 'src/payments/razorpay.service';
import { Transactional } from '@nestjs-cls/transactional';
import { WalletType } from 'generated/prisma/enums';

@Injectable()
export class RechargesService {
  constructor(
    private readonly rechargesRepository: RechargesRepository,
    private readonly walletsRepository: WalletsRepository,
    private readonly razorpayService: RazorpayService,
  ) {}

  async recharge(userId: string, type: WalletType) {
    const wallet = await this.walletsRepository.getWalletByUserIdAndType(
      userId,
      type,
    );
    if (!wallet) {
      throw new NotFoundException('Wallet not found for the user');
    }
    const exchangeRate = await this.rechargesRepository.getExchangeRate(
      wallet.type,
    );
    if (!exchangeRate) {
      throw new NotFoundException(
        'Exchange rate not found for the wallet type',
      );
    }
    const order = await this.razorpayService.createOrder(
      Number(exchangeRate.amount),
      'INR',
      'Recharge',
      {
        userId,
        walletId: wallet.id,
      },
    );
    const createRechargeDto: CreateRechargeDto = {
      userId,
      walletId: wallet.id,
      exchangeRateId: exchangeRate.id,
      amount: Number(exchangeRate.amount),
      points: Number(exchangeRate.points),
      orderId: randomUUID(),
    };

    await this.rechargesRepository.createRecharge(createRechargeDto);

    return order;
  }

  @Transactional()
  async verifyRecharge(orderId: string, paymentId: string, signature: string) {
    console.log('data', {
      orderId,
      paymentId,
      signature,
    });
    const recharge =
      await this.rechargesRepository.getRechargeByOrderId(orderId);
    console.log('recharge', recharge);
    if (!recharge) {
      throw new NotFoundException('Recharge not found for the order ID');
    }
    const isValid = this.razorpayService.verifyPayment(
      orderId,
      paymentId,
      signature,
    );
    if (!isValid) {
      throw new BadRequestException('Invalid payment signature');
    }

    await this.rechargesRepository.updateRechargeStatus(
      recharge.id,
      'COMPLETED',
    );
    await this.rechargesRepository.createProviderPayment(
      recharge.id,
      paymentId,
      'RAZORPAY',
    );

    return this.walletsRepository.addPoints(
      recharge.walletId,
      Number(recharge.points),
    );
  }

  async getExchangeRate(walletType: WalletType) {
    return this.rechargesRepository.getExchangeRate(walletType);
  }
}
