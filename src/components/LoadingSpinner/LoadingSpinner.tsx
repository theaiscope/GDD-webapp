import React, { ReactElement } from 'react'
import { Backdrop, CircularProgress } from '@material-ui/core'
import styles from './LoadingSpinner.module.css'
import { useLoadingSpinner } from './LoadingSpinnerContext'

export const LoadingSpinner = (): ReactElement => {
  const { isLoading } = useLoadingSpinner()

  return (
    <Backdrop open={isLoading} className={styles.progressBackdrop} aria-label="Loading Spinner">
      <CircularProgress />
    </Backdrop>
  )
}
