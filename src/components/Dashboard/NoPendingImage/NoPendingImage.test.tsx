import React from 'react'
import { render, screen } from '@testing-library/react'
import { NoPendingImage } from './NoPendingImage'

describe('NoPendingImage', () => {
  it('should render a message', () => {
    render(<NoPendingImage />)

    expect(screen.getByText('No image for relabelling was found.')).toBeInTheDocument()
  })

  it('should render a refresh button', () => {
    render(<NoPendingImage />)

    expect(screen.getByRole('button', { name: 'Check again' })).toBeInTheDocument()
  })
})
