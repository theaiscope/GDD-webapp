import { render, screen, within } from '@testing-library/react'
import { AuthError } from 'firebase/auth'
import React from 'react'
import { Form } from './Form'
import { assertLoginFunctionality } from './Form.test.assertion'

describe(Form, () => {
  const props = {
    onSubmit: jest.fn(),
    loading: false,
    contactAddress: 'some-address',
  }

  it('should display a form header', () => {
    render(<Form {...props} />)

    expect(screen.getByTestId('LoginFormHeader')).toBeInTheDocument()
  })

  it('should call onSubmit with email and password when login button clicked', () => {
    render(<Form {...props} />)

    assertLoginFunctionality('test@mail.com', 'my-password', props.onSubmit)
  })

  describe('when sign in is loading', () => {
    it('should show a spinner on login button', () => {
      render(<Form {...props} loading={true} />)

      const loginButton = screen.getByRole('button', { name: '' })

      expect(within(loginButton).getByRole('progressbar')).toBeInTheDocument()
    })
  })

  describe('when sign in fails', () => {
    it('should show an incorrect details message', () => {
      render(<Form {...props} error={{} as AuthError} />)

      expect(screen.getByText('Incorrect email or password')).toBeInTheDocument()
    })
  })
})
