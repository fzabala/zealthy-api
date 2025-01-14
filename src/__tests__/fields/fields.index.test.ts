import { API_CONSTANT, API_VERSION } from '@/constants';
import { close, connect } from '@/database';
import { app } from '@/index';
import { FieldModel } from '@/models';
import request from 'supertest';

describe('Fields index', () => {
  beforeAll(async () => {
    await connect();
  });

  afterAll(() => close());

  it('Indexes the fields and fetches them successfully', async () => {
    const res = await request(app).get(`${API_VERSION}${API_CONSTANT.FIELDS}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveLength(2);

    const defaultForStep2 = res.body.data.filter(
      (field: FieldModel) => field.defaultForStep === '2'
    );
    expect(defaultForStep2).toHaveLength(1);
    const defaultForStep3 = res.body.data.filter(
      (field: FieldModel) => field.defaultForStep === '3'
    );
    expect(defaultForStep3).toHaveLength(1);
  });
});
