import React, { ReactElement, useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useLoading } from '../../hooks/Loading/LoadingHook'
import useNotification from '../../hooks/Notification/NotificationHook'
import { fetchImageToLabel } from '../../services/ImagesService/ImagesService'
import { ImageDraw } from './ImageDraw/ImageDraw'
import { ImageLabellingContext, ImageLabellingContextValue } from './ImageLabellingContext'
import { ActionsBar } from './ActionsBar/ActionsBar'
import { NoPendingImage } from '../Dashboard/NoPendingImage/NoPendingImage'

export const ImageLabelling = (): ReactElement => {
  const { image, setImage } = useLabellingContext()
  const [imageFound, setImageFound] = useState<boolean>()
  const [drawMaskDataURL, setDrawMaskDataURL] = useState<string>()
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
        setImageFound(image !== null && image !== undefined)
      } catch (error) {
        showErrorMessage('Error fetching image')
      }
    }
    setLoadingCompleted()
  }

  const onImageDrawChange = (drawMaskDataURL: string) => setDrawMaskDataURL(drawMaskDataURL)

  return (
    <>
      {!imageFound && <NoPendingImage />}

      {image && (
        <>
          <ImageDraw image={image} disabled={isLoading} onChange={onImageDrawChange} />
          <ActionsBar
            image={image}
            drawMaskDataURL={drawMaskDataURL}
            disabled={isLoading}
            onActionExecuted={fetchImage}
          />
        </>
      )}
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
