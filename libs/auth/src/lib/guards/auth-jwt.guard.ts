import {
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

import {
  hasPermission,
  isPublicResource,
} from '../decorators';

@Injectable()
export class AuthJwtGuard extends AuthGuard('jwt') {
  private logger = new Logger(AuthJwtGuard.name);
  constructor(private readonly reflector: Reflector) {
    super();
  }

  /**
   * 1 - check is public resource
   * 2 - check the user has permission.
   * @param context
   * @returns
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (isPublicResource(context, this.reflector)) {
      return true;
    }

    const result = await super.canActivate(context);

    if (hasPermission(context, this.reflector)) {
      return result as any;
    } else {
      return false;
    }
  }
}
