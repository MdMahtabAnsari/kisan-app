import { Module } from '@nestjs/common';
import { NotificationsModule } from '../notifications/notifications.module';
import { AuthModule as BetterAuthModule } from '@thallesp/nestjs-better-auth';
import { nestAuth } from './configs/nest-auth';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { EmailQueueService } from 'src/notifications/emailQueue.service';
import { SmsQueueService } from 'src/notifications/smsQueue.service';

@Module({
  imports: [
    NotificationsModule,
    PrismaModule,
    BetterAuthModule.forRootAsync({
      imports: [PrismaModule, NotificationsModule],
      inject: [PrismaService, EmailQueueService, SmsQueueService],
      useFactory: (
        prisma: PrismaService,
        emailQueue: EmailQueueService,
        smsQueue: SmsQueueService,
      ) => ({
        auth: nestAuth(prisma, emailQueue, smsQueue),
        bodyParser: {
          json: { limit: '2mb' },
          urlencoded: { limit: '2mb', extended: true },
          rawBody: true,
        },
      }),
    }),
  ],
})
export class AuthModule {}
