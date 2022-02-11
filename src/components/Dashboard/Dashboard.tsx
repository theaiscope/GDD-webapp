import React, {ReactElement} from 'react'
import styles from './Dashboard.module.css'
import CanvasDraw from "react-canvas-draw";
import malaria from './malaria.png';
import {ActionToolbar} from "./ActionToolbar/ActionToolbar";
import {ImageToolbar} from "./ImageToolbar/ImageToolbar";


export const Dashboard = (): ReactElement => {
  let canvas: CanvasDraw | null;

  //TODO: Are pictures of a fixed size? we might need to adjust the canvas when the picture size changes
  //TODO: Canvas is working fine but zoom in and zoom out miss don't keep image at center, workable but not great UX.
  const saveAction = () => {
    if (canvas) {
      localStorage.setItem(
          "savedDrawing",
          canvas.getSaveData()
      )
    }
  }

  const undoAction = () => {
    if (canvas) {
      canvas.undo()
    }
  }

  const editAction = () => {
    alert('Not implemented')
  }

  const clearAction = () => {
    if (canvas) {
      canvas.clear()
    }
  }

  const redoAction = () => {
    if (canvas) {
      const savedData : string = localStorage.getItem('savedDrawing') ?? ''
      canvas.loadSaveData(savedData, true);
    }
  }

  const skipAction = () => {
    alert('Skip action not implemented yet')
  }

  const invalidAction = () => {
    alert('Invalid action not implemented yet')
  }

  return (
      <div className={styles.container}>
        <div className={styles.canvasContainer}>
          <ActionToolbar
              editAction={editAction}
              clearAction={clearAction}
              undoAction={undoAction}
              redoAction={redoAction}
          />
          <CanvasDraw
              ref={canvasDraw => (canvas = canvasDraw)}
              canvasWidth={2962}
              canvasHeight={1512}
              enablePanAndZoom={true}
              clampLinesToDocument={true}
              imgSrc={malaria}
              className={styles.canvas}
          />
        </div>
        <ImageToolbar saveAction={saveAction} invalidAction={invalidAction} skipAction={skipAction} />
      </div>
  )
}