import React, { useEffect, useState } from 'react'
import { ReactElement } from 'react'
import CanvasDraw from 'react-canvas-draw'
import { useLoading } from '../../../hooks/Loading/LoadingHook'
import useNotification from '../../../hooks/Notification/NotificationHook'
import Image from '../../../model/image'
import { getImageUrl } from '../../../services/ImageStorageService/ImageStorageService'
import { DrawToolbar } from '../DrawToolbar/DrawToolbar'
import styles from './ImageDraw.module.css'

enum DEFAULT_PARAMS {
  CANVAS_WIDTH = 1000,
  CANVAS_HEIGHT = 1000,
}

type Props = {
  image?: Image
  disabled?: boolean
  onChange?: (drawMaskDataURL: string) => void
}

export const ImageDraw = ({ image, disabled = false, onChange }: Props): ReactElement => {
  const [imageUrl, setImageUrl] = useState<string>()
  const [canvas, setCanvas] = useState<CanvasDraw>()
  const { isLoading, setIsLoading, setLoadingCompleted } = useLoading()
  const { showErrorMessage } = useNotification()

  useEffect(() => {
    fetchImageUrl()
  }, [])

  const fetchImageUrl = async (): Promise<void> => {
    canvas?.clear()

    if (image) {
      setIsLoading()

      try {
        const imageUrl = await getImageUrl(image)
        setImageUrl(imageUrl)
      } catch (error) {
        showErrorMessage('Error loading the image')
      }

      setLoadingCompleted()
    }
  }

  const disableControls = disabled || isLoading

  const onChangeCanvasDraw = (canvas: CanvasDraw) => onChange?.(canvas?.getDataURL('png', false))

  return (
    <div className={styles.imageDrawContainer}>
      <DrawToolbar canvas={canvas} disabled={disableControls} />
      <CanvasDraw
        lazyRadius={0}
        ref={(canvasDraw: CanvasDraw) => setCanvas(canvasDraw)}
        canvasWidth={DEFAULT_PARAMS.CANVAS_WIDTH}
        canvasHeight={DEFAULT_PARAMS.CANVAS_HEIGHT}
        enablePanAndZoom={true}
        clampLinesToDocument={true}
        imgSrc={imageUrl}
        className={styles.canvas}
        disabled={disabled}
        onChange={onChangeCanvasDraw}
      />
    </div>
  )
}
