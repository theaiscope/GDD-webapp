import { Screen } from "@testing-library/react";

export const assertLogOutPresent = (screen: Screen, present = true): void => {
  present
    ? expect(screen.getByRole('button', { name: 'Logout' }))
    : expect(screen.queryByRole('button', { name: 'Logout' })).not.toBeInTheDocument()
}