import { Module } from '@nestjs/common';
import { JobModule } from './jobs/jobs.module';
import { PulsarModule } from '@jobber/pulsar';
import { LoggerModule } from '@jobber/nestjs';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    LoggerModule,
    PulsarModule,
    JobModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
})
export class AppModule {}
