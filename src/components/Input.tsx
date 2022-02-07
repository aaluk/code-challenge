import { useState, ChangeEvent } from 'react';
import styles from 'src/styles/create_account.module.scss';

interface InputSettings {
  inputName: string;
  inputIdName: string;
  inputType: string;
  changeHandler: Function;
  errorMessage?: string;
  inputState: string;
  inputUpdateState: Function;
}

export default function Input(props: InputSettings) {
  function inputChangeHandler (evt: ChangeEvent<HTMLInputElement>) {
    props.changeHandler(evt);
  }
  return (
    <div className={styles.inputContainer}>
      <label
        className={styles.label}
        htmlFor={props.inputIdName}>{props.inputName}</label>
      <input
        className={styles.input}
        onChange={inputChangeHandler}
        type={props.inputType}
        id={props.inputIdName}
        name={props.inputIdName}
        value={props.inputState}>
      </input>
      {props.errorMessage ? <p className={styles.error}>{props.errorMessage}</p> : null}
    </div>
  )
}