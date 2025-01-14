import { API_CONSTANT, API_VERSION } from '@/constants';
import { close, connect } from '@/database';
import { app } from '@/index';
import { UserModel } from '@/models';
import request from 'supertest';

describe('Component config create', () => {
  beforeAll(async () => {
    await connect();
  });

  afterAll(() => close());

  afterEach(async () => {
    await UserModel.truncate();
  });

  it('Create a basic component config', async () => {
    const configs = [
      { component: 'about', step: '2' },
      { component: 'birthDate', step: '3' },
    ];

    const res = await request(app)
      .post(`${API_VERSION}${API_CONSTANT.COMPONENT_CONFIGS}`)
      .send({ configs });
    expect(res.statusCode).toBe(200);

    const res2 = await request(app).get(
      `${API_VERSION}${API_CONSTANT.COMPONENT_CONFIGS}`
    );

    expect(res2.statusCode).toBe(200);
    expect(res2.body).toHaveProperty('data');
    expect(res2.body.data).toHaveLength(configs.length);
  });

  it('Create a full component config (2 for page 2, 1 for page 3)', async () => {
    const configs = [
      { component: 'about', step: '2' },
      { component: 'birthDate', step: '2' },
      { component: 'address', step: '3' },
    ];

    const res = await request(app)
      .post(`${API_VERSION}${API_CONSTANT.COMPONENT_CONFIGS}`)
      .send({ configs });
    expect(res.statusCode).toBe(200);

    const configs2 = [
      { component: 'about', step: '2' },
      { component: 'address', step: '3' },
    ];

    const res2 = await request(app)
      .post(`${API_VERSION}${API_CONSTANT.COMPONENT_CONFIGS}`)
      .send({ configs: configs2 });
    expect(res2.statusCode).toBe(200);

    const res3 = await request(app).get(
      `${API_VERSION}${API_CONSTANT.COMPONENT_CONFIGS}`
    );

    expect(res3.statusCode).toBe(200);
    expect(res3.body).toHaveProperty('data');
    expect(res3.body.data).toHaveLength(configs2.length);
  });
  it('Create a component config with a missing step 3 and fails', async () => {
    const configs = [{ component: 'address', step: '3' }];

    const res = await request(app)
      .post(`${API_VERSION}${API_CONSTANT.COMPONENT_CONFIGS}`)
      .send({ configs });

    expect(res.statusCode).toBe(412);
    expect(res.body).toHaveProperty('errors');
    const configErrors = res.body.errors.filter(
      (err: { field: string; type: string }) =>
        err.field === 'configs' && err.type === 'array.min'
    );
    expect(configErrors).toHaveLength(1);
  });
  it('Create a component config with a duplicated component and fails', async () => {
    const configs = [
      { component: 'about', step: '2' },
      { component: 'birthDate', step: '2' },
      { component: 'address', step: '3' },
      { component: 'address', step: '3' },
    ];

    const res = await request(app)
      .post(`${API_VERSION}${API_CONSTANT.COMPONENT_CONFIGS}`)
      .send({ configs });

    expect(res.statusCode).toBe(412);
    expect(res.body).toHaveProperty('errors');
    const configErrors = res.body.errors.filter(
      (err: { field: string; type: string }) =>
        err.field === 'configs' && err.type === 'array.unique'
    );
    expect(configErrors).toHaveLength(1);
  });
});
