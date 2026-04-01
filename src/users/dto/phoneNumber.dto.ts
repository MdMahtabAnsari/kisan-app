import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';

export class PhoneNumberDto {
  @ApiProperty({
    description: 'Phone number of the user',
    example: '9876543210',
  })
  @IsString()
  @Matches(/^\d{10}$/, {
    message: 'Phone number must be a 10-digit number',
  })
  phoneNumber: string;
}
