import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ResendModule } from 'nestjs-resend';
import { TwilioModule } from 'nestjs-twilio';
import { EmailService } from './email.service';
import { SmsService } from './sms.service';
import { EmailProcessingService } from './emailProcessing.service';
import { SmsProcessingService } from './smsProcessing.service';
import { EmailQueueService } from './emailQueue.service';
import { SmsQueueService } from './smsQueue.service';

@Module({
  imports: [
    BullModule.registerQueue(
      {
        name: 'email',
      },
      {
        name: 'sms',
      },
    ),
    ResendModule.forRootAsync({
      useFactory: () => ({
        apiKey: process.env['RESEND_API_KEY'],
      }),
    }),
    TwilioModule.forRoot({
      accountSid: process.env['TWILIO_ACCOUNT_SID'],
      authToken: process.env['TWILIO_AUTH_TOKEN'],
    }),
  ],
  providers: [
    EmailService,
    SmsService,
    EmailProcessingService,
    SmsProcessingService,
    EmailQueueService,
    SmsQueueService,
  ],
  exports: [SmsQueueService, EmailQueueService],
})
export class NotificationsModule {}
