import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { WalletType } from 'generated/prisma/enums';

export class WalletTypeDto {
  @ApiProperty({
    title: 'Wallet Type',
    enum: WalletType,
    example: WalletType.STANDARD,
  })
  @IsEnum(WalletType)
  type: WalletType;
}
