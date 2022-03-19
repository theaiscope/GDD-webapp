import React, { ReactElement } from 'react'
import styles from './ActionToolbar.module.css'
import undoIcon from './undo-icon.png'
import clearIcon from './clear-icon.png'

type Props = {
  clearAction: () => void
  undoAction: () => void
}

export const ActionToolbar = ({ clearAction, undoAction }: Props): ReactElement => (
  <div role="toolbar" className={styles.tools}>
    <button onClick={clearAction}>
      <img src={clearIcon} alt={'clear'} />
    </button>
    <button onClick={undoAction}>
      <img src={undoIcon} alt={'undo'} />
    </button>
  </div>
)
