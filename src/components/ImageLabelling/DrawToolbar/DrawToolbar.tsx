import React, { ReactElement } from 'react'
import CanvasDraw from 'react-canvas-draw'
import styles from './DrawToolbar.module.css'
import clearIcon from './clear-icon.png'
import undoIcon from './undo-icon.png'

type Props = {
  canvas: CanvasDraw | undefined
}

export const DrawToolbar = ({ canvas }: Props): ReactElement => {
  const clearCanvas = (): void => canvas?.clear()

  const undoCanvasDraw = (): void => canvas?.undo()

  return (
    <div role="toolbar" className={styles.tools}>
      <button onClick={clearCanvas}>
        <img src={clearIcon} alt={'clear'} />
      </button>
      <button onClick={undoCanvasDraw}>
        <img src={undoIcon} alt={'undo'} />
      </button>
    </div>
  )
}
