import { API_CONSTANT, API_VERSION } from '@/constants';
import { STEPS } from '@/constants/steps.constant';
import { close, connect } from '@/database';
import { app } from '@/index';
import { UserModel } from '@/models';
import request from 'supertest';

describe('Users update', () => {
  beforeAll(async () => {
    await connect();
  });

  afterAll(() => close());

  afterEach(async () => {
    await UserModel.truncate();
  });

  it('Update a user successfully', async () => {
    // create a new user
    const data = {
      email: 'test@example.com',
      password: 'test',
    };

    const res = await request(app)
      .post(`${API_VERSION}${API_CONSTANT.USERS}`)
      .send(data);
    expect(res.statusCode).toBe(200);

    // update step 2
    const data2 = {
      about: 'Test user',
      progress: STEPS['STEP-3'],
    };
    const res2 = await request(app)
      .put(`${API_VERSION}${API_CONSTANT.USERS}/${res.body.data.id}`)
      .send(data2);

    expect(res2.statusCode).toBe(200);
    expect(res2.body.data.email).toBe(data.email);
    expect(res2.body.data.about).toBe(data2.about);
    expect(res2.body.data.progress).toBe(STEPS['STEP-3']);

    // update step 3
    const data3 = {
      address: {
        street: '123 Test St',
        city: 'Testville',
        state: 'Test State',
        zip: '12345',
      },
      birthDate: '1990-01-01',
      progress: STEPS['DONE'],
    };
    const res3 = await request(app)
      .put(`${API_VERSION}${API_CONSTANT.USERS}/${res.body.data.id}`)
      .send(data3);

    expect(res3.statusCode).toBe(200);
    expect(res3.body.data.email).toBe(data.email);
    expect(res3.body.data.about).toBe(data2.about);
    expect(res3.body.data.progress).toBe(STEPS['DONE']);
    expect(res3.body.data.street).toBe(data3.address.street);
    expect(res3.body.data.city).toBe(data3.address.city);
    expect(res3.body.data.state).toBe(data3.address.state);
    expect(res3.body.data.zip).toBe(data3.address.zip);
    expect(res3.body.data.birthDate).toBe(data3.birthDate);
  });
});
