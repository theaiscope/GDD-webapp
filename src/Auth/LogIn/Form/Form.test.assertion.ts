import { fireEvent, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

export const assertLoginFunctionality = (email: string, password: string, submitFn: jest.Mock): void => {
  const form = screen.getByRole('form')

  const emailInput = within(form).getByRole('textbox')
  userEvent.type(emailInput, email)

  const passwordInput = within(form).getByPlaceholderText('password')
  userEvent.type(passwordInput, password)

  const loginButton = within(form).getByRole('button', { name: 'LOGIN' })
  fireEvent.click(loginButton)

  expect(submitFn).toHaveBeenCalledWith('test@mail.com', 'my-password')
}
