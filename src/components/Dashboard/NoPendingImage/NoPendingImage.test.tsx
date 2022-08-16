import React from 'react'
import { render, screen } from '@testing-library/react'
import { NoPendingImage } from './NoPendingImage'
import userEvent from '@testing-library/user-event'

describe('NoPendingImage', () => {
  it('should render a message', () => {
    render(<NoPendingImage />)

    expect(screen.getByText('No image for relabelling was found.')).toBeInTheDocument()
  })

  it('should render a refresh button', () => {
    render(<NoPendingImage />)

    expect(screen.getByRole('button', { name: 'Check again' })).toBeInTheDocument()
  })

  it('should trigger the onCheckAgain callback when the refresh button is clicked', () => {
    const onCheckAgain = jest.fn()
    render(<NoPendingImage onCheckAgain={onCheckAgain} />)

    const refreshButton = screen.getByRole('button', { name: 'Check again' })
    userEvent.click(refreshButton)

    expect(onCheckAgain).toHaveBeenCalled()
  })
})
