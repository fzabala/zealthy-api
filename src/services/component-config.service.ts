import { ComponentConfigModel, FieldModel } from '@/models';
import { logger } from '@/utils';

export const indexComponentConfigsService = async () => {
  try {
    const componentConfigs: Partial<ComponentConfigModel>[] =
      await ComponentConfigModel.findAll();
    const fields = await FieldModel.findAll();

    //default component config for step 2
    const configForField2 = componentConfigs.find(
      (componentConfigs) => componentConfigs?.step === '2'
    );

    if (!configForField2) {
      const defaultFieldForStep2 = fields.find(
        (field) => field.defaultForStep === '2'
      );
      if (!defaultFieldForStep2) {
        throw new Error('No default field for step 2');
      }

      const defaultConfigStep2 = {
        step: '2',
        component: defaultFieldForStep2!.component,
      };

      componentConfigs.push(defaultConfigStep2);
    }

    //default component config for step 3
    const configForField3 = componentConfigs.find(
      (componentConfigs) => componentConfigs?.step === '3'
    );

    if (!configForField3) {
      const defaultFieldForStep3 = fields.find(
        (field) => field.defaultForStep === '3'
      );
      if (!defaultFieldForStep3) {
        throw new Error('No default field for step 3');
      }

      const defaultConfigStep3 = {
        step: '3',
        component: defaultFieldForStep3!.component,
      };

      componentConfigs.push(defaultConfigStep3);
    }

    return componentConfigs;
  } catch (error) {
    logger.error(
      'Error in index component config service',
      (error as Error).message
    );
    throw error;
  }
};

export const saveComponentConfigsService = async (
  configs: Pick<ComponentConfigModel, 'step' | 'component'>[]
) => {
  try {
    await ComponentConfigModel.truncate();
    return await ComponentConfigModel.bulkCreate(configs);
  } catch (error) {
    logger.error(
      'Error in index component config service',
      (error as Error).message
    );
    throw error;
  }
};
