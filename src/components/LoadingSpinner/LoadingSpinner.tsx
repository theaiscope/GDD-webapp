import React, { ReactElement } from 'react'
import { Backdrop, CircularProgress } from '@material-ui/core'
import styles from './LoadingSpinner.module.css'

type Props = {
  open: boolean
}

export const LoadingSpinner = (props: Props): ReactElement => (
  <Backdrop open={props.open} className={styles.progressBackdrop} aria-label="Progress Bar">
    <CircularProgress />
  </Backdrop>
)
