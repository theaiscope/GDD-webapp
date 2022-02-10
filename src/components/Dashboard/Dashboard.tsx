import React, {ReactElement} from 'react'
import styles from './Dashboard.module.css'
import CanvasDraw from "react-canvas-draw";
import malaria from './malaria.png';
import saveIcon from './save-icon.png'
import undoIcon from './undo-icon.png'
import redoIcon from './redo-icon.png'
import clearIcon from './clear-icon.png'

export const Dashboard = (): ReactElement => {
  let canvas: CanvasDraw | null;

  //TODO: Move toolbar to a component. Some controls are missing
  //TODO: Are pictures of a fixed size? we might need to adjust the canvas when the picture size changes
  //TODO: Move footer to a component. Some controls are missing
  //TODO: Canvas is working fine but zoom in and zoom out miss don't keep image at center, workable but not greate UX.
  return (
      <div className={styles.container}>
        <div className={styles.canvasContainer}>
          <div role='toolbar' className={styles.tools}>
            <button
                onClick={() => {
                  if (canvas) {
                    //TODO: Unsure that this is working.
                    localStorage.setItem(
                        "savedDrawing",
                        canvas.getSaveData()
                    );
                  }
                }}
            >
              <img src={saveIcon}/>
            </button>
            <button
                onClick={() => {
                  if (canvas) {
                    canvas.clear()
                  }
                }}
            >
              <img src={clearIcon}/>
            </button>
            <button
                onClick={() => {
                  if (canvas) {
                    canvas.undo()
                  }
                }}
            >
              <img src={undoIcon}/>
            </button>
            <button
                onClick={() => {
                  if (canvas) {
                    localStorage.setItem(
                        "savedDrawing",
                        canvas.getSaveData()
                    );
                  }
                }}
            >
              <img src={redoIcon}/>
            </button>
          </div>
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
