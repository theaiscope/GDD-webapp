import React, { createContext, Dispatch, SetStateAction, useContext, useState } from 'react'
import { LoadingSpinner } from './LoadingSpinner'

type State = {
  open: boolean
}

type LoadingSpinnerProviderProps = {
  children: React.ReactNode
}

const LoadingSpinnerStateContext = createContext<
  { state: State; dispatch: Dispatch<SetStateAction<boolean>> } | undefined
>(undefined)

function LoadingSpinnerProvider({ children }: LoadingSpinnerProviderProps) {
  const [open, setOpen] = useState(false)

  const state = { open } as State
  const value = {
    state,
    dispatch: setOpen,
  }

  return (
    <LoadingSpinnerStateContext.Provider value={value}>
      {children}
      <LoadingSpinner />
    </LoadingSpinnerStateContext.Provider>
  )
}

const useLoadingSpinner = () => {
  const context = useContext(LoadingSpinnerStateContext)
  if (context === undefined) {
    throw new Error('useLoadingSpinner must be used within a LoadingSpinnerProvider')
  }

  const showLoadingSpinner = () => {
    context.dispatch(true)
  }

  const hideLoadingSpinner = () => {
    context.dispatch(false)
  }

  return {
    isLoading: context.state.open,
    showLoadingSpinner,
    hideLoadingSpinner,
  }
}

export { LoadingSpinnerProvider, useLoadingSpinner }
