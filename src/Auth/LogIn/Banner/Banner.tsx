import React, { ReactElement } from 'react'
import styles from './Banner.module.css'

export const Banner = (): ReactElement => {
  return (
    <header className={styles.container}>
      <h1>Cross Labeling</h1>
      <p>Related info - Who and how can they help?</p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua.
        <br />
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        <br />
        Dius aute irure in <a href="/process">PROCESS</a> in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur.
        <br />
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est{' '}
        <a href="/FAQ">FAQ</a>.
      </p>
    </header>
  )
}
