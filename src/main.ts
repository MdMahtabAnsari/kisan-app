import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // Don't worry, the library will automatically re-add the default body parsers.
    bodyParser: false,
  });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Kisan Registration API')
    .setDescription('The Kisan Registration API description')
    .setVersion('1.0')
    .addTag('kisan-registration')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/openapi', app, documentFactory);
  // await app.listen(process.env.PORT || 3000, '0.0.0.0');
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
