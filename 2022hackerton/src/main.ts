import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './global/interceptor/logging';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
    cors: true,
  });
  const port: number = app.get(ConfigService).get('PORT');
  app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen(port);
}
bootstrap();
