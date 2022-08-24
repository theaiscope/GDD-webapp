import { screen } from '@testing-library/react'

export const assertLogInPresent = (present = true): void => {
  present
    ? expect(screen.getByRole('img', { name: 'login-header' })).toBeInTheDocument()
    : expect(screen.queryByRole('img', { name: 'login-header' })).not.toBeInTheDocument()
}
