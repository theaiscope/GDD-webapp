import React, { ReactElement, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { LoadingButton } from '../../components'
import { config } from '../config'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import styles from './LogIn.module.css'
import logo from './logo.png'
import { Banner } from './Banner/Banner'

export const LogIn = (): ReactElement => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(config)
  const navigate = useNavigate()
  const location = useLocation()
  const contactMail = 'contactus@aiscope.com'

  useEffect(() => {
    if (loading) {
      return
    }
    if (user) {
      //TODO: write test for redirecting to location.state.from.pathname
      const state = location.state as { from: Location }
      const from = state ? state.from.pathname : '/dashboard'
      navigate(from)
    }
  }, [user, loading])

  return (
    <div className={styles.pageContainer}>
      <Banner />
      <fieldset className={styles.logInContainer}>
        <h2 className={styles.header}>
          <img className={styles.logo} src={logo} alt="login-header" />
        </h2>
        <p role={'description'} id="create-user-caption" className={styles.text}>
          If you do not have an account,{' '}
          <a role="button" id="create-user" href={`mailto: ${contactMail}`}>
            click here
          </a>{' '}
          to contact us and create it
        </p>
        <input
          type="text"
          className={`${styles.input} ${styles.formItem}`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />
        <input
          type="password"
          className={`${styles.input} ${styles.formItem}`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <LoadingButton
          className={styles.formItem}
          onClick={() => signInWithEmailAndPassword(email, password)}
          loading={loading}
        >
          LOGIN
        </LoadingButton>

        {error && <p className={styles.errorText}>Incorrect email or password</p>}
      </fieldset>
    </div>
  )
}
