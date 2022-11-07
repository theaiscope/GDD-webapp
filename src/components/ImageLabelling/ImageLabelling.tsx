import React, { ReactElement, useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useLoading } from '../../hooks/Loading/LoadingHook'
import useNotification from '../../hooks/Notification/NotificationHook'
import { fetchImageToLabel } from '../../services/ImagesService/ImagesService'
import { ImageLabellingContext, ImageLabellingContextValue } from './ImageLabellingContext'

export const ImageLabelling = (): ReactElement => {
  const { image, setImage } = useLabellingContext()
  const { setIsLoading, setLoadingCompleted } = useLoading()
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

  return <div>{image?.id}</div>
}

const useLabellingContext = (): ImageLabellingContextValue => {
  const labellingContext = useContext(ImageLabellingContext)

  if (labellingContext === undefined) {
    throw new Error('Must be used within a ImageLabellingProvider')
  }

  return labellingContext
}
