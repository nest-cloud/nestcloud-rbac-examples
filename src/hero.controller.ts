import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AccountGuard } from './account.guard';
import { RbacGuard, Resource, Verb, Verbs } from '@nestcloud/rbac';

@Controller('/heros')
@Resource('hero')
@UseGuards(AccountGuard, RbacGuard)
export class HeroController {
    @Get('/:heroId')
    @Verb(Verbs.GET)
    async get(@Param('heroId') heroId: number): Promise<any> {
        return { hero: 'Shadow hunter' };
    }

    @Get('/')
    @Verb(Verbs.LIST)
    async list(): Promise<any> {
        return { heros: ['Shadow hunter', 'BladeMaster'] };
    }
}
