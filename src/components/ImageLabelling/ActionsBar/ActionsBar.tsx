import React, { ReactElement } from 'react'
import styles from './ActionsBar.module.css'

type Props = {
  disabled: boolean
}

export const ActionsBar = ({ disabled }: Props): ReactElement => {
  const markImageInvalid = (): void => {
    console.log('markImageInvalid')
  }

  const skipImage = (): void => {
    console.log('skipImage')
  }

  const saveImage = (): void => {
    console.log('saveImage')
  }

  return (
    <div className={styles.container}>
      <button className={styles.invalid} onClick={markImageInvalid} disabled={disabled}>
        Invalid
      </button>
      <button className={styles.skip} onClick={skipImage} disabled={disabled}>
        Skip
      </button>
      <button className={styles.save} onClick={saveImage} disabled={disabled}>
        Save
      </button>
    </div>
  )
}
