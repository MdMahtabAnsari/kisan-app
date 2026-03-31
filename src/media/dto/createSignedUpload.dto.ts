import { IsString, IsNotEmpty, Matches, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum CloudinaryResourceType {
  IMAGE = 'image',
  VIDEO = 'video',
}

export class CreateSignedUploadDto {
  @ApiProperty({
    description: 'The folder where the file will be uploaded',
    example: 'user_uploads',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*$/, {
    message: 'publicId must be a valid folder path (e.g., "folder/subfolder")',
  })
  publicId: string;

  @ApiProperty({
    description: 'Resource type of the file',
    enum: CloudinaryResourceType,
    example: CloudinaryResourceType.IMAGE,
  })
  @IsEnum(CloudinaryResourceType, {
    message: 'resourceType must be either image or video',
  })
  resourceType: CloudinaryResourceType;
}
