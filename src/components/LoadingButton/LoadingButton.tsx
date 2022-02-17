import React, { ReactElement } from 'react'
import styles from './LoadingButton.module.css'

type Props = {
  className?: string
  loading?: boolean
  children?: React.ReactNode
  onClick: () => void
}

export const LoadingButton = ({ children, loading = false, onClick, className }: Props): ReactElement => (
  <button
    className={`${className} ${styles.loginButton}`}
    onClick={(event) => {
      event.preventDefault()
      onClick()
    }}
    disabled={loading}
  >
    {loading ? <div className={styles.loader} role={'progressbar'} /> : children}
  </button>
)
