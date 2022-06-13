import { render } from '@testing-library/react'
import React from 'react'
import { Dashboard } from './Dashboard'

describe('Dashboard', () => {
  it('should shown a canvas', () => {
    render(<Dashboard />)
    const myCanvas: HTMLCollectionOf<HTMLCanvasElement> = document.getElementsByTagName('canvas');
    const firstCanvas = myCanvas.item(0)
    expect(firstCanvas).toBeInTheDocument()
  })

  it('should shown a canvas', () => {
    render(<Dashboard />)
    const myCanvas: HTMLCollectionOf<HTMLCanvasElement> = document.getElementsByTagName('canvas');
    const firstCanvas = myCanvas.item(0)
    expect(firstCanvas).toBeInTheDocument()
  })
})
