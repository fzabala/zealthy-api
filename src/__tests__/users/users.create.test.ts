import {
  API_CONSTANT,
  API_VERSION,
  EMAIL_ALREADY_REGISTERED,
  VALIDATION_ERRORS,
} from '@/constants';
import { STEPS } from '@/constants/steps.constant';
import { close, connect } from '@/database';
import { app } from '@/index';
import { UserModel } from '@/models';
import request from 'supertest';

describe('Users create', () => {
  beforeAll(async () => {
    await connect();
  });

  afterAll(() => close());

  afterEach(async () => {
    await UserModel.truncate();
  });

  it('Create a user successfully', async () => {
    const data = {
      email: 'test@example.com',
      password: 'test',
    };
    const res = await request(app)
      .post(`${API_VERSION}${API_CONSTANT.USERS}`)
      .send(data);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toBeDefined();
    expect(res.body.data.email).toBe(data.email);
    expect(res.body.data.progress).toBe(STEPS['STEP-2']);
  });

  it('Create a user with duplicated email and fails', async () => {
    const data = {
      email: 'test@example.com',
      password: 'test',
    };

    const res = await request(app)
      .post(`${API_VERSION}${API_CONSTANT.USERS}`)
      .send(data);
    expect(res.statusCode).toBe(200);

    const res2 = await request(app)
      .post(`${API_VERSION}${API_CONSTANT.USERS}`)
      .send(data);
    expect(res2.statusCode).toBe(403);
    expect(res2.body.message).toBe(EMAIL_ALREADY_REGISTERED);
  });

  it('Create a user with invalid field formats', async () => {
    const data = {
      email: 'invalid_email',
      password: 'test',
    };

    const res = await request(app)
      .post(`${API_VERSION}${API_CONSTANT.USERS}`)
      .send(data);

    expect(res.statusCode).toBe(412);
    expect(res.body.message).toBe(VALIDATION_ERRORS);

    const emailErrorField = res.body.errors.filter(
      (err: { field: string }) => err.field === 'email'
    );
    expect(emailErrorField).toHaveLength(1);
  });
});
