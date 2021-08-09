import Head from 'next/head'
import { useAuth } from '../lib/auth'
import styles from '../styles/Home.module.css'

export default function Home() {
  const auth = useAuth()
  console.log('logging', auth?.user?.email)


  return (
    <div className={styles.container}>
      <Head>
        <title>Fast Feedback</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Fast Feedback
        </h1>

        <p className={styles.description}>
          Current user: <code className={styles.code}>{auth.user ? auth.user.email : null}</code>
        </p>
        {auth.user ? (
          <button onClick={() => auth.signout()}>Sign out</button>
        ) : (
          <button onClick={() => auth.signinWithGithub()}>Sign in</button>
        )}

      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
