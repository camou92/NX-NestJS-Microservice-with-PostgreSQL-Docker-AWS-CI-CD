import { Module } from "@nestjs/common";
import { DiscoveryModule } from "@golevelup/nestjs-discovery";
import {ClientsModule, Transport} from '@nestjs/microservices'
import { join } from "path";
import { FibonacciJob } from "./jobs/fibonacci/fibonacci.job";
import { JobsService } from "./jobs.service";
import { JobsResolver } from "./jobs.resolver";
import { AUTH_PACKAGE_NAME } from '@jobber/proto';

@Module({
    imports: [
        DiscoveryModule,
        ClientsModule.register([
            {
                name: AUTH_PACKAGE_NAME,
                transport: Transport.GRPC,
                options: {
                    package: AUTH_PACKAGE_NAME,
                    url: '0.0.0.0:5001',
                    protoPath: join(__dirname, 'proto/auth.proto')
                }
            }
        ])
    ],
    providers: [FibonacciJob, JobsService, JobsResolver],
})
export class JobsModule {}