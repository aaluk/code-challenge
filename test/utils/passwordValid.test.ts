import { expect } from '@jest/globals';
import fetchMock from 'jest-fetch-mock';
import { mockRequest } from 'test/utils';
import validatePassword from '../../src/utils/passwordValid';

describe('Validate Password', () => {
  beforeEach(() => {
    fetchMock.enableMocks();
  });

  afterEach(() => {
    fetchMock.resetMocks();
  });

  test('password validation works', () => {
    expect(validatePassword('short', false)).toEqual('Password must be at least 20 characters');
    expect(validatePassword('longpasswordlongpasswordlongpasswordlongpasswordlongpassword', false)).toEqual('Password must be at most 50 characters');
    expect(validatePassword('longpasswordlongpassword', false)).toEqual('Password must be at most 50 characters');
  });


  // test('when inputting username and password too long, return false with error message', async () => {
  //   const { req, res } = mockRequest({
  //     method: 'POST',
  //     body: {
  //       username: 'passwordpasswordpasswordpasswordpasswordpasswordpassword',
  //       password: 'passwordpasswordpasswordpasswordpasswordpasswordpassword'
  //     },
  //   });
  //   fetchMock.mockResponseOnce(JSON.stringify({result: false}));
  //   await createNewAccount(req, res);
  //   expect(res._getStatusCode()).toBe(200);
  //   expect(res._getJSONData()).toEqual({
  //     result: false,
  //     errors: {
  //       username: 'Username must be at most 50 characters',
  //       password: 'Password must be at most 50 characters'
  //     },
  //   });
  // });

  // test('when inputting password without number, return false with error message', async () => {
  //   const { req, res } = mockRequest({
  //     method: 'POST',
  //     body: {
  //       username: 'abcdfdsafdf',
  //       password: 'passwordpasswordpassword'
  //     },
  //   });
  //   fetchMock.mockResponseOnce(JSON.stringify({result: false}));
  //   await createNewAccount(req, res);
  //   expect(res._getStatusCode()).toBe(200);
  //   expect(res._getJSONData()).toEqual({
  //     result: false,
  //     errors: {
  //       password: 'Password must contain at least 1 number'
  //     },
  //   });
  // });

  // test('when inputting password without symbol, return false with error message', async () => {
  //   const { req, res } = mockRequest({
  //     method: 'POST',
  //     body: {
  //       username: 'abcdfdsafdf',
  //       password: 'passwordpasswordpassword1'
  //     },
  //   });
  //   fetchMock.mockResponseOnce(JSON.stringify({result: false}));
  //   await createNewAccount(req, res);
  //   expect(res._getStatusCode()).toBe(200);
  //   expect(res._getJSONData()).toEqual({
  //     result: false,
  //     errors: {
  //       password: 'Password must contain at least 1 symbol'
  //     },
  //   });
  // });

  // test('Return true', async () => {
  //   const { req, res } = mockRequest({
  //     method: 'POST',
  //     body: {
  //       username: 'abcdfdsafdf',
  //       password: 'passwordpasswordpassword!1'
  //     },
  //   });
  //   fetchMock.mockResponseOnce(JSON.stringify({result: false}));
  //   await createNewAccount(req, res);
  //   expect(res._getStatusCode()).toBe(200);
  //   expect(res._getJSONData()).toEqual({
  //     result: true
  //   });
  // });
});
