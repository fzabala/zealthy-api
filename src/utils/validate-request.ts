import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { VALIDATION_ERRORS } from '../constants';

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction,
  schema: Joi.ObjectSchema
) => {
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };
  const { error, value } = schema.validate(req.body, options);
  if (error) {
    res.status(412).send({
      message: VALIDATION_ERRORS,
      errors: error.details.map((detail) => ({
        message: detail.message,
        field: detail.path[0],
        type: detail.type,
      })),
    });
  } else {
    req.body = value;
    next();
  }
};
