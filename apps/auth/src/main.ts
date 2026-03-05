/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { AUTH_PACKAGE_NAME } from '@jobber/proto';
import { join } from 'path';
import { init } from '@jobber/nestjs';

async function bootstrap() {
 const app = await NestFactory.create(AppModule, { bufferLogs: true });
  await init(app)
  app.connectMicroservice<GrpcOptions>({
    transport: Transport.GRPC,
    options: {
      package: AUTH_PACKAGE_NAME,
      url: '0.0.0.0:5001',
      protoPath: join(__dirname, 'proto/auth.proto')
    }
  })
  app.startAllMicroservices()
}

bootstrap();
