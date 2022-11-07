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
  it('should fetch the image and display the id', async () => {
    const imageId = 'image-1'
    renderWithExistingImage(imageId)

    expect(await screen.findByText(imageId)).toBeInTheDocument()
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
})
