import { FormEvent, ChangeEvent, useState, createContext, ReactNode } from 'react';
import styles from 'src/styles/create_account.module.scss';
export type FormValues = Record <string, string>;
export interface SubmitResult {success: boolean|null, message: string};
interface FormSettings {
  children: ReactNode;
  onSubmit(form: FormValues): void;
  formInitialValues: FormValues;
  buttonText?: string;
  submitResult?: SubmitResult;
}
export const FormContext = createContext({
  form: {},
  handleChange: (e: ChangeEvent<HTMLInputElement>) => {}
})

const Form = (props: FormSettings) => {
  const {children, formInitialValues, onSubmit} = props;
  const [form, setForm] = useState(formInitialValues);

  function handleChange (e: ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit (e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormContext.Provider value={{ form, handleChange }}>
        {children}
      </FormContext.Provider>
      <button className={styles.button}>Create Account</button>
      {props.submitResult ?
        <p className={props.submitResult.success ? styles.success : styles.fail}>{props.submitResult.message}</p>
        : null}
    </form>
  )
}

export default Form;