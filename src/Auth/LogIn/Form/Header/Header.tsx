import React, { ReactElement } from 'react'
import styles from './Header.module.css'
import logo from './logo.png'

type Props = {
  contactAddress: string
}

export const Header = ({ contactAddress }: Props): ReactElement => {
  return (
    <div className={styles.headerContainer} data-testid={'LoginFormHeader'}>
      <h2>
        <img src={logo} alt="login-header" />
      </h2>
      <p>
        If you do not have an account, <a href={`mailto:${contactAddress}`}>click here</a> to contact us and create it
      </p>
    </div>
  )
}
