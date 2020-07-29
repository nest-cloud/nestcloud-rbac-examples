import { Module } from '@nestjs/common';
import { BOOT, CONSUL, ETCD } from '@nestcloud/common';
import { BootModule } from '@nestcloud/boot';
import { ConsulModule } from '@nestcloud/consul';
import { ServiceModule } from '@nestcloud/service';
import { LoadbalanceModule } from '@nestcloud/loadbalance';
import { RbacModule } from '@nestcloud/rbac';
import { TerminusModule } from '@nestjs/terminus';
import { HeroController } from './hero.controller';
import { resolve } from 'path';
import { RbacValidatorRegister } from './rbac-validator.register';
import { EtcdModule } from '@nestcloud/etcd';

@Module({
    imports: [
        BootModule.forRoot({ filePath: resolve(__dirname, 'config.yaml') }),
        EtcdModule.forRootAsync({ inject: [BOOT] }),
        ServiceModule.forRootAsync({ inject: [BOOT, ETCD] }),
        LoadbalanceModule.forRootAsync({ inject: [BOOT] }),
        RbacModule.forRootAsync({ inject: [ETCD, BOOT] }),
        TerminusModule.forRootAsync({
            useFactory: () => ({ endpoints: [{ url: '/health', healthIndicators: [] }] }),
        }),
    ],
    controllers: [HeroController],
    providers: [RbacValidatorRegister],
})
export class AppModule {
}
