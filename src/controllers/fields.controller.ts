import { indexFieldsService } from '@/services';
import { logger } from '@/utils';
import { Request, Response } from 'express';

export const indexFields = async (request: Request, response: Response) => {
  try {
    const data = await indexFieldsService();
    response.send({ data });
  } catch (error) {
    logger.error('Error in index fields controller', (error as Error).message);
    response.status(400).send({
      message: (error as Error).message,
      stack: (error as Error).stack,
    });
  }
};
