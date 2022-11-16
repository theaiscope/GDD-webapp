import { useContext } from 'react'
import { LoadingContext } from '../../providers/Loading/LoadingContext'

export const useLoading = () => {
  const context = useContext(LoadingContext)
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider')
  }

  const isLoading = context.loadingCount > 0

  const setIsLoading = () => context.setLoadingCount((previous) => previous + 1)

  const setLoadingCompleted = () => context.setLoadingCount((previous) => previous - 1)

  return {
    isLoading,
    setIsLoading,
    setLoadingCompleted,
  }
}
