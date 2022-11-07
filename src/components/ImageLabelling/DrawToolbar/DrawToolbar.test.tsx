import React from 'react'
import { render, screen } from '@testing-library/react'
import { DrawToolbar } from './DrawToolbar'
import userEvent from '@testing-library/user-event'
import CanvasDraw from 'react-canvas-draw'

describe('DrawToolbar', () => {
  it('should render the clear button', () => {
    render(<DrawToolbar canvas={undefined} />)

    expect(screen.getByRole('button', { name: 'clear' })).toBeInTheDocument()
  })

  it('should render the undo button', () => {
    render(<DrawToolbar canvas={undefined} />)

    expect(screen.getByRole('button', { name: 'undo' })).toBeInTheDocument()
  })

  it('should clear the canvas when the clear button is clicked', () => {
    const canvas = new CanvasDraw({})
    canvas.clear = jest.fn()

    render(<DrawToolbar canvas={canvas} />)

    const clearButton = screen.getByRole('button', { name: 'clear' })
    userEvent.click(clearButton)

    expect(canvas.clear).toHaveBeenCalled()
  })

  it('should undo when the undo button is clicked', () => {
    const canvas = new CanvasDraw({})
    canvas.undo = jest.fn()

    render(<DrawToolbar canvas={canvas} />)

    const undoButton = screen.getByRole('button', { name: 'undo' })
    userEvent.click(undoButton)

    expect(canvas.undo).toHaveBeenCalled()
  })
})
