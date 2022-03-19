import React, { ReactElement, useState, useEffect } from 'react'
import styles from './Dashboard.module.css'
import CanvasDraw from 'react-canvas-draw'
import { ActionToolbar } from './ActionToolbar/ActionToolbar'
import { ImageToolbar } from './ImageToolbar/ImageToolbar'
import { getImage, getImageDimensions } from '../../services/ImageRepositoryService'
import { GetDataAsObject } from '../../services/DatabaseService'

export const Dashboard = (): ReactElement => {
  const [disabled, toggleDisabled] = useState(true)
  const [imageUrl, setImageUrl] = useState('')
  const [width, setWidth] = useState(1000)
  const [height, setHeight] = useState(1000)

  let canvas: CanvasDraw | null

  useEffect(() => {
    GetDataAsObject('samples').then((imageArray) =>
      getImage(imageArray).then((imageUrl) => {
        setImageUrl(imageUrl)
        getImageDimensions(imageUrl)
          .then((imageDimensions) => {
            setWidth(imageDimensions.width)
            setHeight(imageDimensions.height)
          })
          .catch((error) => console.error(error))
      }),
    )
  }, [])

  //TODO: Canvas is working fine but zoom in and zoom out miss don't keep image at center, workable but not great UX.
  const saveAction = () => {
    if (canvas) {
      localStorage.setItem('savedDrawing', canvas.getSaveData())
      toggleDisabled(true)
    }
  }

  const undoAction = () => {
    if (canvas) {
      canvas.undo()
    }
  }

  const editAction = async () => {
    toggleDisabled(false)
  }

  const clearAction = () => {
    if (canvas) {
      canvas.clear()
    }
  }

  const skipAction = () => {
    toggleDisabled(true)
  }

  const invalidAction = () => {
    toggleDisabled(true)
  }

  return (
    <div className={styles.container}>
      <div className={styles.canvasContainer}>
        <ActionToolbar editAction={editAction} clearAction={clearAction} undoAction={undoAction} />
        <CanvasDraw
          lazyRadius={0}
          ref={(canvasDraw) => (canvas = canvasDraw)}
          canvasWidth={width}
          canvasHeight={height}
          enablePanAndZoom={true}
          clampLinesToDocument={true}
          imgSrc={imageUrl}
          className={styles.canvas}
          disabled={disabled}
        />
      </div>
      <ImageToolbar saveAction={saveAction} invalidAction={invalidAction} skipAction={skipAction} />
    </div>
  )
}
