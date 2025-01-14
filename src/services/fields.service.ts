import { FieldModel } from '@/models';
import { logger } from '@/utils';

export const indexFieldsService = async () => {
  try {
    const fields = await FieldModel.findAll();

    return fields;
  } catch (error) {
    logger.error('Error in index fields service', (error as Error).message);
    throw error;
  }
};
