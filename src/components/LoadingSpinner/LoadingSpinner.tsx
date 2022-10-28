import React, { ReactElement } from 'react'
import { Backdrop, CircularProgress } from '@material-ui/core'
import styles from './LoadingSpinner.module.css'
import { useLoading } from '../../hooks/Loading/LoadingHook'

export const LoadingSpinner = (): ReactElement => {
  const { isLoading } = useLoading()

  return (
    <Backdrop open={isLoading} className={styles.progressBackdrop} aria-label="Loading Spinner">
      <CircularProgress />
    </Backdrop>
  )
}
