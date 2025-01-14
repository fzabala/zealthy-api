import { API_CONSTANT } from '@/constants';
import { createUsers, indexUsers, updateUsers } from '@/controllers';
import { RouteConfig } from '@/setup';
import {
  createUserValidator,
  uniqueEmailValidator,
  updateUserValidator,
} from '@/validators/users';

export const usersRouteConfig: RouteConfig[] = [
  {
    method: 'get',
    name: API_CONSTANT.USERS,
    handlers: [indexUsers],
  },
  {
    method: 'post',
    name: API_CONSTANT.USERS,
    handlers: [uniqueEmailValidator, createUserValidator, createUsers],
  },
  {
    method: 'put',
    name: `${API_CONSTANT.USERS}/:id`,
    handlers: [uniqueEmailValidator, updateUserValidator, updateUsers],
  },
];
