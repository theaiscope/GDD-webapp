import React, {ReactElement} from 'react'
import styles from './Dashboard.module.css'
import CanvasDraw from "react-canvas-draw";
import malaria from './malaria.png';
import {ActionToolbar} from "./ActionToolbar/ActionToolbar";


export const Dashboard = (): ReactElement => {
  let canvas: CanvasDraw | null;

  //TODO: Move toolbar to a component. Some controls are missing
  //TODO: Are pictures of a fixed size? we might need to adjust the canvas when the picture size changes
  //TODO: Move footer to a component. Some controls are missing
  //TODO: Canvas is working fine but zoom in and zoom out miss don't keep image at center, workable but not greate UX.
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

  return (
      <div className={styles.container}>
        <div className={styles.canvasContainer}>
          <ActionToolbar
              saveAction={saveAction}
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
        <div className={styles.footer}>
          <button className={styles.invalid}>Invalid</button>
          <button className={styles.skip}>Skip</button>
          <button className={styles.save}>Save</button>
        </div>
      </div>
  )
}