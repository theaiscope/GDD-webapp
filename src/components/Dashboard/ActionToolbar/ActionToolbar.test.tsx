import {render, screen} from '@testing-library/react'
import React from 'react'
import {ActionToolbar} from "./ActionToolbar"

const emptyAction = jest.fn();

describe(ActionToolbar, () => {
  it('should have a button for the edit action', () => {
    const testedAction = jest.fn()

    render(<ActionToolbar
        editAction={testedAction}
        clearAction={emptyAction}
        redoAction={emptyAction}
        undoAction={emptyAction}
    />)

    const editButton = screen.getByRole('button', {name: 'edit'})

    editButton.click()

    expect(testedAction).toBeCalledTimes(1)
  })

  it('should have a button for the clear action', () => {
    const testedAction = jest.fn()

    render(<ActionToolbar clearAction={testedAction} editAction={emptyAction} redoAction={emptyAction}
                          undoAction={emptyAction}/>)

    const clearButton = screen.getByRole('button', {name: 'clear'})
    clearButton.click()
    expect(testedAction).toBeCalledTimes(1)
  })

  it('should have a button for the undo action', () => {
    const testedAction = jest.fn()

    render(<ActionToolbar clearAction={emptyAction} editAction={emptyAction} redoAction={emptyAction}
                          undoAction={testedAction}/>)

    const undoButton = screen.getByRole('button', {name: 'undo'})
    undoButton.click()

    expect(testedAction).toBeCalledTimes(1)
  })

  it('should have a button for the redo action', () => {
    const testedAction = jest.fn()

    render(<ActionToolbar clearAction={emptyAction} editAction={emptyAction} redoAction={testedAction}
                          undoAction={emptyAction}/>)

    const redoButton = screen.getByRole('button', {name: 'redo'})
    redoButton.click()

    expect(testedAction).toBeCalledTimes(1)
  })
})