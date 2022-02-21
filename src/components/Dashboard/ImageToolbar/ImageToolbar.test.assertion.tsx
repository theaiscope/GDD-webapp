import {Screen} from '@testing-library/react'

export const imageToolbarPresent = (screen: Screen, present = true): void => {
  present
      ? expect(screen.getByRole('button', {name: 'Invalid'})).toBeInTheDocument()
      : expect(screen.getByRole('button', {name: 'Invalid'})).not.toBeInTheDocument()

  present
      ? expect(screen.getByRole('button', {name: 'Skip'})).toBeInTheDocument()
      : expect(screen.getByRole('button', {name: 'Skip'})).not.toBeInTheDocument()

  present
      ? expect(screen.getByRole('button', {name: 'Save'})).toBeInTheDocument()
      : expect(screen.getByRole('button', {name: 'Save'})).not.toBeInTheDocument()
}