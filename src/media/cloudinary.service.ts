import { Injectable } from '@nestjs/common';
import { CloudinaryService as MediaService } from 'nestjs-cloudinary';
import { CreateSignedUploadDto } from './dto/createSignedUpload.dto';

@Injectable()
export class CloudinaryService {
  constructor(private readonly cloudinaryService: MediaService) {}

  async signedUpload(dto: CreateSignedUploadDto) {
    return this.cloudinaryService.createSignedUploadUrl(
      dto.publicId,
      dto.resourceType,
    );
  }
}
