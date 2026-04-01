import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyRechargeDto {
  @ApiProperty({
    description: 'order id from the payment provider',
    example: '5f8d0d55-9c9b-4c9e-8b1a-2f8d0d55e9c9',
  })
  @IsString()
  orderId: string;

  @ApiProperty({
    description: 'payment id from the payment provider',
    example: 'pay_29QQoUBi66xm2f',
  })
  @IsString()
  paymentId: string;

  @ApiProperty({
    description: 'signature from the payment provider',
    example: '5f8d0d55-9c9b-4c9e-8b1a-2f8d0d55e9c9',
  })
  @IsString()
  signature: string;
}
