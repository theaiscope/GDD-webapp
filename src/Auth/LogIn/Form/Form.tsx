import { AuthError } from 'firebase/auth'
import React, { ReactElement, useState } from 'react'
import { LoadingButton } from '../../../components'
import { Header } from './Header/Header'
import styles from './Form.module.css'

type Props = {
  onSubmit: (email: string, password: string) => Promise<void>
  loading: boolean
  error?: AuthError
  contactAddress: string
}

export const Form = ({ onSubmit, loading, error, contactAddress }: Props): ReactElement => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <form className={styles.container} aria-label="login-form">
      <Header contactAddress={contactAddress} />
      <fieldset className={styles.form}>
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
        <LoadingButton className={styles.formItem} onClick={() => onSubmit(email, password)} loading={loading}>
          LOGIN
        </LoadingButton>
        {error && <p className={styles.errorText}>Incorrect email or password</p>}
      </fieldset>
    </form>
  )
}
