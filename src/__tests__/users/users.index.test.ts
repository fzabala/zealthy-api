import { API_CONSTANT, API_VERSION } from '@/constants';
import { close, connect } from '@/database';
import { app } from '@/index';
import { UserModel } from '@/models';
import request from 'supertest';

describe('Users index', () => {
  beforeAll(async () => {
    await connect();
  });

  afterAll(() => close());

  afterEach(async () => {
    await UserModel.truncate();
  });

  it('Fetch all users', async () => {
    for (let i = 0; i < 10; i++) {
      const data = {
        email: `test-seed-${i}@example.com`,
        password: 'test',
        about: 'Test user',
        address: {
          street: '123 Test St',
          city: 'Testville',
          state: 'Test State',
          zip: '12345',
        },
        birthDate: '1990-01-01',
      };
      const res = await request(app)
        .post(`${API_VERSION}${API_CONSTANT.USERS}`)
        .send(data);

      expect(res.statusCode).toBe(200);
    }
    const res = await request(app).get(`${API_VERSION}${API_CONSTANT.USERS}`);

    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveLength(10);
  });
});
