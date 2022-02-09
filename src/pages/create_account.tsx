import Head from 'next/head';
import { FormEvent, useState, useContext } from 'react';
import styles from 'src/styles/create_account.module.scss';
import wealthlogo from '../assets/logo.png';
import Image from 'next/image';
import Form, { FormContext, SubmitResult } from '../components/Form';
import Input from '../components/Input';
import validateUsername from '../utils/usernameValid';
import validatePassword from '../utils/passwordValid';


export default function CreateAccount() {
  const { form } = useContext(FormContext);
  const [submitMessage, setMessage] = useState<SubmitResult>({
    message: '',
    success: null,
  })
  async function onSubmit (form: any) {
    try {
      const response = await fetch('/api/create_new_account', {
        method: 'POST',
        body: JSON.stringify(form)
      })
      const result = await response.json();
      if (result.result) {
        setMessage({
          message:'Account Created Successfully',
          success: true
        })
      } else {
        setMessage({
          message:'Submitted invalid username and/or password. Please try again.',
          success: false
        })
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
            <h1>Create New Account</h1>
          </div>
          <Form
            formInitialValues={{
              username: '',
              password: ''
            }}
            onSubmit={onSubmit}
            submitResult={submitMessage}>
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
              />
          </Form>
        </div>
      </article>
    </>
  );
}
