import { GetServerSideProps } from 'next';
import { FormEvent, useState } from 'react';
import { parseCookies } from 'nookies';
import { useAuth } from '../contexts/AuthContext';
import styles from '../styles/Home.module.css';

export default function Home() {
  const { signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const data = {
      email,
      password,
    };

    await signIn(data);
  }

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <input
        type='text'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type='submit'>Entrar</button>
    </form>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = parseCookies(ctx);

  if (cookies['nextauth.token']) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
