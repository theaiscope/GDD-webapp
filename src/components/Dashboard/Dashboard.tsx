import React, {ReactElement, useState} from 'react'
import styles from './Dashboard.module.css'
import CanvasDraw from "react-canvas-draw";
import malaria from './malaria.png';
import {ActionToolbar} from "./ActionToolbar/ActionToolbar";
import {ImageToolbar} from "./ImageToolbar/ImageToolbar";


export const Dashboard = (): ReactElement => {
  const [disabled, toggleDisabled] = useState(true)
  let canvas: CanvasDraw | null;

  //TODO: Are pictures of a fixed size? we might need to adjust the canvas when the picture size changes
  //TODO: Canvas is working fine but zoom in and zoom out miss don't keep image at center, workable but not great UX.
  const saveAction = () => {
    if (canvas) {
      localStorage.setItem(
          "savedDrawing",
          canvas.getSaveData()
      )
      toggleDisabled(true);
    }
  }

  const undoAction = () => {
    if (canvas) {
      canvas.undo()
    }
  }

  const editAction = () => {
    toggleDisabled(false);
  }

  const clearAction = () => {
    if (canvas) {
      canvas.clear()
    }
  }

  const skipAction = () => {
    toggleDisabled(true);
  }

  const invalidAction = () => {
    toggleDisabled(true);
  }

  return (
      <div className={styles.container}>
        <div className={styles.canvasContainer}>
          <ActionToolbar
              editAction={editAction}
              clearAction={clearAction}
              undoAction={undoAction}
          />
          <CanvasDraw
              lazyRadius={0}
              ref={canvasDraw => (canvas = canvasDraw)}
              canvasWidth={2962}
              canvasHeight={1512}
              enablePanAndZoom={true}
              clampLinesToDocument={true}
              imgSrc={malaria}
              className={styles.canvas}
              disabled={disabled}
          />
        </div>
        <ImageToolbar saveAction={saveAction} invalidAction={invalidAction} skipAction={skipAction} />
      </div>
  )
}