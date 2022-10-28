import React from 'react'
import { render, screen } from '@testing-library/react'
import { LoadingSpinnerProvider, useLoadingSpinner } from './LoadingSpinnerContext'

describe('LoadingSpinner', () => {
  it('should not display a Loading Spinner by default', () => {
    render(<LoadingSpinnerProvider>Loading</LoadingSpinnerProvider>)

    expect(screen.getByLabelText('Loading Spinner')).not.toBeVisible()
  })

  it('should display a Loading Spinner when show is invoked', async () => {
    const { useLoadingSpinner } = renderLoadingSpinner()

    useLoadingSpinner.showLoadingSpinner()

    expect(await screen.findByLabelText('Loading Spinner')).toBeVisible()
  })

  it('should hide the Loading Spinner when hide is invoked', async () => {
    const { useLoadingSpinner } = renderLoadingSpinner()

    useLoadingSpinner.showLoadingSpinner()
    expect(await screen.findByLabelText('Loading Spinner')).toBeVisible()

    useLoadingSpinner.hideLoadingSpinner()
    expect(await screen.findByLabelText('Loading Spinner')).not.toBeVisible()
  })

  const renderLoadingSpinner = () => {
    let useLoadingSpinnerHook = {} as ReturnType<typeof useLoadingSpinner>
    const Component: React.FC = () => {
      useLoadingSpinnerHook = useLoadingSpinner()
      return null
    }
    const { container } = render(
      <LoadingSpinnerProvider>
        <Component />
      </LoadingSpinnerProvider>,
    )
    return {
      container,
      useLoadingSpinner: useLoadingSpinnerHook,
    }
  }
})
