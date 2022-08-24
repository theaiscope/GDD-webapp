import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SnackbarProvider } from 'notistack'
import { MemoryRouter } from 'react-router-dom'
import * as ImageStorageService from '../../services/ImageStorageService/ImageStorageService'
import { MarkImageInvalidResponse } from '../../services/ImagesService/api/MarkImageInvalidApi'
import { SkipImageResponse } from '../../services/ImagesService/api/SkipImageApi'
import { SaveValidImageResponse } from '../../services/ImagesService/api/SaveValidImageApi'
import * as ImagesService from '../../services/ImagesService/ImagesService'
import { assertActionToolbarPresent } from './ActionToolbar/ActionToolbar.test.assertion'
import { Dashboard } from './Dashboard'
import { assertCanvasPresent, assertProgressBarPresent } from './Dashboard.test.assertion'
import { assertImageToolbarPresent } from './ImageToolbar/ImageToolbar.test.assertion'
import { assertNoPendingImagePresent } from './NoPendingImage/NoPendingImage.test.assertion'
import Image from '../../model/image'

describe('Dashboard', () => {
  const renderWithExistingImage = (imageId = 'image-1') => {
    jest.spyOn(ImagesService, 'fetchImageToLabel').mockResolvedValue({ id: imageId } as Image)
    jest.spyOn(ImageStorageService, 'getImageUrl').mockResolvedValue(`http://image-url/${imageId}`)

    const locationState = { userUid: 'user-1' }
    return render(
      <MemoryRouter initialEntries={[{ state: locationState }]}>
        <SnackbarProvider>
          <Dashboard />
        </SnackbarProvider>
      </MemoryRouter>,
    )
  }

  const renderWithNoImageToLabel = () => {
    jest.spyOn(ImagesService, 'fetchImageToLabel').mockResolvedValue(null)

    const locationState = { userUid: 'user-1' }
    return render(
      <MemoryRouter initialEntries={[{ state: locationState }]}>
        <SnackbarProvider>
          <Dashboard />
        </SnackbarProvider>
      </MemoryRouter>,
    )
  }

  describe('Rendering', () => {
    it('should render a No Pending Image message when no image is available', async () => {
      renderWithNoImageToLabel()

      await waitFor(() => {
        assertNoPendingImagePresent()
      })
      assertActionToolbarPresent(false)
      assertCanvasPresent(false)
      assertImageToolbarPresent(false)
    })

    it('should render a canvas when a image to label is available', async () => {
      renderWithExistingImage()

      await waitFor(() => {
        assertActionToolbarPresent()
      })
      assertImageToolbarPresent()
      assertCanvasPresent()
      assertNoPendingImagePresent(false)
    })

    it('should render the progressbar and not the content whilst fetching the data', async () => {
      renderWithNoImageToLabel()

      assertProgressBarPresent()
      assertNoPendingImagePresent(false)
      assertActionToolbarPresent(false)
      assertCanvasPresent(false)
      assertImageToolbarPresent(false)

      // Wait for the fetch to complete and check the progressbar is gone
      await waitFor(() => {
        assertProgressBarPresent(false)
      })
    })
  })

  describe('Actions', () => {
    describe('Skip', () => {
      it('should call the skip function when clicking the skip button', async () => {
        const skipImageSpy = jest.spyOn(ImagesService, 'skipImage').mockResolvedValue({} as SkipImageResponse)

        renderWithExistingImage()

        const skipButton = await screen.findByRole('button', { name: 'Skip' })
        userEvent.click(skipButton)

        await waitFor(() => {
          expect(skipImageSpy).toHaveBeenCalled()
        })
      })

      it('should show a success message when skip image succeed', async () => {
        jest.spyOn(ImagesService, 'skipImage').mockResolvedValue({} as SkipImageResponse)

        renderWithExistingImage()

        const skipButton = await screen.findByRole('button', { name: 'Skip' })
        userEvent.click(skipButton)

        expect(await screen.findByText('Image skipped with success.')).toBeInTheDocument()
      })

      it('should show an error message when skip image fails', async () => {
        jest.spyOn(ImagesService, 'skipImage').mockRejectedValue('Error skipping the image.')

        renderWithExistingImage()

        const skipButton = await screen.findByRole('button', { name: 'Skip' })
        userEvent.click(skipButton)

        expect(await screen.findByText('Error skipping the image.')).toBeInTheDocument()
      })

      it('should disable the buttons while skipping an image', async () => {
        renderWithExistingImage()

        const skipButton = await screen.findByRole('button', { name: 'Skip' })
        const invalidButton = await screen.findByRole('button', { name: 'Invalid' })
        const saveButton = await screen.findByRole('button', { name: 'Save' })

        // Check that the buttons are ENABLED
        expect(skipButton).toBeEnabled()
        expect(invalidButton).toBeEnabled()
        expect(saveButton).toBeEnabled()

        // Start skipping the image
        fireEvent.click(skipButton)

        // Check that the buttons are DISABLED
        expect(skipButton).toBeDisabled()
        expect(invalidButton).toBeDisabled()
        expect(saveButton).toBeDisabled()

        // Wait for the skip image to complete and check that the buttons are ENABLED again
        await waitFor(() => {
          expect(screen.getByRole('button', { name: 'Skip' })).toBeEnabled()
        })
        expect(screen.getByRole('button', { name: 'Invalid' })).toBeEnabled()
        expect(screen.getByRole('button', { name: 'Save' })).toBeEnabled()
      })

      it('should fetch the next image to label when skip image succeed', async () => {
        const fetchSpy = jest.spyOn(ImagesService, 'fetchImageToLabel').mockResolvedValue({ id: 'image-1' } as Image)
        jest.spyOn(ImagesService, 'skipImage').mockResolvedValue({} as SkipImageResponse)

        renderWithExistingImage()

        const skipButton = await screen.findByRole('button', { name: 'Skip' })
        userEvent.click(skipButton)

        await waitFor(() => {
          expect(fetchSpy).toHaveBeenCalledTimes(2)
        })
      })
    })

    describe('Invalid', () => {
      it('should call the markImageInvalid function when clicking the invalid button', async () => {
        const markImageInvalidSpy = jest
          .spyOn(ImagesService, 'markImageInvalid')
          .mockResolvedValue({} as MarkImageInvalidResponse)

        renderWithExistingImage()

        const invalidButton = await screen.findByRole('button', { name: 'Invalid' })
        userEvent.click(invalidButton)

        await waitFor(() => {
          expect(markImageInvalidSpy).toHaveBeenCalled()
        })
      })

      it('should show a success message when markImageInvalid succeed', async () => {
        jest.spyOn(ImagesService, 'markImageInvalid').mockResolvedValue({} as MarkImageInvalidResponse)

        renderWithExistingImage()

        const invalidButton = await screen.findByRole('button', { name: 'Invalid' })
        userEvent.click(invalidButton)

        expect(await screen.findByText('Image marked as invalid with success.')).toBeInTheDocument()
      })

      it('should show an error message when markImageInvalid image fails', async () => {
        jest.spyOn(ImagesService, 'markImageInvalid').mockRejectedValue('Error marking the image as invalid.')

        renderWithExistingImage()

        const invalidButton = await screen.findByRole('button', { name: 'Invalid' })
        userEvent.click(invalidButton)

        expect(await screen.findByText('Error marking the image as invalid.')).toBeInTheDocument()
      })

      it('should disable the buttons while marking the image as invalid', async () => {
        renderWithExistingImage()

        const invalidButton = await screen.findByRole('button', { name: 'Invalid' })
        const skipButton = await screen.findByRole('button', { name: 'Skip' })
        const saveButton = await screen.findByRole('button', { name: 'Save' })

        // Check that the buttons are ENABLED
        expect(invalidButton).toBeEnabled()
        expect(skipButton).toBeEnabled()
        expect(saveButton).toBeEnabled()

        // Start marking the image invalid
        fireEvent.click(invalidButton)

        // Check that the buttons are DISABLED
        expect(invalidButton).toBeDisabled()
        expect(skipButton).toBeDisabled()
        expect(saveButton).toBeDisabled()

        // Wait for the skip image to complete and check that the buttons are ENABLED again
        await waitFor(() => {
          expect(screen.getByRole('button', { name: 'Invalid' })).toBeEnabled()
        })
        expect(screen.getByRole('button', { name: 'Skip' })).toBeEnabled()
        expect(screen.getByRole('button', { name: 'Save' })).toBeEnabled()
      })

      it('should fetch the next image to label when markImageInvalid succeed', async () => {
        const fetchSpy = jest.spyOn(ImagesService, 'fetchImageToLabel').mockResolvedValue({ id: 'image-1' } as Image)
        jest.spyOn(ImagesService, 'markImageInvalid').mockResolvedValue({} as MarkImageInvalidResponse)

        renderWithExistingImage()

        const invalidButton = await screen.findByRole('button', { name: 'Invalid' })
        userEvent.click(invalidButton)

        await waitFor(() => {
          expect(fetchSpy).toHaveBeenCalledTimes(2)
        })
      })
    })

    describe('SaveValidImage', () => {
      it('should call the saveValidImage function when clicking the Save button', async () => {
        const saveImageSpy = jest.spyOn(ImagesService, 'saveValidImage').mockResolvedValue({} as SaveValidImageResponse)

        renderWithExistingImage()

        const saveButton = await screen.findByRole('button', { name: 'Save' })
        userEvent.click(saveButton)

        await waitFor(() => {
          expect(saveImageSpy).toHaveBeenCalled()
        })
      })

      it('should show a success message when Save image succeed', async () => {
        jest.spyOn(ImagesService, 'saveValidImage').mockResolvedValue({} as SaveValidImageResponse)

        renderWithExistingImage()

        const saveButton = await screen.findByRole('button', { name: 'Save' })
        userEvent.click(saveButton)

        expect(await screen.findByText('Image saved with success.')).toBeInTheDocument()
      })

      it('should show an error message when Save image fails', async () => {
        jest.spyOn(ImagesService, 'saveValidImage').mockRejectedValue('Error saving the image.')

        renderWithExistingImage()

        const saveButton = await screen.findByRole('button', { name: 'Save' })
        userEvent.click(saveButton)

        expect(await screen.findByText('Error saving the image.')).toBeInTheDocument()
      })

      it('should disable the buttons while saving the image', async () => {
        renderWithExistingImage()

        const saveButton = await screen.findByRole('button', { name: 'Save' })
        const skipButton = await screen.findByRole('button', { name: 'Skip' })
        const invalidButton = await screen.findByRole('button', { name: 'Invalid' })

        // Check that the buttons are ENABLED
        expect(saveButton).toBeEnabled()
        expect(skipButton).toBeEnabled()
        expect(invalidButton).toBeEnabled()

        // Start saving the image
        fireEvent.click(saveButton)

        // Check that the buttons are DISABLED
        expect(saveButton).toBeDisabled()
        expect(skipButton).toBeDisabled()
        expect(invalidButton).toBeDisabled()

        // Wait for the save image to complete and check that the buttons are ENABLED again
        await waitFor(() => {
          expect(screen.getByRole('button', { name: 'Save' })).toBeEnabled()
        })
        expect(screen.getByRole('button', { name: 'Skip' })).toBeEnabled()
        expect(screen.getByRole('button', { name: 'Invalid' })).toBeEnabled()
      })

      it('should fetch the next image to label when save image succeed', async () => {
        const fetchSpy = jest.spyOn(ImagesService, 'fetchImageToLabel').mockResolvedValue({ id: 'image-1' } as Image)
        jest.spyOn(ImagesService, 'saveValidImage').mockResolvedValue({} as SaveValidImageResponse)

        renderWithExistingImage()

        const saveButton = await screen.findByRole('button', { name: 'Save' })
        userEvent.click(saveButton)

        await waitFor(() => {
          expect(fetchSpy).toHaveBeenCalledTimes(2)
        })
      })
    })
  })
})
