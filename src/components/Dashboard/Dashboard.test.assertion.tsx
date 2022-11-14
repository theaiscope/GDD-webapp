import { screen } from '@testing-library/react'

export const assertDashboardPresent = (present = true): void => {
  const dashboardMatcher = (_content: string, element: Element | null) => element?.className === 'dashboardContainer'

  present
    ? expect(screen.getAllByText(dashboardMatcher).length).toBeGreaterThan(0)
    : expect(screen.queryAllByText(dashboardMatcher).length).toBe(0)
}
