import { API_CONSTANT } from '@/constants';
import { indexFields } from '@/controllers';
import { RouteConfig } from '@/setup';

export const fieldsRouteConfig: RouteConfig[] = [
  {
    method: 'get',
    name: API_CONSTANT.FIELDS,
    handlers: [indexFields],
  },
];
