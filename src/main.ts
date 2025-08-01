import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder } from '@nestjs/swagger/dist/document-builder';
import { SwaggerModule } from '@nestjs/swagger/dist/swagger-module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);

  const config = new DocumentBuilder()
    .setTitle('Hours Tracker')
    .setDescription('Monitoramento de horas trabalhadas')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer', 
      bearerFormat: 'JWT', 
      description: 'Insira o token JWT aqui (formato: Bearer <token>)',
      in:"header"
    },"authorization") 
    .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api', app, document);

  }

bootstrap();
