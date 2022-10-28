import { render, screen } from '@testing-library/react'
import React from 'react'
import { LoadingProvider } from './LoadingProvider'

describe('LoadingProvider', () => {
  it('should return a provider with the LoadingSpinner', () => {
    render(<LoadingProvider>Test</LoadingProvider>)

    expect(screen.getByLabelText('Loading Spinner')).toBeInTheDocument()
  })
})
