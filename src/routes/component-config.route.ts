import { API_CONSTANT } from '@/constants';
import { indexComponentConfigs, saveComponentConfigs } from '@/controllers';
import { RouteConfig } from '@/setup';
import { saveComponentConfigsValidator } from '@/validators/component-config';

export const componentConfigRouteConfig: RouteConfig[] = [
  {
    method: 'get',
    name: API_CONSTANT.COMPONENT_CONFIGS,
    handlers: [indexComponentConfigs],
  },
  {
    method: 'post',
    name: API_CONSTANT.COMPONENT_CONFIGS,
    handlers: [saveComponentConfigsValidator, saveComponentConfigs],
  },
];
