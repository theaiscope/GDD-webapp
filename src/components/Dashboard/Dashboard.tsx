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
  return (
      <div className={styles.container}>
        <div className={styles.canvasContainer}>
          <ActionToolbar saveAction={() => {
            if (canvas) {
              //TODO: Unsure that this is working.
              localStorage.setItem(
                  "savedDrawing",
                  canvas.getSaveData()
              );
            }
          }} clearAction={() => {
            if (canvas) {
              canvas.clear()
            }
          }} undoAction={() => {
            if (canvas) {
              canvas.undo()
            }
          }} redoAction={() => {
            if (canvas) {
              localStorage.setItem(
                  "savedDrawing",
                  canvas.getSaveData()
              );
            }
          }}/>
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
