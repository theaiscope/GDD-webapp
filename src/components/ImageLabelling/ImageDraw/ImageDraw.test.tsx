import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { ImageDraw } from './ImageDraw'
import * as ImageStorageService from '../../../services/ImageStorageService/ImageStorageService'
import Image from '../../../model/image'
import { LoadingProvider } from '../../../providers/Loading/LoadingProvider'
import { SnackbarProvider } from 'notistack'
import userEvent from '@testing-library/user-event'

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
    const image: Image = {
      id: 'image-1',
      name: 'name',
      sampleLocation: 'sample-location',
    }
    const getImageUrlSpy = jest.spyOn(ImageStorageService, 'getImageUrl').mockResolvedValue(`http://image-url/image-1`)

    renderImageDraw(image)

    await waitFor(() => {
      expect(getImageUrlSpy).toHaveBeenCalledWith(image)
    })
  })

  it('should call onChange callback when canvas is changed', async () => {
    const image: Image = {
      id: 'image-1',
      name: 'name',
      sampleLocation: 'sample-location',
    }
    const onChangeSpy = jest.fn()

    renderImageDraw(image, onChangeSpy)

    const undoButton = await screen.findByRole('button', { name: 'undo' })
    userEvent.click(undoButton)

    expect(onChangeSpy).toHaveBeenCalled()
  })

  const renderImageDraw = (image?: Image, onChange?: (drawMaskDataURL: string) => void) =>
    render(
      <SnackbarProvider>
        <LoadingProvider>
          <ImageDraw image={image} onChange={onChange} />
        </LoadingProvider>
      </SnackbarProvider>,
    )
})
