import { render, screen } from '@testing-library/react'
import React from 'react'
import { ImageToolbar } from './ImageToolbar'

const emptyAction = jest.fn()

describe(ImageToolbar, () => {
  describe('Buttons', () => {
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

  describe('Disabled State', () => {
    it('should disable the buttons when disabled is true', () => {
      render(
        <ImageToolbar disabled={true} saveAction={emptyAction} invalidAction={emptyAction} skipAction={emptyAction} />,
      )

      const invalidButton = screen.getByRole('button', { name: 'Invalid' })
      const saveButton = screen.getByRole('button', { name: 'Save' })
      const skipButton = screen.getByRole('button', { name: 'Skip' })

      expect(invalidButton).toHaveAttribute('disabled')
      expect(saveButton).toHaveAttribute('disabled')
      expect(skipButton).toHaveAttribute('disabled')
    })

    it('should not disable the buttons when disabled is false', () => {
      render(
        <ImageToolbar disabled={false} saveAction={emptyAction} invalidAction={emptyAction} skipAction={emptyAction} />,
      )

      const invalidButton = screen.getByRole('button', { name: 'Invalid' })
      const saveButton = screen.getByRole('button', { name: 'Save' })
      const skipButton = screen.getByRole('button', { name: 'Skip' })

      expect(invalidButton).not.toHaveAttribute('disabled')
      expect(saveButton).not.toHaveAttribute('disabled')
      expect(skipButton).not.toHaveAttribute('disabled')
    })

    it('should not disable the buttons when disabled is not specified', () => {
      render(<ImageToolbar saveAction={emptyAction} invalidAction={emptyAction} skipAction={emptyAction} />)

      const invalidButton = screen.getByRole('button', { name: 'Invalid' })
      const saveButton = screen.getByRole('button', { name: 'Save' })
      const skipButton = screen.getByRole('button', { name: 'Skip' })

      expect(invalidButton).not.toHaveAttribute('disabled')
      expect(saveButton).not.toHaveAttribute('disabled')
      expect(skipButton).not.toHaveAttribute('disabled')
    })
  })

  describe('ProgressBar', () => {
    it('should show a progressbar when showProgress is true', () => {
      render(
        <ImageToolbar
          showProgress={true}
          saveAction={emptyAction}
          invalidAction={emptyAction}
          skipAction={emptyAction}
        />,
      )

      expect(screen.getByRole('progressbar')).toBeInTheDocument()
    })

    it('should not show a progressbar when showProgress is false', () => {
      render(
        <ImageToolbar
          showProgress={false}
          saveAction={emptyAction}
          invalidAction={emptyAction}
          skipAction={emptyAction}
        />,
      )

      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
    })

    it('should not show a progressbar when showProgress is not specified', () => {
      render(<ImageToolbar saveAction={emptyAction} invalidAction={emptyAction} skipAction={emptyAction} />)

      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
    })
  })
})
