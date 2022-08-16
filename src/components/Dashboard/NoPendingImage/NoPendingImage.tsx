import React, { ReactElement } from 'react'
import { Box, Button } from '@material-ui/core'
import { Autorenew } from '@material-ui/icons'
import styles from './NoPendingImage.module.css'

export const NoPendingImage = (): ReactElement => {
  return (
    <Box className={styles.container}>
      <p className={styles.message}>No image for relabelling was found.</p>
      <Button
        variant="outlined"
        color="primary"
        size="small"
        startIcon={<Autorenew />}
        className={styles.refreshButton}
      >
        Check again
      </Button>
    </Box>
  )
}
