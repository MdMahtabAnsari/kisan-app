import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';

export class IdentifierDto {
  @ApiProperty({
    title: 'Enter the identifier of the user',
    description:
      'The identifier can be either email, phone number, username or aadhaar number',
    example: 'john.doe@example.com',
  })
  @IsString()
  @Matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$|^\d{10}$|^[a-zA-Z0-9_]+$|^\d{12}$/, {
    message:
      'Identifier must be either a valid email, phone number, username or aadhaar number',
  })
  identifier: string;
}
