import { Injectable } from '@nestjs/common';
import { TwilioService } from 'nestjs-twilio';
import { OtpDto } from './dto/sms/otp.dto';

@Injectable()
export class SmsService {
  constructor(private readonly twilioService: TwilioService) {}
  async sendSMS(phoneNumber: string, message: string): Promise<void> {
    await this.twilioService.client.messages.create({
      body: message,
      from: process.env['TWILIO_PHONE_NUMBER'],
      to: phoneNumber,
    });
  }

  async sendOTP({ phoneNumber, code }: OtpDto) {
    const message = `Your OTP code is: ${code}`;
    await this.sendSMS(phoneNumber, message);
  }
}
