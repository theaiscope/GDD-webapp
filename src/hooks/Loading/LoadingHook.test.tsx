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
