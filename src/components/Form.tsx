import { FormEvent, ChangeEvent, useState, createContext, ReactNode } from 'react';
import styles from 'src/styles/create_account.module.scss';

interface FormSettings {
  children: ReactNode;
  successMessage: string;
  onSubmit(e: FormEvent, form:any): void;
  formInitialValues: any;
  buttonText?: string;
}
export const FormContext = createContext({
  form: {},
  handleChange: (e: ChangeEvent<HTMLInputElement>) => {}
})

const Form = (props: FormSettings) => {
  const {children, formInitialValues, onSubmit} = props;
  const [form, setForm] = useState(formInitialValues);
  const [success, setSuccess] = useState(false);

  function handleChange (e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  return (
    <form onSubmit={e => onSubmit(e, form)}>
      <FormContext.Provider value={{ form, handleChange }}>
        {children}
      </FormContext.Provider>
      <button className={styles.button}>Create Account</button>
      {success ?
        <p className={styles.success}>{props.successMessage || 'Submitted Successfully'}</p>
        : null}
    </form>
  )
}

export default Form;