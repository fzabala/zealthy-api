import { EMAIL_ALREADY_REGISTERED } from '@/constants';
import { UserModel } from '@/models';
import { NextFunction, Request, Response } from 'express';

export const uniqueEmailValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  if (email) {
    const user = await UserModel.findOne({ where: { email } });
    if (user) {
      return res.status(403).send({ message: EMAIL_ALREADY_REGISTERED });
    }
  }
  next();
};
