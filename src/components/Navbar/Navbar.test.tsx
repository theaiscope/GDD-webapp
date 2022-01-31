import { User } from '@firebase/auth'
import { render, screen, within } from '@testing-library/react'
import { mocked } from 'jest-mock'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { assertLogOutPresent } from '../../Auth/LogOut/LogOut.test.assertion'
import { Navbar } from './Navbar'
import { assertNavbarPresent } from './Navbar.test.assertion'

jest.mock('react-firebase-hooks/auth')

const mockedAuthState = mocked(useAuthState, true)

describe(Navbar, () => {
  beforeEach(() => {
    mockedAuthState.mockReturnValue([{ email: 'some-email' } as User, false, undefined])
  })

  it('should have link back to main aiscope page', () => {
    render(<Navbar />)

    assertNavbarPresent(screen)
  })

  it(' link should display the aiscope logo', () => {
    render(<Navbar />)

    const homeLink = screen.getByRole('link')

    expect(within(homeLink).getByRole('img')).toHaveAttribute(
      'src',
      'https://aiscope.net/wp-content/uploads/2019/11/Logo_AiScope-1.png',
    )
  })

  describe('when logged in', () => {
    it('should show the user name', () => {
      render(<Navbar />)

      expect(screen.getByText('some-email')).toBeInTheDocument()
    })

    it('should show the logout button', () => {
      render(<Navbar />)

      assertLogOutPresent(screen)
    })
  })
})
