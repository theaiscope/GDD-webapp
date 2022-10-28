import { createContext, Dispatch, SetStateAction } from 'react'

export type LoadingState = {
  isLoading: boolean
}

export type LoadingContextValue = {
  state: LoadingState
  dispatch: Dispatch<SetStateAction<boolean>>
}

export const LoadingContext = createContext<LoadingContextValue | undefined>(undefined)
