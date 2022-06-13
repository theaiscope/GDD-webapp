import { render } from '@testing-library/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Dashboard } from './Dashboard'

describe('Dashboard', () => {
  it('should shown a canvas', () => {
    render(<BrowserRouter><Dashboard /></BrowserRouter>)
    const myCanvas: HTMLCollectionOf<HTMLCanvasElement> = document.getElementsByTagName('canvas');
    const firstCanvas = myCanvas.item(0)
    expect(firstCanvas).toBeInTheDocument()
  })
})
