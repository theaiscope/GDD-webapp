import { render, screen } from '@testing-library/react'
import React from 'react'
import { LoadingSpinner } from './LoadingSpinner'
import * as LoadingHook from '../../hooks/Loading/LoadingHook'

describe('LoadingSpinner', () => {
  it('should display a ProgressBar when is loading', () => {
    jest.spyOn(LoadingHook, 'useLoading').mockReturnValue({
      isLoading: true,
      showLoading: () => jest.fn(),
      hideLoading: () => jest.fn,
    })

    render(<LoadingSpinner></LoadingSpinner>)

    expect(screen.getByRole('progressbar', { hidden: true })).toBeVisible()
  })

  it('should not display a ProgressBar when is not loading', () => {
    jest.spyOn(LoadingHook, 'useLoading').mockReturnValue({
      isLoading: false,
      showLoading: () => jest.fn(),
      hideLoading: () => jest.fn,
    })

    render(<LoadingSpinner></LoadingSpinner>)

    expect(screen.getByRole('progressbar', { hidden: true })).not.toBeVisible()
  })
})
