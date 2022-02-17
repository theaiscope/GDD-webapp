import React, { ReactElement } from 'react'
import styles from './Footer.module.css'

type Props = {
  contactAddress: string
}

export const Footer = ({ contactAddress }: Props): ReactElement => (
  <footer className={styles.container}>
    <a href="https://aiscope.net/privacy-policy/">Privacy policy</a>
    <a href={`mailto:${contactAddress}`}>Forgot your password?</a>
  </footer>
)
