import React, { ReactElement } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { firebaseAuth, LogOut } from '../../Auth'
import styles from './Navbar.module.css'

export const Navbar = (): ReactElement => {
  const [user] = useAuthState(firebaseAuth)

  return (
    <div className={styles.navbar}>
      <a className={styles.link} href="https://aiscope.net/">
        <img
          className={styles.image}
          src="https://aiscope.net/wp-content/uploads/2019/11/Logo_AiScope-1.png"
          alt="aiscope-logo"
        />
      </a>

      {user && (
        <div className={styles.loggedInContainer}>
          <p className={styles.user}>{user.email}</p>
          <LogOut className={styles.logOut} />
        </div>
      )}
    </div>
  )
}
