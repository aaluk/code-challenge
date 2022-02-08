import Head from 'next/head';
import { useContext, FormEvent, useState } from 'react';
import styles from 'src/styles/create_account.module.scss';
import wealthlogo from '../assets/logo.png';
import Image from 'next/image';
import Form, { FormContext } from '../components/Form';
import Input from '../components/Input';
import validateUsername from '../utils/usernameValid';
import validatePassword from '../utils/passwordValid';

export default function CreateAccount() {
  const { form } = useContext(FormContext);

  const [breached, setBreached] = useState<string>(null)

  async function onSubmit (e: FormEvent, form: any) {
    e.preventDefault();
    console.log(form);
    try {
      let breached = await (fetch('/api/password_exposed', {
        method: 'POST',
        body: JSON.stringify({password: form.password})
      }))
      let error = await breached.json();
      console.log(error);
      if (error.result) {
        console.log('this is here')
        setBreached('This password has been hacked elsewhere, choose a different one.')
      } else {
        const response = await fetch('/api/create_new_account', {
          method: 'POST',
          body: JSON.stringify(form)
        })
        const result = await response.json();
        console.log(result);
      }
    } catch (e) {
      throw (e);
    }

  }
  return (
    <>
      <Head>
        <title>Create Account</title>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;900&display=swap" rel="stylesheet"></link>
      </Head>
      <article className={styles.article}>
        <div className={styles.form}>
          <div className={styles.header}>
            <Image
                src={wealthlogo}
                width={50}
                height={50}/>
            <h1>Account Creation</h1>
          </div>
          <Form
            formInitialValues={{
              username: '',
              password: ''
            }}
            onSubmit={onSubmit}
            successMessage="Account Created Successfully">
              <Input
              label="Username"
              name="username"
              type="text"
              validate={validateUsername}
              />
              <Input
              label="Password"
              name="password"
              type="password"
              validate={validatePassword}
              errorMessage={breached}
              />
          </Form>
        </div>
      </article>
    </>
  );
}
