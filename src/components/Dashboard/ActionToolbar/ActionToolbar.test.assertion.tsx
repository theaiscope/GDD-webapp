import { Screen } from '@testing-library/react'

export const actionToolbarPresent = (screen: Screen, present = true): void => {
  present
    ? expect(screen.getByRole('button', { name: 'undo' })).toBeInTheDocument()
    : expect(screen.queryByRole('button', { name: 'undo' })).not.toBeInTheDocument()

  present
    ? expect(screen.getByRole('button', { name: 'clear' })).toBeInTheDocument()
    : expect(screen.queryByRole('button', { name: 'clear' })).not.toBeInTheDocument()
}
