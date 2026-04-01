import { Controller, Get, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { IdentifierDto } from './dto/identifier.dto';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @AllowAnonymous()
  @Get('isAvailable/:identifier')
  async isUserExists(@Body() identifierDto: IdentifierDto) {
    return this.usersService.isUserExists(identifierDto.identifier);
  }
}
