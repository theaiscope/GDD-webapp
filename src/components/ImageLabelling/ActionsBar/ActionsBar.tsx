import React, { ReactElement } from 'react'
import { useLoading } from '../../../hooks/Loading/LoadingHook'
import useNotification from '../../../hooks/Notification/NotificationHook'
import Image from '../../../model/image'
import { markImageInvalid, saveValidImage, skipImage } from '../../../services/ImagesService/ImagesService'
import styles from './ActionsBar.module.css'

type Props = {
  image?: Image
  drawMaskDataURL?: string
  disabled?: boolean
}

export const ActionsBar = ({ image, drawMaskDataURL, disabled = false }: Props): ReactElement => {
  const { isLoading, setIsLoading, setLoadingCompleted } = useLoading()
  const { showErrorMessage, showSuccessMessage } = useNotification()

  const onSkipImage = async (): Promise<void> => {
    if (image?.id) {
      setIsLoading()
      try {
        await skipImage(image.id)
        showSuccessMessage('Image skipped with success.')
      } catch (error) {
        showErrorMessage('Error skipping the image.')
      } finally {
        setLoadingCompleted()
      }
    }
  }

  const onSaveValidImage = async (): Promise<void> => {
    if (image && drawMaskDataURL) {
      setIsLoading()

      try {
        await saveValidImage(image, drawMaskDataURL)

        showSuccessMessage('Image saved with success.')
      } catch (error) {
        showErrorMessage('Error saving the image.')
      } finally {
        setLoadingCompleted()
      }
    }
  }

  const onMarkImageInvalid = async (): Promise<void> => {
    if (image?.id) {
      try {
        setIsLoading()
        await markImageInvalid(image.id)

        showSuccessMessage('Image marked as invalid with success.')
      } catch (error) {
        showErrorMessage('Error marking the image as invalid.')
      } finally {
        setLoadingCompleted()
      }
    }
  }

  const disableButtons = disabled || isLoading
  return (
    <div className={styles.container}>
      <button className={styles.invalid} onClick={onMarkImageInvalid} disabled={disableButtons}>
        Invalid
      </button>
      <button className={styles.skip} onClick={onSkipImage} disabled={disableButtons}>
        Skip
      </button>
      <button className={styles.save} onClick={onSaveValidImage} disabled={disableButtons}>
        Save
      </button>
    </div>
  )
}
