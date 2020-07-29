import { Injectable } from '@nestjs/common';
import { EtcdValidator, UseValidators } from '@nestcloud/rbac';

@Injectable()
@UseValidators(EtcdValidator)
export class RbacValidatorRegister {
}
