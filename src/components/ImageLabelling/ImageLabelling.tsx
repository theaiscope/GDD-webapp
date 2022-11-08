import React, { ReactElement, useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useLoading } from '../../hooks/Loading/LoadingHook'
import useNotification from '../../hooks/Notification/NotificationHook'
import { fetchImageToLabel } from '../../services/ImagesService/ImagesService'
import { ImageDraw } from './ImageDraw/ImageDraw'
import { ImageLabellingContext, ImageLabellingContextValue } from './ImageLabellingContext'
import { ActionsBar } from './ActionsBar/ActionsBar'

export const ImageLabelling = (): ReactElement => {
  const { image, setImage } = useLabellingContext()
  const { isLoading, setIsLoading, setLoadingCompleted } = useLoading()
  const { showErrorMessage } = useNotification()
  const location = useLocation()

  useEffect(() => {
    fetchImage()
  }, [])

  const fetchImage = async (): Promise<void> => {
    const state = location.state as { userUid: string }

    setImage(undefined)
    setIsLoading()

    if (state?.userUid) {
      try {
        const image = await fetchImageToLabel()
        setImage(image)
      } catch (error) {
        showErrorMessage('Error fetching image')
      }
    }
    setLoadingCompleted()
  }

  return (
    <>
      <ImageDraw image={image} disabled={isLoading} />
      <ActionsBar image={image} disabled={isLoading} />
    </>
  )
}

const useLabellingContext = (): ImageLabellingContextValue => {
  const labellingContext = useContext(ImageLabellingContext)

  if (labellingContext === undefined) {
    throw new Error('Must be used within a ImageLabellingProvider')
  }

  return labellingContext
}