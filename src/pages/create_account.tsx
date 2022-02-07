import Head from 'next/head';
import styles from 'src/styles/create_account.module.scss';
import wealthlogo from '../assets/logo.png';
import Form from '../components/Form';

export default function CreateAccount() {

  return (
    <>
      <Head>
        <title>Create Account</title>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;900&display=swap" rel="stylesheet"></link>
      </Head>
      <article className={styles.article}>
       <Form
         formName="Create New Account"
         logo={wealthlogo}
         successMessage="Account Created Successfully"/>
      </article>
    </>
  );
}
