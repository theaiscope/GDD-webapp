import React from 'react'
import { render, RenderResult, screen, waitFor } from '@testing-library/react'
import { ImageLabelling } from './ImageLabelling'
import { ImageLabellingProvider } from './ImageLabellingContext'
import { LoadingProvider } from '../../providers/Loading/LoadingProvider'
import { SnackbarProvider } from 'notistack'
import * as ImagesService from '../../services/ImagesService/ImagesService'
import { MemoryRouter } from 'react-router-dom'
import Image from '../../model/image'
import userEvent from '@testing-library/user-event'
import { SkipImageResponse } from '../../services/ImagesService/api/SkipImageApi'

describe(ImageLabelling, () => {
  it('should render the ImageDraw when an image to label is available', async () => {
    renderImageLabelling()

    expect(await screen.findByRole('toolbar')).toBeInTheDocument()

    const canvasTagMatcher = (_content: string, element: Element | null) => element?.tagName.toLowerCase() === 'canvas'
    expect(screen.getAllByText(canvasTagMatcher).length).toBeGreaterThan(0)
  })

  it('should render the actions bar when an image to label is available', async () => {
    renderImageLabelling()

    expect(await screen.findByRole('button', { name: 'Skip' })).toBeInTheDocument()
    expect(await screen.findByRole('button', { name: 'Invalid' })).toBeInTheDocument()
    expect(await screen.findByRole('button', { name: 'Save' })).toBeInTheDocument()
  })

  it('should fetch a image', async () => {
    const fetchImageSpy = jest.spyOn(ImagesService, 'fetchImageToLabel').mockResolvedValue({} as Image)

    renderImageLabelling()

    expect(fetchImageSpy).toHaveBeenCalled()
  })

  it('should display a loading progressbar whilst fetching image', async () => {
    renderImageLabelling()

    expect(screen.getByRole('progressbar', { hidden: true })).toBeVisible()

    // Wait for the fetch to complete and check that the progress is not visible
    await waitFor(() => {
      expect(screen.getByRole('progressbar', { hidden: true })).not.toBeVisible()
    })
  })

  it('should fetch a new image when an action is executed', async () => {
    const fetchImageSpy = jest.spyOn(ImagesService, 'fetchImageToLabel').mockResolvedValue({ id: 'image-1' } as Image)
    jest.spyOn(ImagesService, 'skipImage').mockResolvedValue({} as SkipImageResponse)

    renderImageLabelling()

    // First called when rendered
    await waitFor(() => {
      expect(fetchImageSpy).toHaveBeenCalledTimes(1)
    })

    // Execute an action
    const skipButton = screen.getByRole('button', { name: 'Skip' })
    userEvent.click(skipButton)

    // Check that fetch was called again
    await waitFor(() => {
      expect(fetchImageSpy).toHaveBeenCalledTimes(2)
    })
  })

  const renderImageLabelling = (): RenderResult => {
    const locationState = { userUid: 'user-1' }
    return render(
      <MemoryRouter initialEntries={[{ state: locationState }]}>
        <SnackbarProvider>
          <LoadingProvider>
            <ImageLabellingProvider>
              <ImageLabelling />
            </ImageLabellingProvider>
          </LoadingProvider>
        </SnackbarProvider>
      </MemoryRouter>,
    )
  }
})
