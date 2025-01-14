import { STEPS } from '@/constants/steps.constant';
import { validateRequest } from '@/utils';
import joiDate from '@joi/date';
import { NextFunction, Request, Response } from 'express';
import coreJoi from 'joi';
const Joi = coreJoi.extend(joiDate) as typeof coreJoi;

export const updateUserValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    about: Joi.string().optional().allow(null),
    address: Joi.object({
      street: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      zip: Joi.string().required(),
    })
      .optional()
      .allow(null),
    birthDate: Joi.date().format('YYYY-MM-DD').allow(null),
    progress: Joi.string()
      .valid(...Object.values(STEPS))
      .required(),
  });
  validateRequest(req, res, next, schema);
};
