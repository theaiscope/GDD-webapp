import { screen } from '@testing-library/react'

export const assertDashboardPresent = (present = true): void => {
  const dashboardMatcher = (_content: string, element: Element | null) => element?.className === 'dashboardContainer'

  present
    ? expect(screen.getAllByText(dashboardMatcher).length).toBeGreaterThan(0)
    : expect(screen.queryAllByText(dashboardMatcher).length).toBe(0)
}

export const assertCanvasPresent = (present = true): void => {
  const canvasTagMatcher = (_content: string, element: Element | null) => element?.tagName.toLowerCase() === 'canvas'

  present
    ? expect(screen.getAllByText(canvasTagMatcher).length).toBeGreaterThan(0)
    : expect(screen.queryAllByText(canvasTagMatcher).length).toBe(0)
}

export const assertProgressBarPresent = (present = true): void => {
  present
    ? expect(screen.getByLabelText('Progress Bar')).toBeVisible()
    : expect(screen.queryByLabelText('Progress Bar')).not.toBeVisible()
}
