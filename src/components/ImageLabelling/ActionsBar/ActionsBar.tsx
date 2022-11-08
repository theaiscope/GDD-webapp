import React, { ReactElement } from 'react'
import { useLoading } from '../../../hooks/Loading/LoadingHook'
import useNotification from '../../../hooks/Notification/NotificationHook'
import Image from '../../../model/image'
import { skipImage } from '../../../services/ImagesService/ImagesService'
import styles from './ActionsBar.module.css'

type Props = {
  image?: Image
  disabled?: boolean
}

export const ActionsBar = ({ image = undefined, disabled = false }: Props): ReactElement => {
  const { isLoading, setIsLoading, setLoadingCompleted } = useLoading()
  const { showErrorMessage, showSuccessMessage } = useNotification()

  const markImageInvalid = (): void => {
    console.log('markImageInvalid')
  }

  const onSkipImage = async (): Promise<void> => {
    if (image?.id) {
      setIsLoading()
      try {
        await skipImage(image.id)
        showSuccessMessage('Image skipped with success.')
      } catch (error) {
        showErrorMessage('Error skipping the image.')
      }
      setLoadingCompleted()
    }
  }

  const saveImage = (): void => {
    console.log('saveImage')
  }

  const disableButtons = disabled || isLoading
  return (
    <div className={styles.container}>
      <button className={styles.invalid} onClick={markImageInvalid} disabled={disableButtons}>
        Invalid
      </button>
      <button className={styles.skip} onClick={onSkipImage} disabled={disableButtons}>
        Skip
      </button>
      <button className={styles.save} onClick={saveImage} disabled={disableButtons}>
        Save
      </button>
    </div>
  )
}
