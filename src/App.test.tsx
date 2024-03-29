import React from 'react'
import { render, screen } from '@testing-library/react'
import { App } from './App'
import { MemoryRouter } from 'react-router-dom'
import { useAuthState, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { User } from '@firebase/auth/dist/auth-public'
import { mocked } from 'jest-mock'
import { assertNavbarPresent } from './components/Navbar/Navbar.test.assertion'
import { assertLogInPresent } from './Auth/LogIn/LogIn.test.assertion'
import { SnackbarProvider } from 'notistack'
import { assertDashboardPresent } from './components/Dashboard/Dashboard.test.assertion'

jest.mock('react-firebase-hooks/auth')
jest.mock('react-canvas-draw')

const mockedAuthState = mocked(useAuthState, true)
const mockedSignIn = mocked(useSignInWithEmailAndPassword, true)

describe(App, () => {
  beforeEach(() => {
    mockedAuthState.mockReturnValue([undefined, false, undefined])
    mockedSignIn.mockReturnValue([jest.fn(), undefined, false, undefined])
  })

  it('should render the login screen when not authenticated', async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    )

    assertLogInPresent()
  })

  it('should redirect to login page when not authenticated', async () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <App />
      </MemoryRouter>,
    )

    assertLogInPresent()
    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument()
  })

  it('should show 404 message for unknown paths', async () => {
    render(
      <MemoryRouter initialEntries={['/something-weird']}>
        <App />
      </MemoryRouter>,
    )

    expect(screen.queryByText('Login')).not.toBeInTheDocument()
    expect(screen.getByText('Nothing to see here')).toBeInTheDocument()
  })

  describe('LayoutsWithNavbar', () => {
    it('should show the navbar on login screen', () => {
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>,
      )

      assertNavbarPresent()
    })

    it('should not show the navbar on 404', () => {
      render(
        <MemoryRouter initialEntries={['/something-weird']}>
          <App />
        </MemoryRouter>,
      )

      assertNavbarPresent(false)
    })
  })

  describe('when authenticated', () => {
    it('should render the dashboard and navbar when authenticated', async () => {
      mockedAuthState.mockReturnValue([{ email: 'some-email' } as User, false, undefined])

      render(
        <MemoryRouter initialEntries={['/dashboard']}>
          <SnackbarProvider>
            <App />
          </SnackbarProvider>
        </MemoryRouter>,
      )

      assertDashboardPresent()
      assertNavbarPresent()

      expect(screen.queryByText('Login')).not.toBeInTheDocument()
    })
  })
})
