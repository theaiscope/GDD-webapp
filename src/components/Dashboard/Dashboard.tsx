import React, { ReactElement, useState, useEffect } from 'react'
import styles from './Dashboard.module.css'
import CanvasDraw, { SelectedSample } from 'react-canvas-draw'
import { ActionToolbar } from './ActionToolbar/ActionToolbar'
import { ImageToolbar } from './ImageToolbar/ImageToolbar'
import { getImage, getImageDimensions, uploadImage } from '../../services/ImageRepositoryService'
import { getBloodSampleContainers } from '../../services/SampleService/SampleService'
import { GetBloodSampleContainers } from '../../services/DatabaseService'

export const Dashboard = (): ReactElement => {
  const [sample, setSample] = useState<SelectedSample>()
  const [imageUrl, setImageUrl] = useState('')
  const [width, setWidth] = useState(1000)
  const [height, setHeight] = useState(1000)

  let canvas: CanvasDraw | null

  useEffect(() => {
    getNewImage()
  }, [])

  const getNewImage = () => {
    GetBloodSampleContainers('samples')
    .then((imageArray) =>
      getImage(imageArray)
      .then((selectedSample) => {
        setSample(selectedSample)
        setImageUrl(selectedSample.url)
        getImageDimensions(selectedSample.url)
          .then((imageDimensions) => {
            setWidth(imageDimensions.width)
            setHeight(imageDimensions.height)
          })
          .catch((error) => console.error(error))
      }),
    )
  }

  //TODO: Canvas is working fine but zoom in and zoom out miss don't keep image at center, workable but not great UX.
  const saveAction = async () => {
    if (canvas && sample) {
      const dataUri = canvas.getDataURL('png', false)
      await uploadImage(dataUri, sample.location, sample?.imageId, sample.maskId)
      getNewImage()
      clearAction()
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

  const skipAction = () => {
    getNewImage()
  }

  const invalidAction = () => {
    getNewImage()
  }

  return (
    <div className={styles.container}>
      <div className={styles.canvasContainer}>
        <ActionToolbar clearAction={clearAction} undoAction={undoAction} />
        <CanvasDraw
          lazyRadius={0}
          ref={(canvasDraw) => (canvas = canvasDraw)}
          canvasWidth={width}
          canvasHeight={height}
          enablePanAndZoom={true}
          clampLinesToDocument={true}
          imgSrc={imageUrl}
          className={styles.canvas}
        />
      </div>
      <ImageToolbar saveAction={saveAction} invalidAction={invalidAction} skipAction={skipAction} />
    </div>
  )
}
