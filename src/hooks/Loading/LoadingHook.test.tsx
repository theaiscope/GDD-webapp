import React from 'react'
import { act, render, screen } from '@testing-library/react'
import { useLoading } from './LoadingHook'
import { LoadingProvider } from '../../providers/Loading/LoadingProvider'

describe('LoadingHook', () => {
  it('should show the Loading Spinner', async () => {
    const { useLoading } = renderLoadingHook()

    act(() => {
      useLoading.setIsLoading()
    })

    expect(await screen.findByLabelText('Loading Spinner')).toBeVisible()
  })

  it('should hide the Loading Spinner', () => {
    const { useLoading } = renderLoadingHook()

    // Set is loading
    act(() => {
      useLoading.setIsLoading()
    })
    expect(screen.getByLabelText('Loading Spinner')).toBeVisible()

    // Set loading completed
    act(() => {
      useLoading.setLoadingCompleted()
    })
    expect(screen.getByLabelText('Loading Spinner')).not.toBeVisible()
  })

  it('should show the Loading Spinner until all the enqueued loadings are completed', () => {
    const { useLoading } = renderLoadingHook()

    act(() => {
      // Set first loading
      useLoading.setIsLoading()
      // Set second loading
      useLoading.setIsLoading()
    })

    // Check the spinner is visible
    expect(screen.getByLabelText('Loading Spinner')).toBeVisible()

    // Complete the first loading and check the spinner is still visible
    act(() => useLoading.setLoadingCompleted())
    expect(screen.getByLabelText('Loading Spinner')).toBeVisible()

    // Complete the second loading and check the spinner is not visible
    act(() => useLoading.setLoadingCompleted())
    expect(screen.queryByLabelText('Loading Spinner')).not.toBeVisible()
  })

  const renderLoadingHook = () => {
    let useLoadingHook = {} as ReturnType<typeof useLoading>
    const Component: React.FC = () => {
      useLoadingHook = useLoading()
      return null
    }
    const { container } = render(
      <LoadingProvider>
        <Component />
      </LoadingProvider>,
    )
    return {
      container,
      useLoading: useLoadingHook,
    }
  }
})
