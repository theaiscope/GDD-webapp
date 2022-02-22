import React, {ReactElement} from 'react'
import styles from './ActionToolbar.module.css'
import saveIcon from './save-icon.png'
import undoIcon from './undo-icon.png'
import clearIcon from './clear-icon.png'

type Props = {
  editAction: () => void, clearAction: () => void, undoAction: () => void
}

export const ActionToolbar = ({editAction, clearAction, undoAction}: Props): ReactElement => (
    <div role="toolbar" className={styles.tools}>
      <button
          id={styles.edit}
          onClick={editAction}
      >
        <img src={saveIcon} alt={'edit'}/>
      </button>
      <button
          onClick={clearAction}
      >
        <img src={clearIcon} alt={'clear'}/>
      </button>
      <button
          onClick={undoAction}
      >
        <img src={undoIcon} alt={'undo'}/>
      </button>
    </div>
)