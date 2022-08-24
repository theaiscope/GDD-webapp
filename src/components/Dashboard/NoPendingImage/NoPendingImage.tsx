import React, { ReactElement } from 'react'
import { Box, Button } from '@material-ui/core'
import { Autorenew } from '@material-ui/icons'
import styles from './NoPendingImage.module.css'

type Props = {
  onCheckAgain?: () => void
}

export const noPendingImageMessage = 'No image for relabelling was found.'

export const NoPendingImage = ({ onCheckAgain }: Props): ReactElement => {
  return (
    <Box className={styles.container}>
      <p className={styles.message}>{noPendingImageMessage}</p>
      <Button
        variant="outlined"
        color="primary"
        size="small"
        startIcon={<Autorenew />}
        className={styles.refreshButton}
        onClick={onCheckAgain}
      >
        Check again
      </Button>
    </Box>
  )
}
