import { ComponentConfigModel } from '@/models';
import { validateRequest } from '@/utils';
import joiDate from '@joi/date';
import { NextFunction, Request, Response } from 'express';
import coreJoi from 'joi';
const Joi = coreJoi.extend(joiDate) as typeof coreJoi;

export const saveComponentConfigsValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    configs: Joi.array()
      .items(
        Joi.object({
          component: Joi.string().required(),
          step: Joi.string().valid('2', '3').required(),
        })
      )
      .required()
      .custom((value, helpers) => {
        const hasStep2 = value.some(
          (config: ComponentConfigModel) => config.step === '2'
        );
        const hasStep3 = value.some(
          (config: ComponentConfigModel) => config.step === '3'
        );

        if (!hasStep2 || !hasStep3) {
          return helpers.error('array.min', {
            label: 'aaaa',
            value: !hasStep2 ? '2' : '3',
          });
        }

        const components = value.map(
          (config: ComponentConfigModel) => config.component
        );
        const uniqueComponents = new Set(components);
        if (components.length !== uniqueComponents.size) {
          return helpers.error('array.unique', { field: 'component' });
        }

        return value;
      }, 'Steps validation'),
  });
  validateRequest(req, res, next, schema);
};
