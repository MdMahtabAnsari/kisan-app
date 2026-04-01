import { Controller, Get, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { IdentifierDto } from './dto/identifier.dto';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';
import { EmailDto } from './dto/email.dto';
import { UsernameDto } from './dto/username.dto';
import { PhoneNumberDto } from './dto/phoneNumber.dto';
import { AadhaarNumberDto } from './dto/aadhaarNumber.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @AllowAnonymous()
  @Get('isAvailable/:identifier')
  async isUserExists(@Param() identifierDto: IdentifierDto) {
    return this.usersService.isUserExists(identifierDto.identifier);
  }

  @AllowAnonymous()
  @Get('isEmailAvailable/:email')
  async isEmailExists(@Param() emailDto: EmailDto) {
    return this.usersService.isEmailExists(emailDto.email);
  }

  @AllowAnonymous()
  @Get('isUsernameAvailable/:username')
  async isUsernameExists(@Param() usernameDto: UsernameDto) {
    return this.usersService.isUsernameExists(usernameDto.username);
  }

  @AllowAnonymous()
  @Get('isPhoneNumberAvailable/:phoneNumber')
  async isPhoneNumberExists(@Param() phoneNumberDto: PhoneNumberDto) {
    return this.usersService.isPhoneNumberExists(phoneNumberDto.phoneNumber);
  }

  @AllowAnonymous()
  @Get('isAadhaarNumberAvailable/:aadhaarNumber')
  async isAadhaarNumberExists(@Param() aadhaarNumberDto: AadhaarNumberDto) {
    return this.usersService.isAadhaarNumberExists(
      aadhaarNumberDto.aadhaarNumber,
    );
  }
}
