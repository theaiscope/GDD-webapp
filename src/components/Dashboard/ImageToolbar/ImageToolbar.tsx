import { CircularProgress } from '@material-ui/core'
import React, { ReactElement } from 'react'
import styles from './ImageToolbar.module.css'

type Props = {
  saveAction: () => void
  skipAction: () => void
  invalidAction: () => void
  disabled?: boolean
  showProgress?: boolean
}

export const ImageToolbar = ({
  saveAction,
  skipAction,
  invalidAction,
  disabled,
  showProgress,
}: Props): ReactElement => (
  <div className={styles.container}>
    {showProgress && <CircularProgress />}
    <div className={styles.buttons}>
      <button className={styles.invalid} onClick={invalidAction} disabled={disabled}>
        Invalid
      </button>
      <button className={styles.skip} onClick={skipAction} disabled={disabled}>
        Skip
      </button>
      <button className={styles.save} onClick={saveAction} disabled={disabled}>
        Save
      </button>
    </div>
  </div>
)
