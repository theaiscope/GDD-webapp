import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import { Dashboard } from './Dashboard'
import * as ImagesService from '../../services/ImagesService/ImagesService'
import userEvent from '@testing-library/user-event'
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
    const skipImageSpy = jest.spyOn(ImagesService, 'skipImage').mockResolvedValue({} as SkipImageResponse)

    const locationState = { userUid: 'user-1' }
    render(
      <MemoryRouter initialEntries={[{ state: locationState }]}>
        <SnackbarProvider>
          <Dashboard />
        </SnackbarProvider>
      </MemoryRouter>,
    )

    const skipButton = await screen.findByText('Skip')
    userEvent.click(skipButton)

    expect(skipImageSpy).toHaveBeenCalledWith(imageId)
  })

  it('should show a success message when skipping an image', async () => {
    jest.spyOn(ImagesService, 'fetchImages').mockResolvedValue([{ id: 'image-1' }])
    jest.spyOn(ImagesService, 'skipImage').mockResolvedValue({} as SkipImageResponse)

    const locationState = { userUid: 'user-1' }
    render(
      <MemoryRouter initialEntries={[{ state: locationState }]}>
        <SnackbarProvider>
          <Dashboard />
        </SnackbarProvider>
      </MemoryRouter>,
    )

    const skipButton = await screen.findByText('Skip')
    userEvent.click(skipButton)

    expect(await screen.findByText('Image skipped with success.')).toBeInTheDocument()
  })

  it('should show an error message when skipping an image fails', async () => {
    jest.spyOn(ImagesService, 'fetchImages').mockResolvedValue([{ id: 'image-1' }])
    jest.spyOn(ImagesService, 'skipImage').mockRejectedValue('Error skipping the image.')

    const locationState = { userUid: 'user-1' }
    render(
      <MemoryRouter initialEntries={[{ state: locationState }]}>
        <SnackbarProvider>
          <Dashboard />
        </SnackbarProvider>
      </MemoryRouter>,
    )

    const skipButton = await screen.findByText('Skip')
    userEvent.click(skipButton)

    expect(await screen.findByText('Error skipping the image.')).toBeInTheDocument()
  })
})
