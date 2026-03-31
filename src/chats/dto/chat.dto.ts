import { IsArray, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UIMessage } from 'ai';

export class ChatDto {
  @ApiProperty({
    description: 'Chat messages',
    example: [
      {
        role: 'user',
        content: 'मेरे गेहूं की पत्तियां पीली हो रही हैं',
      },
    ],
  })
  @IsArray()
  messages: UIMessage[];

  @ApiProperty({
    example: 'gemini-1.5-flash',
  })
  @IsString()
  model: string;
}
