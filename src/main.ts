import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder } from '@nestjs/swagger/dist/document-builder';
import { SwaggerModule } from '@nestjs/swagger/dist/swagger-module';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 10000;

  app.enableCors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3000/",
    ],
    methods: "*",
    credentials: false, 
  });

 app.use((req: any, res: any, next: () => void) => {
    next();
  });

  const staticPath = join(__dirname, "API", "Directory");
  app.use("/static", express.static(staticPath));

  app.use(bodyParser.json({ limit: '2gb' })); // JSON
  app.use(bodyParser.urlencoded({ limit: '2gb', extended: true })); // URL encoded

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

    const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('swagger', app, documentFactory, {
    swaggerOptions: {
      tagsSorter: "alpha"
    }
  });

  await app.listen(port);

  console.log(`Seja Bem Vindo: Acesse http://localhost:${port}/swagger`)

  }

bootstrap();
