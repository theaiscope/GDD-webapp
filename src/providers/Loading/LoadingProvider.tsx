import React, { ReactElement, useState } from 'react'
import { LoadingSpinner } from '../../components/LoadingSpinner/LoadingSpinner'
import { LoadingContext, LoadingContextValue } from './LoadingContext'

type LoadingProviderProps = {
  children: React.ReactNode
}

export const LoadingProvider = ({ children }: LoadingProviderProps): ReactElement => {
  const [isLoading, setIsLoading] = useState(false)

  const contextValue: LoadingContextValue = {
    state: {
      isLoading,
    },
    dispatch: setIsLoading,
  }

  return (
    <LoadingContext.Provider value={contextValue}>
      {children}
      <LoadingSpinner />
    </LoadingContext.Provider>
  )
}
