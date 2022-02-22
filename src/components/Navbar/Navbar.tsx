import React, { ReactElement } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { firebaseService, LogOut } from '../../Auth'
import styles from './Navbar.module.css'

export const Navbar = (): ReactElement => {
  const [user] = useAuthState(firebaseService)

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
