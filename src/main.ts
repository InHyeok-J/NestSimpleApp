import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('Nest Simple APp')
    .setDescription('cat crud and auth')
    .setVersion('1.0,0')
    .build();
  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.enableCors({
    origin: true, //개발끝나고 특정 url을 적어줘야 함.
    credentials: true,
  });
  await app.listen(3000);
}

bootstrap();
