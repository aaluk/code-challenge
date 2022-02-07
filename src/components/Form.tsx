import { FormEvent, ChangeEvent, useState } from 'react';
import Image from 'next/image';
import styles from 'src/styles/create_account.module.scss';
import Input from './Input';

interface FormSettings {
  formName: string;
  logo: StaticImageData;
  successMessage?: string;
}

export default function Form (props: FormSettings) {
  const [username, setUsername] = useState('');
  const [userError, setUserError] = useState<string>(null);
  const [password, setPassword] = useState('');
  const [passError, setPassError] = useState<string>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(evt: FormEvent) {
    evt.preventDefault();
    const response = await fetch('/api/create_new_account', {
      method: 'POST',
      body: JSON.stringify({username, password}),
    });
    let data = await response.json();
    if (data.result === false) {
      setUserError(data.errors.username || null);
      setPassError(data.errors.password || null);
      setPassword('');
    } else {
      setUserError(null);
      setPassError(null);
      setUsername('');
      setPassword('');
      setSuccess(true);
    }
  }

  function changeHandler (evt: ChangeEvent<HTMLInputElement>) {
    if (evt.target.name === 'username') {
      setUsername(evt.target.value);
    } else {
      setPassword(evt.target.value);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.header}>
            <Image
              src={props.logo}
              width={50}
              height={50}/>
            <h1>{props.formName}</h1>
          </div>
          <Input
            inputName="Username"
            inputIdName="username"
            inputType="text"
            changeHandler={changeHandler}
            inputState={username}
            inputUpdateState={setUsername}
            errorMessage={userError}/>
          <Input
            inputName="Password"
            inputIdName="password"
            inputType="password"
            changeHandler={changeHandler}
            inputState={password}
            inputUpdateState={setPassword}
            errorMessage={passError}/>
          <button className={styles.button}>Create Account</button>
          {success ?
            <p className={styles.success}>{props.successMessage || 'Submitted Successfully'}</p>
            : null}
        </form>
  )
}