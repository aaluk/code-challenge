import { expect } from '@jest/globals';
import createNewAccount from 'src/pages/api/create_new_account';
import fetchMock from 'jest-fetch-mock';
import { mockRequest } from 'test/utils';

describe('/api/create_new_account', () => {
  beforeEach(() => {
    fetchMock.enableMocks();
  });

  afterEach(() => {
    fetchMock.resetMocks();
  });

  test('Return true', async () => {
    const { req, res } = mockRequest({
      method: 'POST',
      body: {
        username: 'abcdfdsafdf',
        password: 'passwordpasswordpassword!1'
      },
    });
    fetchMock.mockResponseOnce(JSON.stringify({result: false}));
    await createNewAccount(req, res);
    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({
      result: true
    });
  });

  test('Return false', async () => {
    const { req, res } = mockRequest({
      method: 'POST',
      body: {
        username: '',
        password: ''
      },
    });
    fetchMock.mockResponseOnce(JSON.stringify({result: false}));
    await createNewAccount(req, res);
    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({
      result: false,
      errors: {
        username: 'Username must be at least 10 characters',
        password: 'Password must be at least 20 characters'
      }
    });
  });
});


