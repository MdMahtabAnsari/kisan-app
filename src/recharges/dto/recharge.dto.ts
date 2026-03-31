import { IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class RechargeDto {
  @ApiProperty({
    description: 'amount to be recharged',
    example: '100',
  })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  amount: number;
}
