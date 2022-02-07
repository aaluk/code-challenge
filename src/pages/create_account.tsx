import Head from 'next/head';
import { FormEvent, ChangeEvent, useState } from 'react';
import styles from 'src/styles/create_account.module.scss';
import wealthlogo from '../assets/logo.png';
import Image from 'next/image';

export default function CreateAccount() {
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
    <>
      <Head>
        <title>Create Account</title>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;900&display=swap" rel="stylesheet"></link>
      </Head>
      <article className={styles.article}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.header}>
            <Image
              src={wealthlogo}
              width={50}
              height={50}/>
            <h1>Create New Account</h1>
          </div>
          <div className={styles.inputContainer}>
            <label
              className={styles.label}
              htmlFor="username">Username</label>
            <input
              className={styles.input}
              onChange={changeHandler}
              type="text"
              id="username"
              name="username"
              value={username}>
            </input>
            {userError ? <p className={styles.error}>{userError}</p> : null}
          </div>
          <div className={styles.inputContainer}>
            <label
              className={styles.label}
              htmlFor="password">Password</label>
            <input
              className={styles.input}
              onChange={changeHandler}
              type="password"
              id="password"
              name="password"
              value={password}>
            </input>
            {passError ? <p className={styles.error}>{passError}</p> : null}
          </div>
          <button className={styles.button}>Create Account</button>
          {success ? <p className={styles.success}>Account Created Successfully</p> : null}
        </form>
      </article>
    </>
  );
}
