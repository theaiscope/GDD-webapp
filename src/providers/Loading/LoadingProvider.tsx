import React, { ReactElement, useState } from 'react'
import { LoadingSpinner } from '../../components/LoadingSpinner/LoadingSpinner'
import { LoadingContext, LoadingContextValue } from './LoadingContext'

type LoadingProviderProps = {
  children: React.ReactNode
}

export const LoadingProvider = ({ children }: LoadingProviderProps): ReactElement => {
  const [loadingCount, setLoadingCount] = useState<number>(0)

  const isLoading = loadingCount > 0

  const contextValue: LoadingContextValue = {
    loadingCount,
    setLoadingCount,
  }

  return (
    <LoadingContext.Provider value={contextValue}>
      {children}
      <LoadingSpinner isLoading={isLoading} />
    </LoadingContext.Provider>
  )
}
