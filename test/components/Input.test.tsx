import { render, screen } from '@testing-library/react';
import Input from '../../src/components/Input';
import userEvent from '@testing-library/user-event';


describe('Input', () => {

  test('Input component blur handler works', async () => {
    render(<Input label='Username' name='username' type='text' validate={()=>{return 'blur error'}}/>)
    const input = screen.getByLabelText('Username');
    userEvent.click(input);
    userEvent.type(input, 'hello');

    //how do i await something that doesn't exist and then validate it doesn't exist??
    // expect( async () => { await screen.findByText('blur error') }).toThrow();

    expect(screen.queryByText('blur error')).toBeNull();
    userEvent.click(document.body);
    await screen.findByText('blur error');

  })

  test('Input component onChange handler works', async () => {
    render(<Input label='Username' name='username' type='text' validate={(username: string)=>{
      if (username.length < 5) return 'on change works';
      else if (username.length > 10) return 'validate after focus works';
    }}/>)
    const input = screen.getByLabelText('Username');
    userEvent.click(input);
    userEvent.type(input, 'bee');
    // expect( await screen.findByText('on change works')).toThrow();
    expect(screen.queryByText('on change works')).toBeNull();

    userEvent.click(document.body);
    await screen.findByText('on change works');

    userEvent.type(input, 'longerthan10characters');
    await screen.findByText('validate after focus works');

  })







})