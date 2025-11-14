import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors()

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Brain-Book')
    .setDescription('API documentation for the AI-powered notebook system')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
  console.log(`🚀 Application is running on: http://localhost:3000`);
  console.log(`📘 Swagger Docs: http://localhost:3000/api/docs`);
}
bootstrap();
