import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SnackbarProvider } from 'notistack'
import Image from '../../../model/image'
import { LoadingProvider } from '../../../providers/Loading/LoadingProvider'
import { SkipImageResponse } from '../../../services/ImagesService/api/SkipImageApi'
import * as ImagesService from '../../../services/ImagesService/ImagesService'
import { ActionsBar } from './ActionsBar'
import { SaveValidImageResponse } from '../../../services/ImagesService/api/SaveValidImageApi'

describe(ActionsBar, () => {
  describe('Skip', () => {
    it('should render the Skip button', () => {
      renderActionsBar()

      expect(screen.getByRole('button', { name: 'Skip' })).toBeInTheDocument()
    })

    it('should disable the Skip button', () => {
      renderActionsBar({ disabled: true })

      expect(screen.getByRole('button', { name: 'Skip' })).toBeDisabled()
    })

    it('should call the skip function when clicking the skip button', async () => {
      const skipImageSpy = jest.spyOn(ImagesService, 'skipImage').mockResolvedValue({} as SkipImageResponse)

      renderActionsBarWithImage()

      const skipButton = await screen.findByRole('button', { name: 'Skip' })
      userEvent.click(skipButton)

      await waitFor(() => {
        expect(skipImageSpy).toHaveBeenCalled()
      })
    })

    it('should show a success message when skip image succeed', async () => {
      jest.spyOn(ImagesService, 'skipImage').mockResolvedValue({} as SkipImageResponse)

      renderActionsBarWithImage()

      const skipButton = await screen.findByRole('button', { name: 'Skip' })
      userEvent.click(skipButton)

      expect(await screen.findByText('Image skipped with success.')).toBeInTheDocument()
    })

    it('should show an error message when skip image fails', async () => {
      jest.spyOn(ImagesService, 'skipImage').mockRejectedValue('Error skipping the image.')

      renderActionsBarWithImage()

      const skipButton = await screen.findByRole('button', { name: 'Skip' })
      userEvent.click(skipButton)

      expect(await screen.findByText('Error skipping the image.')).toBeInTheDocument()
    })

    it('should disable and show a progressbar while skipping an image', async () => {
      renderActionsBarWithImage()

      const skipButton = await screen.findByRole('button', { name: 'Skip' })
      const invalidButton = await screen.findByRole('button', { name: 'Invalid' })
      const saveButton = await screen.findByRole('button', { name: 'Save' })

      // Start skipping the image
      userEvent.click(skipButton)

      // Check that the buttons are DISABLED
      expect(skipButton).toBeDisabled()
      expect(invalidButton).toBeDisabled()
      expect(saveButton).toBeDisabled()

      // Check that the ProgressBar is displayed
      expect(screen.getByRole('progressbar', { hidden: true })).toBeVisible()

      // Wait for the skip image to complete and check that the buttons are ENABLED again
      // and the progressbar is not displayed
      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Skip' })).toBeEnabled()
      })
      expect(screen.getByRole('button', { name: 'Invalid' })).toBeEnabled()
      expect(screen.getByRole('button', { name: 'Save' })).toBeEnabled()
      expect(screen.getByRole('progressbar', { hidden: true })).not.toBeVisible()
    })
  })

  describe('Save', () => {
    it('should render the Save button', () => {
      renderActionsBar()

      expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument()
    })

    it('should disable the Save button', () => {
      renderActionsBar({ disabled: true })

      expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled()
    })

    it('should call the save function when clicking the save button', async () => {
      const saveImageSpy = jest.spyOn(ImagesService, 'saveValidImage').mockResolvedValue({} as SaveValidImageResponse)
      renderActionsBarWithImage()

      const saveButton = await screen.findByRole('button', { name: 'Save' })
      userEvent.click(saveButton)

      await waitFor(() => {
        expect(saveImageSpy).toHaveBeenCalled()
      })
    })

    it('should show a success message when save image succeed', async () => {
      jest.spyOn(ImagesService, 'saveValidImage').mockResolvedValue({} as SaveValidImageResponse)

      renderActionsBarWithImage()

      const saveButton = await screen.findByRole('button', { name: 'Save' })
      userEvent.click(saveButton)

      expect(await screen.findByText('Image saved with success.')).toBeInTheDocument()
    })

    it('should show an error message when save image fails', async () => {
      jest.spyOn(ImagesService, 'saveValidImage').mockRejectedValue('Error saving the image.')

      renderActionsBarWithImage()

      const saveButton = await screen.findByRole('button', { name: 'Save' })
      userEvent.click(saveButton)

      expect(await screen.findByText('Error saving the image.')).toBeInTheDocument()
    })

    it('should disable and show a progressbar while saving image', async () => {
      renderActionsBarWithImage()

      const skipButton = await screen.findByRole('button', { name: 'Skip' })
      const invalidButton = await screen.findByRole('button', { name: 'Invalid' })
      const saveButton = await screen.findByRole('button', { name: 'Save' })

      // Start saving the image
      userEvent.click(saveButton)

      // Check that the buttons are DISABLED
      expect(skipButton).toBeDisabled()
      expect(invalidButton).toBeDisabled()
      expect(saveButton).toBeDisabled()

      // Check that the ProgressBar is displayed
      expect(screen.getByRole('progressbar', { hidden: true })).toBeVisible()

      // Wait for the save image to complete and check that the buttons are ENABLED again
      // and the progressbar is not displayed
      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Skip' })).toBeEnabled()
      })
      expect(screen.getByRole('button', { name: 'Invalid' })).toBeEnabled()
      expect(screen.getByRole('button', { name: 'Save' })).toBeEnabled()
      expect(screen.getByRole('progressbar', { hidden: true })).not.toBeVisible()
    })
  })

  describe('MarkAsInvalid', () => {
    it('should render the Invalid button', () => {
      renderActionsBar()

      expect(screen.getByRole('button', { name: 'Invalid' })).toBeInTheDocument()
    })

    it('should disable the Invalid button', () => {
      renderActionsBar({ disabled: true })

      expect(screen.getByRole('button', { name: 'Invalid' })).toBeDisabled()
    })
  })

  const renderActionsBarWithImage = () =>
    renderActionsBar({
      image: {
        id: 'image-id',
        name: 'image-name',
        sampleLocation: 'sample-location',
      },
      drawMaskDataURL: 'png://draw-mask-data-url',
    })

  const renderActionsBar = ({
    image,
    drawMaskDataURL,
    disabled = false,
  }: { image?: Image; drawMaskDataURL?: string; disabled?: boolean } = {}) =>
    render(
      <SnackbarProvider>
        <LoadingProvider>
          <ActionsBar image={image} drawMaskDataURL={drawMaskDataURL} disabled={disabled} />
        </LoadingProvider>
      </SnackbarProvider>,
    )
})
