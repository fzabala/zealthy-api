import { validateRequest } from '@/utils';
import joiDate from '@joi/date';
import { NextFunction, Request, Response } from 'express';
import coreJoi from 'joi';
const Joi = coreJoi.extend(joiDate) as typeof coreJoi;

export const createUserValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
  });
  validateRequest(req, res, next, schema);
};
