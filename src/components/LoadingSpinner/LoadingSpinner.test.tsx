import React from 'react'
import { render, screen } from '@testing-library/react'
import { LoadingSpinner } from './LoadingSpinner'

describe('LoadingSpinner', () => {
  it('should render a ProgressBar', () => {
    render(<LoadingSpinner open={true} />)

    expect(screen.getByLabelText('Progress Bar')).toBeVisible()
  })

  it('should not render a ProgressBar when open is false', () => {
    render(<LoadingSpinner open={false} />)

    expect(screen.getByLabelText('Progress Bar')).not.toBeVisible()
  })
})
