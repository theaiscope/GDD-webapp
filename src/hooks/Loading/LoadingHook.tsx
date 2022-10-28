import { useContext } from 'react'
import { LoadingSpinnerStateContext } from '../../components/LoadingSpinner/LoadingSpinnerContext'

export const useLoading = () => {
  const context = useContext(LoadingSpinnerStateContext)
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
    isLoading: context.state.open,
    showLoading,
    hideLoading,
  }
}
