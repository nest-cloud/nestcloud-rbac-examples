import { Injectable } from '@nestjs/common';
import { ConsulValidator, UseValidators } from '@nestcloud/rbac';

@Injectable()
@UseValidators(ConsulValidator)
export class RbacValidatorRegister {
}
