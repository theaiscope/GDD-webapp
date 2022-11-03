import { createContext, Dispatch, SetStateAction } from 'react'

export type LoadingContextValue = {
  isLoading: boolean
  dispatch: Dispatch<SetStateAction<boolean>>
}

export const LoadingContext = createContext<LoadingContextValue | undefined>(undefined)
