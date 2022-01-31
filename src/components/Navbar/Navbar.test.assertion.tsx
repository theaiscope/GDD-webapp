import { Screen } from '@testing-library/react'

export const assertNavbarPresent = (screen: Screen, present = true): void => {
  present
    ? expect(screen.getByRole('link', { name: 'aiscope-logo' })).toHaveAttribute('href', 'https://aiscope.net/')
    : expect(screen.queryByRole('link')).not.toBeInTheDocument()
}
