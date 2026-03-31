import { Injectable } from '@nestjs/common';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { TransactionHost } from '@nestjs-cls/transactional';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRechargeDto } from './dto/createRecharge.dto';
import {
  PaymentProvider,
  RechargeStatus,
  WalletType,
} from 'generated/prisma/enums';

@Injectable()
export class RechargesRepository {
  constructor(
    private readonly prisma: TransactionHost<
      TransactionalAdapterPrisma<PrismaService>
    >,
  ) {}

  async createRecharge(createRechargeDto: CreateRechargeDto) {
    return this.prisma.tx.recharge.create({
      data: createRechargeDto,
    });
  }

  async getExchangeRate(type: WalletType) {
    return this.prisma.tx.rechargeExchangeRate.findFirst({
      where: {
        walletType: type,
      },
    });
  }

  async getRechargeByOrderId(orderId: string) {
    return this.prisma.tx.recharge.findFirst({
      where: {
        orderId,
      },
    });
  }

  async updateRechargeStatus(id: string, status: RechargeStatus) {
    return this.prisma.tx.recharge.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
  }

  async createProviderPayment(
    rechargeId: string,
    providerPaymentId: string,
    provider: PaymentProvider,
  ) {
    return this.prisma.tx.providerPayment.create({
      data: {
        rechargeId,
        providerPaymentId,
        provider,
      },
    });
  }
}
