import { Body, Controller, Post, Res } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatDto } from './dto/chat.dto';
import type { Response } from 'express';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Post()
  async chat(@Body() chatDto: ChatDto, @Res() response: Response) {
    return this.chatsService.chat(chatDto.messages, chatDto.model, response);
  }
}
