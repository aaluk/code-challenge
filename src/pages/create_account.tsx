import Head from 'next/head';
import { FormEvent, useState } from 'react';
import styles from 'src/styles/create_account.module.scss';

export default function CreateAccount() {
  const [username, setUsername] = useState('');
  const [userError, setUserError] = useState(null);
  const [password, setPassword] = useState('');
  const [passError, setPassError] = useState(null);

  async function handleSubmit(evt: FormEvent) {
    evt.preventDefault();
    const response = await fetch('/api/create_new_account', {
      method: 'POST',
      body: JSON.stringify({username, password}),
    });
    let data = await response.json();
    console.log(data)
    if (data.result === false) {
      setUserError(data.errors.username || null);
      setPassError(data.errors.password || null);
    } else {
      setUserError(null);
      setPassError(null);
    }
  }

  function changeHandler (evt) { //TYPE SCRIPT FOR INPUT?
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
      </Head>
      <article className={styles.article}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h1>Create New Account</h1>
          <div>
            <label
              className={styles.label}
              htmlFor="username">Username:</label>
            <input
              className={styles.input}
              onChange={changeHandler}
              type="text"
              id="username"
              name="username">
            </input>
            {userError ? <div className={styles.error}>{userError}</div> : null}
          </div>
          <div>
            <label
              className={styles.label}
              htmlFor="password">Password:</label>
            <input
              className={styles.input}
              onChange={changeHandler}
              type="password"
              id="password"
              name="password">
            </input>
            {passError ? <div className={styles.error}>{passError}</div> : null}
          </div>
          <button>Create Account</button>
        </form>
      </article>
    </>
  );
}
