import React from 'react'
import { fireEvent, render, screen, within } from '@testing-library/react'
import { LoadingButton } from './LoadingButton'

describe(LoadingButton, () => {
  const props = {
    onClick: jest.fn(),
    loading: false,
  }

  it('should render button with children', () => {
    render(<LoadingButton {...props}>I am the button</LoadingButton>)

    expect(screen.getByRole('button', { name: 'I am the button' })).toBeInTheDocument()
  })

  it('should call onClick function on button click with button event', () => {
    render(<LoadingButton {...props}>I am the button</LoadingButton>)

    const button = screen.getByRole('button')

    fireEvent.click(button)

    expect(props.onClick).toHaveBeenCalled()
  })

  describe('when loading', () => {
    it('should not render button children', () => {
      render(
        <LoadingButton {...props} loading={true}>
          I am the button
        </LoadingButton>,
      )

      const button = screen.getByRole('button')

      expect(within(button).queryByText('I am the button')).not.toBeInTheDocument()
    })

    it('should render spinner', () => {
      render(
        <LoadingButton {...props} loading={true}>
          I am the button
        </LoadingButton>,
      )

      const loginButton = screen.getByRole('button')

      expect(within(loginButton).getByRole('progressbar')).toBeInTheDocument()
    })

    it('should disable button', () => {
      render(
        <LoadingButton {...props} loading={true}>
          I am the button
        </LoadingButton>,
      )

      const button = screen.getByRole('button')

      fireEvent.click(button)

      expect(props.onClick).not.toHaveBeenCalled()
    })
  })
})
