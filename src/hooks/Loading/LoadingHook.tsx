import { useContext } from 'react'
import { LoadingContext } from '../../providers/Loading/LoadingContext'

export const useLoading = () => {
  const context = useContext(LoadingContext)
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider')
  }

  const setIsLoading = () => context.dispatch(true)

  const setLoadingCompleted = () => context.dispatch(false)

  return {
    isLoading: context.isLoading,
    setIsLoading,
    setLoadingCompleted,
  }
}
