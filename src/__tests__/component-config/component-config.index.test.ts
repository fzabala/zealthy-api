import { API_CONSTANT, API_VERSION } from '@/constants';
import { close, connect } from '@/database';
import { app } from '@/index';
import { UserModel } from '@/models';
import request from 'supertest';

describe('Component config index', () => {
  beforeAll(async () => {
    await connect();
  });

  afterAll(() => close());

  afterEach(async () => {
    await UserModel.truncate();
  });

  it('Fetch all component configs', async () => {
    const res = await request(app).get(
      `${API_VERSION}${API_CONSTANT.COMPONENT_CONFIGS}`
    );

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveLength(2);
  });

  it('Create component configs and fetch them', async () => {
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

  it('Create component configs, overrides them and fetch the new ones', async () => {
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
    expect(res2.body.data).toHaveLength(configs2.length);
  });
});
