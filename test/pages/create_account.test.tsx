import { act, render, screen, fireEvent} from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import fetchMock from 'jest-fetch-mock';
import CreateAccount from 'src/pages/create_account';

describe('CreateAccount', () => {
  beforeEach(() => {
    fetchMock.enableMocks();
  });

  afterEach(() => {
    fetchMock.resetMocks();
  });

  test('rendering', () => {
    render(<CreateAccount />);
    fetchMock.mockResponseOnce(JSON.stringify({}));
    userEvent.click(screen.getByText('Create Account'));
    expect(fetchMock).toBeCalledTimes(1);
    expect(fetchMock).toBeCalledWith('/api/create_new_account', {
        body: JSON.stringify({username: '', password: ''}),
        method: 'POST',
    });
  });

  test('rendering out the too short error message', async () => {
    render(<CreateAccount />);
    fetchMock.mockResponseOnce(JSON.stringify({
      result: false,
      errors: {
        username: "Username must be at least 10 characters",
        password: "Password must be at least 20 characters"
      },
    }));

    fireEvent.click(screen.getByText('Create Account'));
    const userErrorMessage = await screen.findByText("Username must be at least 10 characters");
    const passErrorMessage = await screen.findByText("Password must be at least 20 characters");

    expect(userErrorMessage).toBeTruthy();
    expect(passErrorMessage).toBeTruthy();
  });

  test('rendering out too long error messages', async () => {
    render(<CreateAccount />);
    fetchMock.mockResponseOnce(JSON.stringify({
      result: false,
      errors: {
        username: 'Username must be at most 50 characters',
        password: 'Password must be at most 50 characters'
      },
    }));

    fireEvent.click(screen.getByText('Create Account'));
    const userErrorMessage = await screen.findByText('Username must be at most 50 characters');
    const passErrorMessage = await screen.findByText('Password must be at most 50 characters');

    expect(userErrorMessage).toBeTruthy();
    expect(passErrorMessage).toBeTruthy();
  });

  test('rendering out password no number error messages', async () => {
    render(<CreateAccount />);
    fetchMock.mockResponseOnce(JSON.stringify({
      result: false,
      errors: {
        password: 'Password must contain at least 1 symbol'
      },
    }));

    fireEvent.click(screen.getByText('Create Account'));
    const userErrorMessage = screen.queryByText("Username must be at least 10 characters");
    expect(userErrorMessage).toBeFalsy();
    const userErrorMessage2 = screen.queryByText("Username must be at most 50 characters");
    expect(userErrorMessage2).toBeFalsy();
    const passErrorMessage = await screen.findByText('Password must contain at least 1 symbol');
    expect(passErrorMessage).toBeTruthy();
  });

  test('rendering out password no symbol error messages', async () => {
    render(<CreateAccount />);
    fetchMock.mockResponseOnce(JSON.stringify({
      result: false,
      errors: {
        password: 'Password must contain at least 1 symbol'
      },
    }));

    fireEvent.click(screen.getByText('Create Account'));
    const userErrorMessage = screen.queryByText("Username must be at least 10 characters");
    expect(userErrorMessage).toBeFalsy();
    const userErrorMessage2 = screen.queryByText("Username must be at most 50 characters");
    expect(userErrorMessage2).toBeFalsy();
    const passErrorMessage = await screen.findByText('Password must contain at least 1 symbol');
    expect(passErrorMessage).toBeTruthy();
  });

  test('rendering out password is breached', async () => {
    render(<CreateAccount />);
    fetchMock.mockResponseOnce(JSON.stringify({
      result: false,
      errors: {
        password: 'This password has been hacked elsewhere, choose a different one.'
      },
    }));

    fireEvent.click(screen.getByText('Create Account'));
    const userErrorMessage = screen.queryByText("Username must be at least 10 characters");
    expect(userErrorMessage).toBeFalsy();
    const userErrorMessage2 = screen.queryByText("Username must be at most 50 characters");
    expect(userErrorMessage2).toBeFalsy();
    const passErrorMessage = await screen.findByText('This password has been hacked elsewhere, choose a different one.');
    expect(passErrorMessage).toBeTruthy();
  });

  test('rendering out the success message and no error messages', async () => {
    render(<CreateAccount />);
    fetchMock.mockResponseOnce(JSON.stringify({
      result: true,
    }));

    fireEvent.click(screen.getByText('Create Account'));
    const userErrorMessage = screen.queryByText("Username must be at least 10 characters");
    const passErrorMessage = screen.queryByText("Password must be at least 20 characters");
    const successMessage = await screen.findByText("Account Created Successfully")

    expect(userErrorMessage).toBeFalsy();
    expect(passErrorMessage).toBeFalsy();
    expect(successMessage).toBeTruthy();
  });
});
