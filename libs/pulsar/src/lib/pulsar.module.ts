import { Global, Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config'
import { PulsarClient } from './pulsar.client';

@Global()
@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [PulsarClient],
  exports: [PulsarClient],
})
export class PulsarModule {}
