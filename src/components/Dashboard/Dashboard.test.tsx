import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import { Dashboard } from './Dashboard'
import * as ImagesService from '../../services/ImagesService/ImagesService'
import * as ImageRepositoryService from '../../services/ImageRepositoryService'
import { SkipImageResponse } from '../../services/ImagesService/api/SkipImageApi'
import { SnackbarProvider } from 'notistack'
import { MarkImageInvalidResponse } from '../../services/ImagesService/api/MarkImageInvalidApi'

describe('Dashboard', () => {
  describe('Canvas', () => {
    it('should shown a canvas', () => {
      render(
        <BrowserRouter>
          <SnackbarProvider>
            <Dashboard />
          </SnackbarProvider>
        </BrowserRouter>,
      )

      const canvasTagMatcher = (_content: string, element: Element | null) =>
        element?.tagName.toLowerCase() === 'canvas'

      const myCanvas = screen.getAllByText(canvasTagMatcher)
      expect(myCanvas.length).toBeGreaterThan(0)
    })
  })

  describe('Actions', () => {
    describe('Skip', () => {
      it('should call the skip function when clicking the skip button', async () => {
        const imageId = 'image-1'

        jest.spyOn(ImagesService, 'fetchImageToLabel').mockResolvedValue({ id: imageId })
        jest.spyOn(ImageRepositoryService, 'getImageUrl').mockResolvedValue('http://image-url')
        const skipImageSpy = jest.spyOn(ImagesService, 'skipImage').mockResolvedValue({} as SkipImageResponse)

        const locationState = { userUid: 'user-1' }
        render(
          <MemoryRouter initialEntries={[{ state: locationState }]}>
            <SnackbarProvider>
              <Dashboard />
            </SnackbarProvider>
          </MemoryRouter>,
        )

        const skipButton = await screen.findByRole('button', { name: 'Skip' })
        userEvent.click(skipButton)

        await waitFor(() => {
          expect(skipImageSpy).toHaveBeenCalledWith(imageId)
        })
      })

      it('should show a success message when skip image succeed', async () => {
        jest.spyOn(ImagesService, 'fetchImageToLabel').mockResolvedValue({ id: 'image-1' })
        jest.spyOn(ImagesService, 'skipImage').mockResolvedValue({} as SkipImageResponse)
        jest.spyOn(ImageRepositoryService, 'getImageUrl').mockResolvedValue('http://image-url')

        const locationState = { userUid: 'user-1' }
        render(
          <MemoryRouter initialEntries={[{ state: locationState }]}>
            <SnackbarProvider>
              <Dashboard />
            </SnackbarProvider>
          </MemoryRouter>,
        )

        const skipButton = await screen.findByRole('button', { name: 'Skip' })
        userEvent.click(skipButton)

        expect(await screen.findByText('Image skipped with success.')).toBeInTheDocument()
      })

      it('should show an error message when skip image fails', async () => {
        jest.spyOn(ImagesService, 'fetchImageToLabel').mockResolvedValue({ id: 'image-1' })
        jest.spyOn(ImagesService, 'skipImage').mockRejectedValue('Error skipping the image.')
        jest.spyOn(ImageRepositoryService, 'getImageUrl').mockResolvedValue('http://image-url')

        const locationState = { userUid: 'user-1' }
        render(
          <MemoryRouter initialEntries={[{ state: locationState }]}>
            <SnackbarProvider>
              <Dashboard />
            </SnackbarProvider>
          </MemoryRouter>,
        )

        const skipButton = await screen.findByRole('button', { name: 'Skip' })
        userEvent.click(skipButton)

        expect(await screen.findByText('Error skipping the image.')).toBeInTheDocument()
      })

      it('should disable the buttons while skipping an image', async () => {
        jest.spyOn(ImagesService, 'fetchImageToLabel').mockResolvedValue({ id: 'image-1' })
        jest.spyOn(ImagesService, 'skipImage').mockRejectedValue('Error skipping the image.')
        jest.spyOn(ImageRepositoryService, 'getImageUrl').mockResolvedValue('http://image-url')

        const locationState = { userUid: 'user-1' }
        render(
          <MemoryRouter initialEntries={[{ state: locationState }]}>
            <SnackbarProvider>
              <Dashboard />
            </SnackbarProvider>
          </MemoryRouter>,
        )

        const skipButton = await screen.findByRole('button', { name: 'Skip' })
        const invalidButton = await screen.findByRole('button', { name: 'Invalid' })
        const saveButton = await screen.findByRole('button', { name: 'Save' })

        // Start skipping the image
        userEvent.click(skipButton)

        // Check that the buttons are DISABLED before the skip action is completed
        expect(skipButton).toHaveAttribute('disabled')
        expect(saveButton).toHaveAttribute('disabled')
        expect(invalidButton).toHaveAttribute('disabled')

        // Wait for the skip action to be completed and
        // check that the buttons are ENABLED
        await waitFor(() => {
          expect(skipButton).not.toHaveAttribute('disabled')
        })
        expect(saveButton).not.toHaveAttribute('disabled')
        expect(invalidButton).not.toHaveAttribute('disabled')
      })

      it('should fetch the next image to label when skip image succeed', async () => {
        const fetchSpy = jest.spyOn(ImagesService, 'fetchImageToLabel').mockResolvedValue({ id: 'image-1' })
        jest.spyOn(ImagesService, 'skipImage').mockResolvedValue({} as SkipImageResponse)
        jest.spyOn(ImageRepositoryService, 'getImageUrl').mockResolvedValue('http://image-url')

        const locationState = { userUid: 'user-1' }
        render(
          <MemoryRouter initialEntries={[{ state: locationState }]}>
            <SnackbarProvider>
              <Dashboard />
            </SnackbarProvider>
          </MemoryRouter>,
        )

        const skipButton = await screen.findByRole('button', { name: 'Skip' })
        userEvent.click(skipButton)

        await waitFor(() => {
          expect(fetchSpy).toHaveBeenCalledTimes(2)
        })
      })
    })

    describe('Invalid', () => {
      it('should call the markImageInvalid function when clicking the invalid button', async () => {
        const imageId = 'image-1'

        jest.spyOn(ImagesService, 'fetchImageToLabel').mockResolvedValue({ id: imageId })
        jest.spyOn(ImageRepositoryService, 'getImageUrl').mockResolvedValue('http://image-url')
        const markImageInvalidSpy = jest
          .spyOn(ImagesService, 'markImageInvalid')
          .mockResolvedValue({} as MarkImageInvalidResponse)

        const locationState = { userUid: 'user-1' }
        render(
          <MemoryRouter initialEntries={[{ state: locationState }]}>
            <SnackbarProvider>
              <Dashboard />
            </SnackbarProvider>
          </MemoryRouter>,
        )

        const invalidButton = await screen.findByRole('button', { name: 'Invalid' })
        userEvent.click(invalidButton)

        await waitFor(() => {
          expect(markImageInvalidSpy).toHaveBeenCalledWith(imageId)
        })
      })

      it('should show a success message when markImageInvalid succeed', async () => {
        jest.spyOn(ImagesService, 'fetchImageToLabel').mockResolvedValue({ id: 'image-1' })
        jest.spyOn(ImagesService, 'markImageInvalid').mockResolvedValue({} as MarkImageInvalidResponse)
        jest.spyOn(ImageRepositoryService, 'getImageUrl').mockResolvedValue('http://image-url')

        const locationState = { userUid: 'user-1' }
        render(
          <MemoryRouter initialEntries={[{ state: locationState }]}>
            <SnackbarProvider>
              <Dashboard />
            </SnackbarProvider>
          </MemoryRouter>,
        )

        const invalidButton = await screen.findByRole('button', { name: 'Invalid' })
        userEvent.click(invalidButton)

        expect(await screen.findByText('Image marked as invalid with success.')).toBeInTheDocument()
      })

      it('should show an error message when markImageInvalid image fails', async () => {
        jest.spyOn(ImagesService, 'fetchImageToLabel').mockResolvedValue({ id: 'image-1' })
        jest.spyOn(ImagesService, 'markImageInvalid').mockRejectedValue('Error marking the image as invalid.')
        jest.spyOn(ImageRepositoryService, 'getImageUrl').mockResolvedValue('http://image-url')

        const locationState = { userUid: 'user-1' }
        render(
          <MemoryRouter initialEntries={[{ state: locationState }]}>
            <SnackbarProvider>
              <Dashboard />
            </SnackbarProvider>
          </MemoryRouter>,
        )

        const invalidButton = await screen.findByRole('button', { name: 'Invalid' })
        userEvent.click(invalidButton)

        expect(await screen.findByText('Error marking the image as invalid.')).toBeInTheDocument()
      })

      it('should disable the buttons while marking the image as invalid', async () => {
        jest.spyOn(ImagesService, 'fetchImageToLabel').mockResolvedValue({ id: 'image-1' })
        jest.spyOn(ImagesService, 'markImageInvalid').mockResolvedValue({} as MarkImageInvalidResponse)
        jest.spyOn(ImageRepositoryService, 'getImageUrl').mockResolvedValue('http://image-url')

        const locationState = { userUid: 'user-1' }
        render(
          <MemoryRouter initialEntries={[{ state: locationState }]}>
            <SnackbarProvider>
              <Dashboard />
            </SnackbarProvider>
          </MemoryRouter>,
        )

        const skipButton = await screen.findByRole('button', { name: 'Skip' })
        const invalidButton = await screen.findByRole('button', { name: 'Invalid' })
        const saveButton = await screen.findByRole('button', { name: 'Save' })

        // Start marking the image as invalid
        userEvent.click(invalidButton)

        // Check that the buttons are DISABLED before the markImageInvalid action is completed
        expect(invalidButton).toHaveAttribute('disabled')
        expect(skipButton).toHaveAttribute('disabled')
        expect(saveButton).toHaveAttribute('disabled')

        // Wait for the markImageInvalid action to complete and
        // check that the buttons are ENABLED
        await waitFor(() => {
          expect(invalidButton).not.toHaveAttribute('disabled')
        })
        expect(skipButton).not.toHaveAttribute('disabled')
        expect(saveButton).not.toHaveAttribute('disabled')
      })

      it('should fetch the next image to label when markImageInvalid succeed', async () => {
        const fetchSpy = jest.spyOn(ImagesService, 'fetchImageToLabel').mockResolvedValue({ id: 'image-1' })
        jest.spyOn(ImagesService, 'markImageInvalid').mockResolvedValue({} as MarkImageInvalidResponse)
        jest.spyOn(ImageRepositoryService, 'getImageUrl').mockResolvedValue('http://image-url')

        const locationState = { userUid: 'user-1' }
        render(
          <MemoryRouter initialEntries={[{ state: locationState }]}>
            <SnackbarProvider>
              <Dashboard />
            </SnackbarProvider>
          </MemoryRouter>,
        )

        const invalidButton = await screen.findByRole('button', { name: 'Invalid' })
        userEvent.click(invalidButton)

        await waitFor(() => {
          expect(fetchSpy).toHaveBeenCalledTimes(2)
        })
      })
    })
  })

  describe('ProgressBar', () => {
    it('should show a progressBar while isLoading', async () => {
      jest.spyOn(ImagesService, 'fetchImageToLabel').mockResolvedValue({ id: 'image-1' })
      jest.spyOn(ImageRepositoryService, 'getImageUrl').mockResolvedValue('http://image-url')

      const locationState = { userUid: 'user-1' }
      render(
        <MemoryRouter initialEntries={[{ state: locationState }]}>
          <SnackbarProvider>
            <Dashboard />
          </SnackbarProvider>
        </MemoryRouter>,
      )

      // Before awaiting the fetchImage, the progressBar should be visible
      expect(screen.getByLabelText('Progress Bar')).toBeVisible()

      // After awaiting the fetchImage, the progressBar should be hidden
      expect(await screen.findByLabelText('Progress Bar')).not.toBeVisible()
    })
  })
})
