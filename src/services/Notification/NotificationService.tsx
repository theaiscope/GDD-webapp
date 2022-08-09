import React from 'react'
import { VariantType, useSnackbar } from 'notistack'
import { IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

export type NotificationType = VariantType

const useNotification = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const showMessage = (message: string, type: NotificationType = 'info', showCloseButton = true) => {
    enqueueSnackbar(message, {
      variant: type,
      action: showCloseButton ? closeButton : undefined,
    })
  }

  const showErrorMessage = (message: string, showCloseButton = true) => {
    showMessage(message, 'error', showCloseButton)
  }

  const showSuccessMessage = (message: string, showCloseButton = true) => {
    showMessage(message, 'success', showCloseButton)
  }

  const closeButton = (snackbarKey: string) => (
    <IconButton aria-label="close" onClick={() => closeSnackbar(snackbarKey)}>
      <CloseIcon />
    </IconButton>
  )

  return {
    showMessage,
    showErrorMessage,
    showSuccessMessage,
  }
}

export default useNotification
