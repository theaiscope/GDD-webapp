import React, { ReactElement } from 'react'
import { Backdrop, CircularProgress } from '@material-ui/core'
import styles from './LoadingSpinner.module.css'

type Props = {
  isLoading: boolean
}

export const LoadingSpinner = (props: Props): ReactElement => (
  <Backdrop open={props.isLoading} className={styles.progressBackdrop} aria-label="Loading Spinner">
    <CircularProgress />
  </Backdrop>
)
