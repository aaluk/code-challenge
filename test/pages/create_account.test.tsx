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
    act( () => {
      userEvent.click(screen.getByText('Create Account'));
    })
    expect(fetchMock).toBeCalledTimes(1);
    expect(fetchMock).toBeCalledWith('/api/create_new_account', {
        body: JSON.stringify({username: '', password: ''}),
        method: 'POST',
    });
  });

  test('Creates account successfully', async() => {
    render(<CreateAccount />);
    const username = screen.getByLabelText('Username');
    const password = screen.getByLabelText('Password');
    userEvent.type(username, 'workingusername');
    fetchMock.mockResponseOnce(JSON.stringify({result: false}));
    userEvent.type(password, 'workingpasswordworkingpassword1!');

    fetchMock.mockResponseOnce(JSON.stringify({result: true}));
    userEvent.click(screen.getByText('Create Account'));

    expect(fetchMock).toBeCalledTimes(2);

    const successMessage = await screen.findByText('Account Created Successfully')
    expect(successMessage).toBeTruthy();
  })

  test('Fails to create account', async() => {
    render(<CreateAccount />);
    const username = screen.getByLabelText('Username');
    const password = screen.getByLabelText('Password');

    userEvent.type(username, 'a');

    fetchMock.mockResponseOnce(JSON.stringify({result: false}));
    userEvent.type(password, 'a');

    fetchMock.mockResponseOnce(JSON.stringify({result: false, errors: {
      username: 'Username must be at least 10 characters',
      password: 'Password must be at least 20 characters'
    }}));
    userEvent.click(screen.getByText('Create Account'));

    expect(fetchMock).toBeCalledTimes(2);

    const successMessage = await screen.findByText('Submitted invalid username and/or password. Please try again.')
    expect(successMessage).toBeTruthy();
  })

});
