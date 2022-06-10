import { render, screen } from '@testing-library/react'
import React from 'react'
import { ImageToolbar } from './ImageToolbar'

const emptyAction = jest.fn()

describe(ImageToolbar, () => {
  it('should have a button for the invalid action', () => {
    const testedAction = jest.fn()

    render(<ImageToolbar invalidAction={testedAction} saveAction={emptyAction} skipAction={emptyAction} />)

    const editButton = screen.getByRole('button', { name: 'Invalid' })

    editButton.click()

    expect(testedAction).toBeCalledTimes(1)
  })

  it('should have a button for the save action', () => {
    const testedAction = jest.fn()

    render(<ImageToolbar saveAction={testedAction} invalidAction={emptyAction} skipAction={emptyAction} />)

    const saveButton = screen.getByRole('button', { name: 'Save' })
    saveButton.click()
    expect(testedAction).toBeCalledTimes(1)
  })

  it('should have a button for the skip action', () => {
    const testedAction = jest.fn()

    render(<ImageToolbar saveAction={emptyAction} invalidAction={emptyAction} skipAction={testedAction} />)

    const skipButton = screen.getByRole('button', { name: 'Skip' })
    skipButton.click()
    expect(testedAction).toBeCalledTimes(1)
  })
})
