import { Module } from '@nestjs/common';
import { NEST_BOOT, NEST_CONSUL } from '@nestcloud/common';
import { BootModule } from '@nestcloud/boot';
import { ConsulModule } from '@nestcloud/consul';
import { ConsulServiceModule } from '@nestcloud/consul-service';
import { LoadbalanceModule } from '@nestcloud/consul-loadbalance';
import { Backend, ConsulValidator, RbacModule } from '@nestcloud/rbac';
import { TerminusModule } from '@nestjs/terminus';
import { HeroController } from './hero.controller';

@Module({
    imports: [
        BootModule.register(__dirname, `config.yaml`),
        ConsulModule.register({ dependencies: [NEST_BOOT] }),
        ConsulServiceModule.register({ dependencies: [NEST_BOOT] }),
        LoadbalanceModule.register({ dependencies: [NEST_BOOT] }),
        RbacModule.register({
            dependencies: [NEST_CONSUL, NEST_BOOT],
            backend: Backend.CONSUL,
            validator: ConsulValidator,
        }),
        TerminusModule.forRootAsync({
            useFactory: () => ({ endpoints: [{ url: '/health', healthIndicators: [] }] }),
        }),
    ],
    controllers: [HeroController],
})
export class AppModule {
}
