import {
  createUsersService,
  indexUsersService,
  updateUsersService,
} from '@/services';
import { logger } from '@/utils';
import { Request, Response } from 'express';

export const indexUsers = async (request: Request, response: Response) => {
  try {
    const data = await indexUsersService();
    response.send({ data });
  } catch (error) {
    logger.error('Error in index users controller', (error as Error).message);
    response.status(400).send({
      message: (error as Error).message,
      stack: (error as Error).stack,
    });
  }
};

export const createUsers = async (request: Request, response: Response) => {
  try {
    const { email, password } = request.body;
    const data = await createUsersService(email, password);
    response.send({ data });
  } catch (error) {
    logger.error('Error in index users controller', (error as Error).message);
    response.status(400).send({
      message: (error as Error).message,
      stack: (error as Error).stack,
    });
  }
};

export const updateUsers = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const { about, address, birthDate, progress } = request.body;

    const street = address?.street;
    const city = address?.city;
    const state = address?.state;
    const zip = address?.zip;

    const data = await updateUsersService(
      id as string,
      progress,
      about,
      street,
      city,
      state,
      zip,
      birthDate
    );
    response.send({ data });
  } catch (error) {
    logger.error('Error in update users controller', (error as Error).message);
    response.status(400).send({
      message: (error as Error).message,
      stack: (error as Error).stack,
    });
  }
};
