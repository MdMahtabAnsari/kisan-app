import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { CloudinaryModule } from 'nestjs-cloudinary';
import { CloudinaryService } from './cloudinary.service';

@Module({
  imports: [
    CloudinaryModule.forRootAsync({
      useFactory: () => ({
        cloud_name: process.env['CLOUDINARY_CLOUD_NAME'],
        api_key: process.env['CLOUDINARY_API_KEY'],
        api_secret: process.env['CLOUDINARY_API_SECRET'],
      }),
    }),
  ],
  controllers: [MediaController],
  providers: [CloudinaryService],
})
export class MediaModule {}
