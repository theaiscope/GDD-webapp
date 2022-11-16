import { createContext, Dispatch, SetStateAction } from 'react'

export type LoadingContextValue = {
  loadingCount: number
  setLoadingCount: Dispatch<SetStateAction<number>>
}

export const LoadingContext = createContext<LoadingContextValue | undefined>(undefined)
