import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';

export class AadhaarNumberDto {
  @ApiProperty({
    description: 'Aadhaar number of the user',
    example: '123456789012',
  })
  @IsString()
  @Matches(/^\d{12}$/, {
    message: 'Aadhaar number must be a 12-digit number',
  })
  aadhaarNumber: string;
}
