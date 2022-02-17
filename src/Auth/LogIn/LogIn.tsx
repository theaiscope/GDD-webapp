import React, { ReactElement, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { config } from '../config'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { Footer } from './Footer/Footer'
import { Form } from './Form/Form'
import styles from './LogIn.module.css'
import { Banner } from './Banner/Banner'

export const LogIn = (): ReactElement => {
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(config)
  const navigate = useNavigate()
  const location = useLocation()
  const contactMail = 'GDD@aiscope.net'

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
      <div>
        <Form onSubmit={signInWithEmailAndPassword} loading={loading} error={error} contactAddress={contactMail} />
        <Footer contactAddress={contactMail} />
      </div>
    </div>
  )
}
