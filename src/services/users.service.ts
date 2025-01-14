import { USER_NOT_FOUND } from '@/constants';
import { STEPS } from '@/constants/steps.constant';
import { UserModel } from '@/models';
import { hashPassword, logger } from '@/utils';

export const indexUsersService = async () => {
  try {
    const users = await UserModel.findAll();

    return users;
  } catch (error) {
    logger.error('Error in index users service', (error as Error).message);
    throw error;
  }
};

export const createUsersService = async (email: string, password: string) => {
  try {
    const user = await UserModel.create({
      email,
      password: await hashPassword(password),
      progress: STEPS['STEP-2'],
    });

    return await user.reload();
  } catch (error) {
    logger.error('Error in create users service', (error as Error).message);
    throw error;
  }
};

export const updateUsersService = async (
  id: string,
  progress: STEPS,
  about?: string,
  street?: string,
  city?: string,
  state?: string,
  zip?: string,
  birthDate?: string
) => {
  try {
    const user = await UserModel.findByPk(id);
    if (!user) {
      throw new Error(USER_NOT_FOUND);
    }

    const data: Partial<UserModel> = { progress };
    if (about) {
      data.about = about;
    }
    if (street) {
      data.street = street;
    }
    if (city) {
      data.city = city;
    }
    if (state) {
      data.state = state;
    }
    if (zip) {
      data.zip = zip;
    }
    if (birthDate) {
      data.birthDate = new Date(birthDate);
    }

    return await user.update(data);

    // return await user.reload();
  } catch (error) {
    logger.error('Error in update users service', (error as Error).message);
    throw error;
  }
};
