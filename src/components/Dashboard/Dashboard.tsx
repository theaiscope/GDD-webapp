import React, { ReactElement, useState, useEffect } from 'react'
import styles from './Dashboard.module.css'
import CanvasDraw from 'react-canvas-draw'
import { ActionToolbar } from './ActionToolbar/ActionToolbar'
import { ImageToolbar } from './ImageToolbar/ImageToolbar'
import { getImageUrl } from '../../services/ImageStorageService/ImageStorageService'
import {
  fetchImageToLabel,
  markImageInvalid,
  saveValidImage,
  skipImage,
} from '../../services/ImagesService/ImagesService'
import { useLocation } from 'react-router-dom'
import Image from '../../model/image'
import useNotification from '../../hooks/Notification/NotificationHook'
import { Backdrop, CircularProgress } from '@material-ui/core'
import BlankImage from '../../assets/img/blank.png'
import { NoPendingImage } from './NoPendingImage/NoPendingImage'

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
  const [imageState, setImageState] = useState<Image | null>()
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

  const undoCanvasAction = () => {
    if (canvas) {
      canvas.undo()
    }
  }

  const clearCanvas = () => {
    if (canvas && canvas.clear) {
      canvas.clear()
    }
  }

  const saveAction = async () => {
    try {
      if (imageState && canvas) {
        setIsLoading(true)

        const maskImageData = canvas.getDataURL('png', false)
        await saveValidImage(imageState, maskImageData)

        showSuccessMessage('Image saved with success.')
        await fetchImage()
      }
    } catch (error) {
      showErrorMessage('Error saving the image.')
    }
    setIsLoading(false)
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

  const invalidAction = async () => {
    try {
      if (imageState?.id) {
        setIsLoading(true)
        await markImageInvalid(imageState.id)

        showSuccessMessage('Image marked as invalid with success.')
        await fetchImage()
      }
    } catch (error) {
      showErrorMessage('Error marking the image as invalid.')
    }
    setIsLoading(false)
  }

  const isImageLoaded = imageState && selectedImage != selectedImageInitialState

  return (
    <>
      <div className={styles.dashboardContainer}>
        {!isLoading && imageState === null && <NoPendingImage onCheckAgain={fetchImage} />}

        {isImageLoaded && (
          <>
            <div className={styles.canvasContainer}>
              <ActionToolbar clearAction={clearCanvas} undoAction={undoCanvasAction} />
              <CanvasDraw
                lazyRadius={0}
                ref={(canvasDraw) => (canvas = canvasDraw)}
                canvasWidth={selectedImage.width}
                canvasHeight={selectedImage.height}
                enablePanAndZoom={true}
                clampLinesToDocument={true}
                imgSrc={selectedImage.url}
                className={styles.canvas}
                disabled={isLoading}
              />
            </div>
            <ImageToolbar
              saveAction={saveAction}
              invalidAction={invalidAction}
              skipAction={skipAction}
              disabled={isLoading}
            />
          </>
        )}
      </div>

      <Backdrop open={isLoading} className={styles.progressBackdrop} aria-label="Progress Bar">
        <CircularProgress />
      </Backdrop>
    </>
  )
}

// TODO: - Move the progressbar to the application level
// TODO: - Create a ImageLabeller component
// TODO: - Update the Dashboard to use ImageLabeller
// TODO: - Move the image being labelled to a Context
// TODO: - Create a 'pages' folder
