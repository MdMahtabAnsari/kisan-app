import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { OtpDto } from './dto/sms/otp.dto';

@Injectable()
export class SmsQueueService {
  constructor(@InjectQueue('sms') private readonly smsQueue: Queue) {}

  async sendOTP(otpDto: OtpDto) {
    await this.smsQueue.add('otp', otpDto, {
      attempts: 3,
      backoff: { type: 'exponential', delay: 5000 },
      removeOnComplete: true,
      removeOnFail: true,
    });
  }
}
