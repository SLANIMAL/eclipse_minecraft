import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { setupSwagger } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const configService = app.get(ConfigService);
  const port = configService.get<number>('app.port', 4000);
  const globalPrefix = configService.get<string>('app.globalPrefix', 'api');

  app.setGlobalPrefix(globalPrefix);
  app.useLogger(new Logger());

  app.use(
    helmet({
      crossOriginResourcePolicy: false,
    }),
  );

  app.enableCors({
    origin: configService.get<string>('app.corsOrigin', '*').split(','),
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  setupSwagger(app);

  await app.listen(port);
  Logger.log(`🚀 Eclipse backend running at http://localhost:${port}/${globalPrefix}`);
  Logger.log(`📄 Swagger at http://localhost:${port}/${globalPrefix}/docs`);
}

bootstrap();
