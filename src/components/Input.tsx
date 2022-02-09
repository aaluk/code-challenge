import { useContext, ChangeEvent, useState, FocusEvent } from 'react';
import { FormContext } from './Form';
import styles from 'src/styles/create_account.module.scss';

interface InputProps {
  label: string;
  name: string;
  type: string;
  validate?: Function;
}

export default function Input(props: InputProps) {
  const { label, name, type, validate = ()=>null } = props;
  const formContext = useContext(FormContext);
  const { form, handleChange } = formContext;
  const [error, setError] = useState<string>(null);
  const [hasBeenFocused, setHasBeenFocused] = useState(false);

  const changeHandler = async(e:ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
    if (hasBeenFocused) {
      setError(await validate(e.target.value));
    }
  }

  const blurHandler = async(e : FocusEvent<HTMLInputElement, Element>) => {
    setHasBeenFocused(true);
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
        onBlur={blurHandler}
        type={type}
        id={name}
        name={name}
        value={form[name]}>
      </input>
      {error ? <p className={styles.error}>{error}</p> : null}
    </div>
  )
}