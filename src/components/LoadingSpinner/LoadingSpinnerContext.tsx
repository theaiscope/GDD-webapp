import React, { createContext, Dispatch, SetStateAction, useState } from 'react'
import { LoadingSpinner } from './LoadingSpinner'

type State = {
  open: boolean
}

type LoadingSpinnerProviderProps = {
  children: React.ReactNode
}

export const LoadingSpinnerStateContext = createContext<
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

export { LoadingSpinnerProvider }
