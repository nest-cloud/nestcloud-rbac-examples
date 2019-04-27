import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { IRbacAccount } from '@nestcloud/rbac';

@Injectable()
export class AccountGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        request.user = { name: request.query.user } as IRbacAccount;
        return true;
    }
}
