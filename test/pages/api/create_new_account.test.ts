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

  test('when inputting empty username and password, return false with error message', async () => {
    const { req, res } = mockRequest({
      method: 'POST',
      body: {
        username: '',
        password: ''
      },
    });

    await createNewAccount(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({
      result: false,
      errors: {
        username: "Username must be at least 10 characters",
        password: "Password must be at least 20 characters"
      },
    });
  });

  test('when inputting incorrect username, return false with error message', async () => {
    const { req, res } = mockRequest({
      method: 'POST',
      body: {
        username: 'abcd',
        password: 'passwordthatshouldwork1!'
      },
    });
    fetchMock.mockResponseOnce(JSON.stringify({result: false}));
    await createNewAccount(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({
      result: false,
      errors: {
        username: "Username must be at least 10 characters"
      },
    });
  });

  test('when inputting password too short, return false with error message', async () => {
    const { req, res } = mockRequest({
      method: 'POST',
      body: {
        username: 'abcdfdsafdf',
        password: 'password'
      },
    });
    fetchMock.mockResponseOnce(JSON.stringify({result: false}));
    await createNewAccount(req, res);
    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({
      result: false,
      errors: {
        password: 'Password must be at least 20 characters'
      },
    });
  });

  test('when inputting username and password too long, return false with error message', async () => {
    const { req, res } = mockRequest({
      method: 'POST',
      body: {
        username: 'passwordpasswordpasswordpasswordpasswordpasswordpassword',
        password: 'passwordpasswordpasswordpasswordpasswordpasswordpassword'
      },
    });
    fetchMock.mockResponseOnce(JSON.stringify({result: false}));
    await createNewAccount(req, res);
    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({
      result: false,
      errors: {
        username: 'Username must be at most 50 characters',
        password: 'Password must be at most 50 characters'
      },
    });
  });

  test('when inputting password without number, return false with error message', async () => {
    const { req, res } = mockRequest({
      method: 'POST',
      body: {
        username: 'abcdfdsafdf',
        password: 'passwordpasswordpassword'
      },
    });
    fetchMock.mockResponseOnce(JSON.stringify({result: false}));
    await createNewAccount(req, res);
    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({
      result: false,
      errors: {
        password: 'Password must contain at least 1 number'
      },
    });
  });

  test('when inputting password without symbol, return false with error message', async () => {
    const { req, res } = mockRequest({
      method: 'POST',
      body: {
        username: 'abcdfdsafdf',
        password: 'passwordpasswordpassword1'
      },
    });
    fetchMock.mockResponseOnce(JSON.stringify({result: false}));
    await createNewAccount(req, res);
    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({
      result: false,
      errors: {
        password: 'Password must contain at least 1 symbol'
      },
    });
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
});


