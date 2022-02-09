import { expect } from '@jest/globals';
import validateUsername from '../../src/utils/usernameValid';

describe ('Validate Username', () => {
  test('username validation works', () => {
    expect(validateUsername('short')).toEqual('Username must be at least 10 characters');

    expect(validateUsername('usernamelongusernamelongusernamelongusernamelongusernamelong')).toEqual('Username must be at most 50 characters');

    expect(validateUsername('perfectusername')).toEqual(undefined);
  })



})