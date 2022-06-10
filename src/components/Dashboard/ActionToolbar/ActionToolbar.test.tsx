import { render, screen } from '@testing-library/react'
import React from 'react'
import { ActionToolbar } from './ActionToolbar'

const emptyAction = jest.fn()

describe(ActionToolbar, () => {
  it('should have a button for the clear action', () => {
    const testedAction = jest.fn()

    render(<ActionToolbar clearAction={testedAction} undoAction={emptyAction} />)

    const clearButton = screen.getByRole('button', { name: 'clear' })
    clearButton.click()
    expect(testedAction).toBeCalledTimes(1)
  })

  it('should have a button for the undo action', () => {
    const testedAction = jest.fn()

    render(<ActionToolbar clearAction={emptyAction} undoAction={testedAction} />)

    const undoButton = screen.getByRole('button', { name: 'undo' })
    undoButton.click()

    expect(testedAction).toBeCalledTimes(1)
  })
})
