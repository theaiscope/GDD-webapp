import React, {ReactElement} from 'react'
import styles from './ImageToolbar.module.css'

type Props = {
  saveAction: () => void, skipAction: () => void, invalidAction: () => void
}

export const ImageToolbar = ({saveAction, skipAction, invalidAction}: Props): ReactElement => (
    <div className={styles.container}>
      <button
          className={styles.invalid}
          onClick={invalidAction}
      >
        Invalid
      </button>
      <button
          className={styles.skip}
          onClick={skipAction}
      >
        Skip
      </button>
      <button
          className={styles.save}
          onClick={saveAction}
      >
        Save
      </button>
    </div>
)