import { v4 } from 'uuid';

import {
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { getUserObject } from './user.decorator';

const REQUIRED_PERMISSION_TOKEN = `REQUIRED_PERMISSION_TOKEN_${v4()}`;

/**
 * Set permission for resouces
 * @param permission
 * @returns
 */
export function SetPermission<P = string>(permission: P) {
  return SetMetadata(REQUIRED_PERMISSION_TOKEN, permission);
}

/**
 * Check the resource is secured by permission
 * @param context
 * @param reflector
 * @returns
 */
export function getRequiredPermission<P = string>(
  context: ExecutionContext,
  reflector: Reflector
): P {
  return reflector.getAllAndOverride(REQUIRED_PERMISSION_TOKEN, [
    context.getClass(),
    context.getHandler(),
  ]);
}

export function hasPermission(context: ExecutionContext, reflector: Reflector) {
  const requieredPermission = getRequiredPermission(context, reflector);
  const user = getUserObject(context);

  if (requieredPermission) {
    return user.permissions.includes(requieredPermission);
  } else {
    return true;
  }
}