import { Screen } from '@testing-library/react'

export const assertLogInPresent = (screen: Screen, present = true): void => {
  present
    ? expect(screen.getByRole('img', { name: 'login-header' })).toBeInTheDocument()
    : expect(screen.queryByRole('img', { name: 'login-header' })).not.toBeInTheDocument()
}
