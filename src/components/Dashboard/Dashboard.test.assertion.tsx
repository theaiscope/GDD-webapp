import { screen } from '@testing-library/react'

export const assertCanvasPresent = (present = true): void => {
  const canvasTagMatcher = (_content: string, element: Element | null) => element?.tagName.toLowerCase() === 'canvas'
  const canvasElements = screen.getAllByText(canvasTagMatcher)

  present ? expect(canvasElements.length).toBeGreaterThan(0) : expect(canvasElements.length).toBe(0)
}
