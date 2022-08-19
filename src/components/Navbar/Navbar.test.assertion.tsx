import { screen } from '@testing-library/react'

export const assertNavbarPresent = (present = true): void => {
  present
    ? expect(screen.getByRole('link', { name: 'aiscope-logo' })).toHaveAttribute('href', 'https://aiscope.net/')
    : expect(screen.queryByRole('link')).not.toBeInTheDocument()
}
