import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { ImageDraw } from './ImageDraw'
import * as ImageStorageService from '../../../services/ImageStorageService/ImageStorageService'
import Image from '../../../model/image'
import { LoadingProvider } from '../../../providers/Loading/LoadingProvider'
import { SnackbarProvider } from 'notistack'

describe(ImageDraw, () => {
  it('should render the canvas', () => {
    renderImageDraw()

    const canvasTagMatcher = (_content: string, element: Element | null) => element?.tagName.toLowerCase() === 'canvas'
    expect(screen.getAllByText(canvasTagMatcher).length).toBeGreaterThan(0)
  })

  it('should render the draw toolbar', () => {
    renderImageDraw()

    expect(screen.getByRole('toolbar')).toBeInTheDocument()
  })

  it('should fetch the ImageUrl', async () => {
    const imageId = 'image-1'
    const image: Image = {
      id: imageId,
      name: 'name',
      sampleLocation: 'sample-location',
    }
    const getImageUrlSpy = jest
      .spyOn(ImageStorageService, 'getImageUrl')
      .mockResolvedValue(`http://image-url/${imageId}`)

    renderImageDraw(image)

    await waitFor(() => {
      expect(getImageUrlSpy).toHaveBeenCalledWith(image)
    })
  })

  const renderImageDraw = (image: Image | undefined = undefined) =>
    render(
      <SnackbarProvider>
        <LoadingProvider>
          <ImageDraw image={image} />
        </LoadingProvider>
      </SnackbarProvider>,
    )
})
