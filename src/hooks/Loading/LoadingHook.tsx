import { useContext } from 'react'
import { LoadingContext } from '../../providers/Loading/LoadingContext'

export const useLoading = () => {
  const context = useContext(LoadingContext)
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider')
  }

  const showLoading = () => {
    context.dispatch(true)
  }

  const hideLoading = () => {
    context.dispatch(false)
  }

  return {
    isLoading: context.state.isLoading,
    showLoading,
    hideLoading,
  }
}
