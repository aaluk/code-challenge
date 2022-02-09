import { expect } from '@jest/globals';
import fetchMock from 'jest-fetch-mock';
import validatePassword from '../../src/utils/passwordValid';

describe('Validate Password', () => {
  beforeEach(() => {
    fetchMock.enableMocks();
  });

  afterEach(() => {
    fetchMock.resetMocks();
  });

  test('password validation works', async () => {
    expect(await validatePassword('short', false)).toEqual('Password must be at least 20 characters');

    expect(await validatePassword('longpasswordlongpasswordlongpasswordlongpasswordlongpassword', false)).toEqual('Password must be at most 50 characters');

    expect(await validatePassword('longpasswordlongpassword', false)).toEqual('Password must contain at least 1 number');

    expect(await validatePassword('longpasswordlongpassword1', false)).toEqual('Password must contain at least 1 symbol');

    expect(await validatePassword('123456789012345678901', false)).toEqual('Password must contain at least 1 letter');

    fetchMock.mockResponseOnce(JSON.stringify({result: true}));
    expect(await validatePassword('weakpass', true)).toEqual('This password has been hacked elsewhere, choose a different one.');

    fetchMock.mockResponseOnce(JSON.stringify({result: false}));
    expect(await validatePassword('longpasswordlongpassword1!', true)).toEqual(undefined);
  });
});
