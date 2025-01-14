import { API_VERSION } from '@/constants';
import * as routes from '@/routes';
import { Express, RequestHandler, Router } from 'express';

export type RouteConfigMethod =
  | 'all'
  | 'get'
  | 'post'
  | 'put'
  | 'delete'
  | 'patch'
  | 'options'
  | 'head';

export interface RouteConfig {
  method: RouteConfigMethod;
  name: string;
  handlers: RequestHandler[];
}

export const addRoutes = (app: Express) => {
  const router = Router();

  const importedRoutes: Record<string, RouteConfig[]> = routes;

  for (const index in importedRoutes) {
    const routeConfigs = importedRoutes[index];
    for (const routeConfigIndex in routeConfigs) {
      const routeConfig = routeConfigs[routeConfigIndex];
      router[routeConfig.method.toLowerCase() as RouteConfigMethod](
        `${API_VERSION}${routeConfig.name}`,
        routeConfig.handlers
      );
    }
  }

  app.use(router);
};
