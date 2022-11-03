import React, { ReactElement, useState } from 'react'
import { LoadingSpinner } from '../../components/LoadingSpinner/LoadingSpinner'
import { LoadingContext, LoadingContextValue } from './LoadingContext'

type LoadingProviderProps = {
  children: React.ReactNode
}

export const LoadingProvider = ({ children }: LoadingProviderProps): ReactElement => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const contextValue: LoadingContextValue = {
    isLoading,
    dispatch: setIsLoading,
  }

  return (
    <LoadingContext.Provider value={contextValue}>
      {children}
      <LoadingSpinner isLoading={isLoading} />
    </LoadingContext.Provider>
  )
}
