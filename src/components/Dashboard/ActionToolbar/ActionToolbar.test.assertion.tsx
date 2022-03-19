import { Screen } from '@testing-library/react'

export const actionToolbarPresent = (screen: Screen, present = true): void => {
  present
    ? expect(screen.getByRole('button', { name: 'edit' })).toBeInTheDocument()
    : expect(screen.getByRole('button', { name: 'edit' })).not.toBeInTheDocument()

  present
    ? expect(screen.getByRole('button', { name: 'undo' })).toBeInTheDocument()
    : expect(screen.getByRole('button', { name: 'undo' })).not.toBeInTheDocument()

  present
    ? expect(screen.getByRole('button', { name: 'clear' })).toBeInTheDocument()
    : expect(screen.getByRole('button', { name: 'clear' })).not.toBeInTheDocument()
}
