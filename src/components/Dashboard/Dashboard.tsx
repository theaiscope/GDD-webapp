import React, { ReactElement, useState, useEffect } from 'react'
import styles from './Dashboard.module.css'
import CanvasDraw from 'react-canvas-draw'
import { ActionToolbar } from './ActionToolbar/ActionToolbar'
import { ImageToolbar } from './ImageToolbar/ImageToolbar'
import { getImageUrl } from '../../services/ImageRepositoryService'
import { fetchImageToLabel, skipImage } from '../../services/ImagesService/ImagesService'
import { useLocation } from 'react-router-dom'
import Image from '../../model/image'
import useNotification from '../../services/Notification/NotificationService'
import { Backdrop, CircularProgress } from '@material-ui/core'
import BlankImage from '../../assets/img/blank.png'

type SelectedImageType = {
  location: string
  url: string
  width: number
  height: number
}

const selectedImageInitialState: SelectedImageType = {
  location: '',
  url: BlankImage,
  width: 1000,
  height: 1000,
}

export const Dashboard = (): ReactElement => {
  const [imageState, setImageState] = useState<Image>()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState(selectedImageInitialState)
  const location = useLocation()
  const { showErrorMessage, showSuccessMessage } = useNotification()

  let canvas: CanvasDraw | null

  useEffect(() => {
    fetchImage()
  }, [])

  useEffect(() => {
    fetchImageUrl()
  }, [imageState])

  const fetchImage = async (): Promise<void> => {
    const state = location.state as { userUid: string }

    setImageState(undefined)
    setIsLoading(true)

    if (state?.userUid) {
      try {
        const image = await fetchImageToLabel()
        setImageState(image)
      } catch (error) {
        showErrorMessage('Error fetching image')
      }
    }
    setIsLoading(false)
  }

  const fetchImageUrl = async (): Promise<void> => {
    setSelectedImage(selectedImageInitialState)
    clearCanvas()

    if (imageState) {
      setIsLoading(true)

      try {
        const imageUrl = await getImageUrl(imageState)

        setSelectedImage({
          ...selectedImage,
          url: imageUrl,
        })
      } catch (error) {
        showErrorMessage('Error loading the image')
      }

      setIsLoading(false)
    }
  }

  //TODO: Canvas is working fine but zoom in and zoom out miss don't keep image at center, workable but not great UX.
  const saveAction = () => {
    // if (canvas && sample) {
    //   const dataUri = canvas.getDataURL('png', false)
    //   await uploadImage(dataUri, sample.location, sample?.imageId, sample.maskId)
    //   getNewImage()
    //   clearAction()
    // }
    console.log('save action')
  }

  const undoAction = () => {
    if (canvas) {
      canvas.undo()
    }
  }

  const clearCanvas = () => {
    if (canvas && canvas.clear) {
      canvas.clear()
    }
  }

  const skipAction = async () => {
    try {
      if (imageState?.id) {
        setIsLoading(true)
        await skipImage(imageState.id)

        showSuccessMessage('Image skipped with success.')
        await fetchImage()
      }
    } catch (error) {
      showErrorMessage('Error skipping the image.')
    }
    setIsLoading(false)
  }

  const invalidAction = () => {
    console.log('invalid action')
  }

  const isImageLoaded = imageState && selectedImage != selectedImageInitialState

  return (
    <div className={styles.container}>
      <div className={styles.canvasContainer} style={{ opacity: isLoading ? '0.5' : '1' }}>
        <ActionToolbar clearAction={clearCanvas} undoAction={undoAction} />
        <CanvasDraw
          lazyRadius={0}
          ref={(canvasDraw) => (canvas = canvasDraw)}
          canvasWidth={selectedImage.width}
          canvasHeight={selectedImage.height}
          enablePanAndZoom={true}
          clampLinesToDocument={true}
          imgSrc={selectedImage.url}
          className={styles.canvas}
          disabled={isLoading || !isImageLoaded}
        />
      </div>
      <ImageToolbar
        saveAction={saveAction}
        invalidAction={invalidAction}
        skipAction={skipAction}
        disabled={isLoading || !isImageLoaded}
      />
      <Backdrop open={isLoading} className={styles.progressBackdrop} aria-label="Progress Bar">
        <CircularProgress />
      </Backdrop>
    </div>
  )
}
