import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import { Dashboard } from './Dashboard'
import * as ImagesService from '../../services/ImagesService/ImagesService'
import userEvent from '@testing-library/user-event'
import { SkipImageResponse } from '../../services/ImagesService/api/SkipImageApi'

describe('Dashboard', () => {
  it('should shown a canvas', () => {
    render(
      <BrowserRouter>
        <Dashboard />
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
        <Dashboard />
      </MemoryRouter>,
    )

    const skipButton = await screen.findByText('Skip')
    userEvent.click(skipButton)

    expect(skipImageSpy).toHaveBeenCalledWith(imageId)
  })
})
