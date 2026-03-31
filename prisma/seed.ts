import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { WalletType } from '../generated/prisma/enums';

const adapter = new PrismaPg({
  connectionString: process.env['DATABASE_URL'],
});
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.rechargeExchangeRate.deleteMany();
  const exchangeRate = [
    {
      walletType: WalletType.STANDARD,
      amount: 1000,
      points: 1200,
    },
    {
      walletType: WalletType.PREMIUM,
      amount: 2000,
      points: 2500,
    },
    {
      walletType: WalletType.VIP,
      amount: 3000,
      points: 4000,
    },
  ];

  await prisma.rechargeExchangeRate.createMany({
    data: exchangeRate,
  });
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
