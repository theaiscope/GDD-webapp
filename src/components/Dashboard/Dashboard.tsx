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
import BlankImage from '../../assets/img/blank.png'
import { NoPendingImage } from './NoPendingImage/NoPendingImage'
import { useLoading } from '../../hooks/Loading/LoadingHook'
import { ImageLabelling } from '../ImageLabelling/ImageLabelling'
import { ImageLabellingProvider } from '../ImageLabelling/ImageLabellingContext'

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
  const [selectedImage, setSelectedImage] = useState(selectedImageInitialState)
  const location = useLocation()
  const { showErrorMessage, showSuccessMessage } = useNotification()
  const { isLoading, setIsLoading, setLoadingCompleted } = useLoading()

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
    setIsLoading()

    if (state?.userUid) {
      try {
        const image = await fetchImageToLabel()
        setImageState(image)
      } catch (error) {
        showErrorMessage('Error fetching image')
      }
    }
    setLoadingCompleted()
  }

  const fetchImageUrl = async (): Promise<void> => {
    setSelectedImage(selectedImageInitialState)
    clearCanvas()

    if (imageState) {
      setIsLoading()

      try {
        const imageUrl = await getImageUrl(imageState)

        setSelectedImage({
          ...selectedImage,
          url: imageUrl,
        })
      } catch (error) {
        showErrorMessage('Error loading the image')
      }

      setLoadingCompleted()
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
        setIsLoading()

        const maskImageData = canvas.getDataURL('png', false)
        await saveValidImage(imageState, maskImageData)

        showSuccessMessage('Image saved with success.')
        await fetchImage()
      }
    } catch (error) {
      showErrorMessage('Error saving the image.')
    }
    setLoadingCompleted()
  }

  const skipAction = async () => {
    try {
      if (imageState?.id) {
        setIsLoading()
        await skipImage(imageState.id)

        showSuccessMessage('Image skipped with success.')
        await fetchImage()
      }
    } catch (error) {
      showErrorMessage('Error skipping the image.')
    }
    setLoadingCompleted()
  }

  const invalidAction = async () => {
    try {
      if (imageState?.id) {
        setIsLoading()
        await markImageInvalid(imageState.id)

        showSuccessMessage('Image marked as invalid with success.')
        await fetchImage()
      }
    } catch (error) {
      showErrorMessage('Error marking the image as invalid.')
    }
    setLoadingCompleted()
  }

  const isImageLoaded = imageState && selectedImage != selectedImageInitialState

  return (
    <>
      <div className={styles.dashboardContainer}>
        <ImageLabellingProvider>
          <ImageLabelling />
        </ImageLabellingProvider>

        {!isLoading && imageState === undefined && <NoPendingImage onCheckAgain={fetchImage} />}

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
    </>
  )
}

// TODO: - Move the progressbar to the application level
// TODO: - Create a ImageLabeller component
// TODO: - Update the Dashboard to use ImageLabeller
// TODO: - Move the image being labelled to a Context
// TODO: - Create a 'pages' folder
