import React, { ReactElement, useState, useEffect } from 'react'
import styles from './Dashboard.module.css'
import CanvasDraw from 'react-canvas-draw'
import { ActionToolbar } from './ActionToolbar/ActionToolbar'
import { ImageToolbar } from './ImageToolbar/ImageToolbar'
import { getImageUrl } from '../../services/ImageRepositoryService'
import { fetchImages, skipImage } from '../../services/ImagesService/ImagesService'
import { useLocation } from 'react-router-dom'
import Image from '../../model/image'
import useNotification from '../../services/Notification/NotificationService'

type SelectedImageType = {
  location: string
  url: string
  width: number
  height: number
}

const selectedImageInitialState: SelectedImageType = {
  location: '',
  url: '',
  width: 1000,
  height: 1000,
}

export const Dashboard = (): ReactElement => {
  const [imagesState, setImagesState] = useState<Image[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState(selectedImageInitialState)
  const location = useLocation()
  const { showErrorMessage, showSuccessMessage } = useNotification()

  let canvas: CanvasDraw | null

  useEffect(() => {
    fetchImageToLabel()
  }, [])

  useEffect(() => {
    if (imagesState.length > 0) {
      getImageUrl(imagesState[0]).then((imageUrl) => {
        setSelectedImage({
          ...selectedImage,
          url: imageUrl,
        })
      })
    }
  }, [imagesState])

  const fetchImageToLabel = async (): Promise<void> => {
    const state = location.state as { userUid: string }

    setImagesState([])
    setIsLoading(true)

    if (state?.userUid) {
      try {
        const images = await fetchImages(state.userUid)
        setImagesState(images)
      } catch (error) {
        showErrorMessage('Error fetching image')
      }
    }
    setIsLoading(false)
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

  const clearAction = () => {
    if (canvas) {
      canvas.clear()
    }
  }

  const skipAction = async () => {
    try {
      const imageId = imagesState[0].id

      if (imageId) {
        setIsLoading(true)
        await skipImage(imageId)

        showSuccessMessage('Image skipped with success.')
        await fetchImageToLabel()
      }
    } catch (error) {
      showErrorMessage('Error skipping the image.')
    } finally {
      setIsLoading(false)
    }
  }

  const invalidAction = () => {
    console.log('invalid action')
  }

  return (
    <div className={styles.container}>
      <div className={styles.canvasContainer} style={{ opacity: isLoading ? '0.5' : '1' }}>
        <ActionToolbar clearAction={clearAction} undoAction={undoAction} />
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
        showProgress={isLoading}
      />
    </div>
  )
}
