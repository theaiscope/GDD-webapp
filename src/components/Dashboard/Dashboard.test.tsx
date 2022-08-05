import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import { Dashboard } from './Dashboard'
import * as ImagesService from '../../services/ImagesService/ImagesService'
import * as ImageRepositoryService from '../../services/ImageRepositoryService'
import { SkipImageResponse } from '../../services/ImagesService/api/SkipImageApi'
import { SnackbarProvider } from 'notistack'

describe('Dashboard', () => {
  it('should shown a canvas', () => {
    render(
      <BrowserRouter>
        <SnackbarProvider>
          <Dashboard />
        </SnackbarProvider>
      </BrowserRouter>,
    )

    const canvasTagMatcher = (_content: string, element: Element | null) => element?.tagName.toLowerCase() === 'canvas'

    const myCanvas = screen.getAllByText(canvasTagMatcher)
    expect(myCanvas.length).toBeGreaterThan(0)
  })

  it('should call the skip function when clicking the skip button', async () => {
    const imageId = 'image-1'

    jest.spyOn(ImagesService, 'fetchImages').mockResolvedValue([{ id: imageId }])
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

  it('should show a success message when skipping an image', async () => {
    jest.spyOn(ImagesService, 'fetchImages').mockResolvedValue([{ id: 'image-1' }])
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

  it('should show an error message when skipping an image fails', async () => {
    jest.spyOn(ImagesService, 'fetchImages').mockResolvedValue([{ id: 'image-1' }])
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
    jest.spyOn(ImagesService, 'fetchImages').mockResolvedValue([{ id: 'image-1' }])
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
})
