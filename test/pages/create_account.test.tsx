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

  test('validates username that is too short with error message', async() => {
    render(<CreateAccount />);
    const input = screen.getByLabelText('Username');
    let userErrorMessage = screen.queryByText("Username must be at least 10 characters");
    expect(userErrorMessage).toBeNull();
    userEvent.type(input, 'short');
    userEvent.click(document.body);
    userErrorMessage = await screen.findByText("Username must be at least 10 characters");
  })

  test('validates username that is too long with error message', async() => {
    render(<CreateAccount />);
    const input = screen.getByLabelText('Username');
    fireEvent.change(input, {target: {value: 'longusernamelongusernamelongusernamelongusernamelongusername'}});

    const userErrorMessage = await screen.findByText("Username must be at most 50 characters");
    expect(userErrorMessage).toBeTruthy();
  })

  xtest('validates username that is the correct length with no error', async() => {
    render(<CreateAccount />);
    const input = screen.getByLabelText('Username');
    act( () => {
      fireEvent.change(input, {target: {value: 'longusername'}});
    })
    let userErrorMessage = screen.queryByText("Username must be at least 10 characters");
    expect(userErrorMessage).toBeFalsy();
    userErrorMessage = screen.queryByText("Username must be at most 50 characters");
    expect(userErrorMessage).toBeFalsy();
  })


  xtest('validates password that is too short with error message', async() => {
    render(<CreateAccount />);
    const input = screen.getByLabelText('Password');
    fetchMock.mockResponseOnce(JSON.stringify({result: false}));
    act( () => {
      fireEvent.change(input, {target: {value: 'short'}});
    })
    const passErrorMessage = await screen.findByText("Password must be at least 20 characters");
    expect(passErrorMessage).toBeTruthy();
  })

  xtest('validates password that is too long with error message', async() => {
    render(<CreateAccount />);
    const input = screen.getByLabelText('Password');
    fetchMock.mockResponseOnce(JSON.stringify({result: false}));
    act( () => {
      fireEvent.change(input, {target: {value: 'longpasswordlongpasswordlongpasswordlongpasswordlongpassword'}});
    })
    const passErrorMessage = await screen.findByText("Password must be at most 50 characters");
    expect(passErrorMessage).toBeTruthy();
  })

  xtest('validates password that has no letter error message', async() => {
    render(<CreateAccount />);
    const input = screen.getByLabelText('Password');
    fetchMock.mockResponseOnce(JSON.stringify({result: false}));
    act( () => {
      fireEvent.change(input, {target: {value: '12345678901234567890121'}});
    })
    const passErrorMessage = await screen.findByText('Password must contain at least 1 letter');
    expect(passErrorMessage).toBeTruthy();
  })

  xtest('validates password that has no number error message', async() => {
    render(<CreateAccount />);
    const input = screen.getByLabelText('Password');
    fetchMock.mockResponseOnce(JSON.stringify({result: false}));
    act( () => {
      fireEvent.change(input, {target: {value: 'longpasswordlongpassword'}});
    })
    const passErrorMessage = await screen.findByText('Password must contain at least 1 number');
    expect(passErrorMessage).toBeTruthy();
  })

  xtest('validates password that has no symbol error message', async() => {
    render(<CreateAccount />);
    const input = screen.getByLabelText('Password');
    fetchMock.mockResponseOnce(JSON.stringify({result: false}));
    act( () => {
      fireEvent.change(input, {target: {value: 'longpasswordlongpassword1'}});
    })
    const passErrorMessage = await screen.findByText('Password must contain at least 1 symbol');
    expect(passErrorMessage).toBeTruthy();
  })

  xtest('validates password that is breached', async() => {
    render(<CreateAccount />);
    const input = screen.getByLabelText('Password');
    fetchMock.mockResponseOnce(JSON.stringify({result: true}));
    act( () => {
      fireEvent.change(input, {target: {value: 'weakpass'}});
    })
    const passErrorMessage = await screen.findByText('This password has been hacked elsewhere, choose a different one.');
    expect(passErrorMessage).toBeTruthy();
  })

  xtest('validates password that is the correct length with no error', async() => {
    render(<CreateAccount />);
    const input = screen.getByLabelText('Password');
    fetchMock.mockResponseOnce(JSON.stringify({result: false}));
    act( () => {
      fireEvent.change(input, {target: {value: 'longpasswordlongpassword1!'}});
    })
    let passErrorMessage = screen.queryByText('Password must be at least 20 characters');
    expect(passErrorMessage).toBeFalsy();
    passErrorMessage = screen.queryByText('Password must be at most 50 characters');
    expect(passErrorMessage).toBeFalsy();
    passErrorMessage = screen.queryByText('Password must contain at least 1 letter');
    expect(passErrorMessage).toBeFalsy();
    passErrorMessage = screen.queryByText('Password must contain at least 1 number');
    expect(passErrorMessage).toBeFalsy();
    passErrorMessage = screen.queryByText('Password must contain at least 1 symbol');
    expect(passErrorMessage).toBeFalsy();
  })

});
