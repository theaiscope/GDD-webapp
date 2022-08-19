import { screen } from '@testing-library/react'
import { noPendingImageMessage } from './NoPendingImage'

export const assertNoPendingImagePresent = (present = true): void => {
  present
    ? expect(screen.getByText(noPendingImageMessage)).toBeInTheDocument()
    : expect(screen.queryByText(noPendingImageMessage)).not.toBeInTheDocument()
}
