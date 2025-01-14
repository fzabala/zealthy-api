import {
  indexComponentConfigsService,
  saveComponentConfigsService,
} from '@/services';
import { logger } from '@/utils';
import { Request, Response } from 'express';

export const indexComponentConfigs = async (
  request: Request,
  response: Response
) => {
  try {
    const data = await indexComponentConfigsService();
    response.send({ data });
  } catch (error) {
    logger.error(
      'Error in index component-configs controller',
      (error as Error).message
    );
    response.status(400).send({
      message: (error as Error).message,
      stack: (error as Error).stack,
    });
  }
};

export const saveComponentConfigs = async (
  request: Request,
  response: Response
) => {
  try {
    const { configs } = request.body;

    const data = await saveComponentConfigsService(configs);
    response.send({ data });
  } catch (error) {
    logger.error(
      'Error in save component-configs controller',
      (error as Error).message
    );
    response.status(400).send({
      message: (error as Error).message,
      stack: (error as Error).stack,
    });
  }
};
