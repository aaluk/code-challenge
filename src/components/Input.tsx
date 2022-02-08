import { useContext, ChangeEvent, useState } from 'react';
import { FormContext } from './Form';
import styles from 'src/styles/create_account.module.scss';

interface InputProps {
  label: string;
  name: string;
  type: string;
  validate?: Function;
  errorMessage?: string;
}

export default function Input(props: InputProps) {
  const { label, name, type, validate, errorMessage } = props;
  const formContext = useContext(FormContext);
  const { form, handleChange } = formContext;
  const [error, setError] = useState<string>(null);

  const changeHandler = async(e:ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
    setError(await validate(e.target.value));
  }

  return (
    <div className={styles.inputContainer}>
      <label
        className={styles.label}
        htmlFor={name}>{label}</label>
      <input
        className={styles.input}
        onChange={changeHandler}
        type={type}
        id={name}
        name={name}
        value={form[name]}>
      </input>
      {errorMessage || error ? <p className={styles.error}>{error}</p> : null}
    </div>
  )
}