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
import { noPendingImageMessage } from '../Dashboard/NoPendingImage/NoPendingImage'

describe(ImageLabelling, () => {
  const canvasTagMatcher = (_content: string, element: Element | null) => element?.tagName.toLowerCase() === 'canvas'

  it('should render a NoPendingImage message when no image is available', async () => {
    jest.spyOn(ImagesService, 'fetchImageToLabel').mockResolvedValue(undefined)
    renderImageLabelling()

    expect(await screen.findByText(noPendingImageMessage)).toBeInTheDocument()
  })

  it('should not render a NoPendingImage message when an image to label is available', async () => {
    jest.spyOn(ImagesService, 'fetchImageToLabel').mockResolvedValue({ id: 'image-1' } as Image)

    renderImageLabelling()
    await waitFor(() => {
      expect(screen.queryByText(noPendingImageMessage)).not.toBeInTheDocument()
    })
  })

  it('should render the ImageDraw when an image to label is available', async () => {
    jest.spyOn(ImagesService, 'fetchImageToLabel').mockResolvedValue({ id: 'image-1' } as Image)

    renderImageLabelling()

    expect(await screen.findByRole('toolbar')).toBeInTheDocument()
    expect((await screen.findAllByText(canvasTagMatcher)).length).toBeGreaterThan(0)
  })

  it('should render the ActionsBar when an image to label is available', async () => {
    jest.spyOn(ImagesService, 'fetchImageToLabel').mockResolvedValue({ id: 'image-1' } as Image)

    renderImageLabelling()

    expect(await screen.findByRole('button', { name: 'Skip' })).toBeInTheDocument()
    expect(await screen.findByRole('button', { name: 'Invalid' })).toBeInTheDocument()
    expect(await screen.findByRole('button', { name: 'Save' })).toBeInTheDocument()
  })

  it('should fetch an image', async () => {
    const fetchImageSpy = jest.spyOn(ImagesService, 'fetchImageToLabel').mockResolvedValue({ id: 'image-1' } as Image)

    renderImageLabelling()

    await waitFor(() => {
      expect(fetchImageSpy).toHaveBeenCalled()
    })
  })

  it('should display a loading progressbar whilst fetching image', async () => {
    jest.spyOn(ImagesService, 'fetchImageToLabel').mockResolvedValue({ id: 'image-1' } as Image)
    renderImageLabelling()

    // Check that the progress is visible
    expect(screen.getByRole('progressbar', { hidden: true })).toBeVisible()

    // and the content is not visible
    expect(screen.queryAllByText(canvasTagMatcher).length).toEqual(0)
    expect(screen.queryByRole('button', { name: 'Save' })).not.toBeInTheDocument()
    expect(screen.queryByText(noPendingImageMessage)).not.toBeInTheDocument()

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
