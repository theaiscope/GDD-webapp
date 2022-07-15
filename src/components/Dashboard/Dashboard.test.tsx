import { render, screen } from '@testing-library/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Dashboard } from './Dashboard'

describe('Dashboard', () => {
  it('should shown a canvas', () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>,
    )

    const canvasTagMatcher = (_content: string, element: Element | null) => element?.tagName.toLowerCase() === 'canvas'

    const myCanvas = screen.getAllByText(canvasTagMatcher)
    expect(myCanvas.length).toBeGreaterThan(0)
  })
})
