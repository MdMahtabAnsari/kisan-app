import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { WalletType } from 'generated/prisma/enums';

export class CreateWalletDto {
  @ApiProperty({
    description: 'Type of the wallet',
    enum: WalletType,
    example: WalletType.STANDARD,
  })
  @IsEnum(WalletType)
  type: WalletType;
}
