import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');

  const isProd = process.env.NODE_ENV === 'production';
  if (isProd) {
    const raw = process.env.FRONTEND_URLS || process.env.FRONTEND_URL || '';
    const allowedOrigins = raw
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    app.enableCors({ origin: allowedOrigins.length ? allowedOrigins : false, credentials: true });
  } else {
    // Dev-friendly: reflect request origin (works for 5173/4173/etc.)
    app.enableCors({ origin: true, credentials: true });
  }

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const uploadsRoot = join(process.cwd(), 'uploads');
  if (!existsSync(uploadsRoot)) {
    mkdirSync(uploadsRoot, { recursive: true });
  }
  app.useStaticAssets(uploadsRoot, { prefix: '/uploads' });

  const port = Number(process.env.PORT) || 3000;
  await app.listen(port, '0.0.0.0');
  console.log('Nest app listening on', port);
}
bootstrap();
