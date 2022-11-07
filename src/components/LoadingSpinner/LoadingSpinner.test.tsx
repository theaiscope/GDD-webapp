import React from 'react'
import { render, screen } from '@testing-library/react'
import { LoadingSpinner } from './LoadingSpinner'

describe(LoadingSpinner, () => {
  it('should display a ProgressBar when is loading', () => {
    render(<LoadingSpinner isLoading={true}></LoadingSpinner>)

    expect(screen.getByRole('progressbar', { hidden: true })).toBeVisible()
  })

  it('should not display a ProgressBar when is not loading', () => {
    render(<LoadingSpinner isLoading={false}></LoadingSpinner>)

    expect(screen.getByRole('progressbar', { hidden: true })).not.toBeVisible()
  })
})
