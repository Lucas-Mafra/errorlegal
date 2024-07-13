import { env } from '@infra/env';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const origin = env.NODE_ENV === 'production' ? env.PROD_URL : env.DEV_URL;

  app.use(helmet());

  app.enableCors({
    origin,
    credentials: true,
    methods: 'GET,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization', 'refresh_token'],
  });

  const config = new DocumentBuilder()
    .setTitle('Fable to Table')
    .setDescription('The Fable to Table API description')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(env.PORT);
}
bootstrap();
