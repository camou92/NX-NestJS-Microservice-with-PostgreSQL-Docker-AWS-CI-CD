import { Module } from '@nestjs/common'
import { FibonacciConsumer } from './fibonacci/fibonacci.consumer';

@Module({
    imports: [],
    providers: [FibonacciConsumer],
})
export class JobModule {}