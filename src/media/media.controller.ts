import { Controller, Post, Body } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { CreateSignedUploadDto } from './dto/createSignedUpload.dto';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';

@Controller('media')
export class MediaController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @AllowAnonymous()
  @Post('signed-upload')
  async signedUpload(@Body() dto: CreateSignedUploadDto) {
    return this.cloudinaryService.signedUpload(dto);
  }
}
