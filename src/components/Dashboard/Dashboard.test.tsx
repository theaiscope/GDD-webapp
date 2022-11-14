import React from 'react'
import { render, screen } from '@testing-library/react'
import { Dashboard } from './Dashboard'
import { LoadingProvider } from '../../providers/Loading/LoadingProvider'
import { SnackbarProvider } from 'notistack'
import { MemoryRouter } from 'react-router-dom'
import * as ImagesService from '../../services/ImagesService/ImagesService'
import { noPendingImageMessage } from './NoPendingImage/NoPendingImage'

describe('Dashboard', () => {
  it('should render the ImageLabelling component', async () => {
    jest.spyOn(ImagesService, 'fetchImageToLabel').mockResolvedValue(undefined)

    render(
      <MemoryRouter initialEntries={[{ state: { userUid: 'user-1' } }]}>
        <SnackbarProvider>
          <LoadingProvider>
            <Dashboard />
          </LoadingProvider>
        </SnackbarProvider>
      </MemoryRouter>,
    )

    expect(await screen.findByText(noPendingImageMessage)).toBeInTheDocument()
  })
})
