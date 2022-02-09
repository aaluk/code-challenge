import { act, render, screen, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from '../../src/components/Form';
import Input from '../../src/components/Input';


describe('Form', () => {
  test('Form works', () => {
    const onSubmit = jest.fn();
    render (
    <Form
      formInitialValues = {{username: ''}}
      onSubmit = {onSubmit}
      >
      <Input
        label="Username"
        name="username"
        type="text"
        />
    </Form>);

    const input = screen.getByLabelText('Username');
    userEvent.type(input, 'form is working')
    userEvent.click(screen.getByText('Create Account'))
    expect(onSubmit).toBeCalledTimes(1);
    expect(onSubmit).toBeCalledWith({username: 'form is working'});
  })

})