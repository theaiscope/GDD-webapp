import React from 'react'
import { render, screen } from '@testing-library/react'
import { ImageLabelling } from './ImageLabelling'
import { ImageLabellingProvider } from './ImageLabellingContext'
import { LoadingProvider } from '../../providers/Loading/LoadingProvider'
import { SnackbarProvider } from 'notistack'
import * as ImagesService from '../../services/ImagesService/ImagesService'
import { MemoryRouter } from 'react-router-dom'
import Image from '../../model/image'

describe('ImageLabelling', () => {
  it('should render the ImageDraw when an image to label is available', async () => {
    renderWithExistingImage()

    await assertImageDrawIsPresent()
  })

  it('should render the actions bar when an image to label is available', async () => {
    renderWithExistingImage()

    expect(await screen.findByRole('button', { name: 'Skip' })).toBeInTheDocument()
    expect(await screen.findByRole('button', { name: 'Invalid' })).toBeInTheDocument()
    expect(await screen.findByRole('button', { name: 'Save' })).toBeInTheDocument()
  })

  const renderWithExistingImage = (imageId = 'image-1') => {
    jest.spyOn(ImagesService, 'fetchImageToLabel').mockResolvedValue({ id: imageId } as Image)

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

  const assertImageDrawIsPresent = async (): Promise<void> => {
    expect(await screen.findByRole('toolbar')).toBeInTheDocument()

    const canvasTagMatcher = (_content: string, element: Element | null) => element?.tagName.toLowerCase() === 'canvas'
    expect(screen.getAllByText(canvasTagMatcher).length).toBeGreaterThan(0)
  }
})
