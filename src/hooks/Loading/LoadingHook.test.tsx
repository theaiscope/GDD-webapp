import { useLoading } from './LoadingHook'
import { LoadingProvider } from '../../providers/Loading/LoadingProvider'
import { renderHook } from '@testing-library/react-hooks'
import { act } from 'react-dom/test-utils'

describe('LoadingHook', () => {
  it('should set is loading', async () => {
    const { result } = renderHook(() => useLoading(), { wrapper: LoadingProvider })

    act(() => {
      result.current.setIsLoading()
    })

    expect(result.current.isLoading).toBeTruthy()
  })

  it('should set as loading completed', () => {
    const { result } = renderHook(() => useLoading(), { wrapper: LoadingProvider })

    // Set is loading
    act(() => {
      result.current.setIsLoading()
    })
    expect(result.current.isLoading).toBeTruthy()

    // Set loading completed
    act(() => {
      result.current.setLoadingCompleted()
    })
    expect(result.current.isLoading).toBeFalsy()
  })

  it('should show the Loading Spinner until all the enqueued loadings are completed', () => {
    const { result } = renderHook(() => useLoading(), { wrapper: LoadingProvider })

    act(() => {
      // Set first loading
      result.current.setIsLoading()
      // Set second loading
      result.current.setIsLoading()
    })

    // Check it is loading
    expect(result.current.isLoading).toBeTruthy()

    // Complete the first loading and check it is still loading
    act(() => {
      result.current.setLoadingCompleted()
    })
    expect(result.current.isLoading).toBeTruthy()

    // Complete the second loading and check it is not loading anymore
    act(() => {
      result.current.setLoadingCompleted()
    })
    expect(result.current.isLoading).toBeFalsy()
  })
})
