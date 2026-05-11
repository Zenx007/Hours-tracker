import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import { join } from 'path';

function buildSwaggerHtml(title: string, jsonUrl: string) {
  return `
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
    <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css" />
  </head>
  <body>
    <div id="swagger-ui"></div>
    <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
    <script>
      window.onload = () => {
        window.ui = SwaggerUIBundle({
          url: '${jsonUrl}',
          dom_id: '#swagger-ui',
          persistAuthorization: true,
          tagsSorter: 'alpha'
        });
      };
    </script>
  </body>
</html>`;
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 10000;

  app.enableCors({
    origin: [
      "http://localhost:5173",
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

  app.use(bodyParser.json({ limit: '2gb' })); 
  app.use(bodyParser.urlencoded({ limit: '2gb', extended: true })); 

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

  const server = app.getHttpAdapter().getInstance();

  server.get(['/swagger-json', '/docs-json'], (_req: express.Request, res: express.Response) => {
    res.type('application/json').send(document);
  });

  server.get(['/swagger', '/swagger/'], (_req: express.Request, res: express.Response) => {
    res.type('text/html').send(buildSwaggerHtml('Hours Tracker API', '/swagger-json'));
  });

  server.get(['/docs', '/docs/'], (_req: express.Request, res: express.Response) => {
    res.type('text/html').send(buildSwaggerHtml('Hours Tracker API', '/docs-json'));
  });

  server.get('/health', (_req: express.Request, res: express.Response) => {
    res.status(200).json({
      success: true,
      message: 'API Hours Tracker rodando corretamente.',
    });
  });

  await app.listen(port, '0.0.0.0');

  console.log(`Seja Bem Vindo: Acesse http://localhost:${port}/swagger ou /docs`)

  }

bootstrap();
