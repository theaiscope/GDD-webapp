import React from 'react'
import { render, screen } from '@testing-library/react'
import { useLoading } from './LoadingHook'
import { LoadingProvider } from '../../providers/Loading/LoadingProvider'

describe('LoadingHook', () => {
  it('should show the Loading Spinner', async () => {
    const { useLoading } = renderLoadingHook()

    useLoading.showLoading()

    expect(await screen.findByLabelText('Loading Spinner')).toBeVisible()
  })

  it('should hide the Loading Spinner', async () => {
    const { useLoading } = renderLoadingHook()

    useLoading.showLoading()
    expect(await screen.findByLabelText('Loading Spinner')).toBeVisible()

    useLoading.hideLoading()
    expect(await screen.findByLabelText('Loading Spinner')).not.toBeVisible()
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
