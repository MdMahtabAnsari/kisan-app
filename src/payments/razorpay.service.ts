import { Injectable } from '@nestjs/common';
import Razorpay from 'razorpay';
import { IMap } from 'razorpay/dist/types/api';
import { createHmac } from 'crypto';

@Injectable()
export class RazorpayService {
  private readonly razorpay: Razorpay;

  constructor() {
    const keyId = process.env['RAZORPAY_KEY_ID'];
    const keySecret = process.env['RAZORPAY_KEY_SECRET'];
    if (!keyId || !keySecret) {
      throw new Error(
        'Razorpay key ID and secret must be set in environment variables',
      );
    }
    this.razorpay = new Razorpay({
      key_id: process.env['RAZORPAY_KEY_ID'],
      key_secret: process.env['RAZORPAY_KEY_SECRET'],
    });
  }

  async createOrder(
    amount: number,
    currency: string,
    receipt: string,
    notes?: IMap<string | number>,
  ) {
    return this.razorpay.orders.create({
      amount: amount * 100, // Amount in paise
      currency,
      receipt,
      notes,
    });
  }

  verifyPayment(orderId: string, paymentId: string, signature: string) {
    const secret = process.env['RAZORPAY_KEY_SECRET'];
    if (!secret) {
      throw new Error(
        'Razorpay key secret must be set in environment variables',
      );
    }
    const generatedSignature = createHmac('sha256', secret)
      .update(`${orderId}|${paymentId}`)
      .digest('hex');

    return generatedSignature === signature;
  }
}
