import React from 'react'
import { assertLoginFunctionality } from './Form/Form.test.assertion'
import { LogIn } from './LogIn'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { mocked } from 'jest-mock'
import { userCredentialMock as user } from './userCredentialMock'

jest.mock('react-firebase-hooks/auth')
const mockSignIn = mocked(useSignInWithEmailAndPassword, true)

const Dashboard = () => <div>I am the dashboard</div>

describe(LogIn, () => {
  describe('layout', () => {
    beforeEach(() => {
      const mockSignInWithEmailAndPassword = jest.fn()
      mockSignIn.mockReturnValue([mockSignInWithEmailAndPassword, undefined, false, undefined])

      render(
        <MemoryRouter>
          <LogIn />
        </MemoryRouter>,
      )
    })

    it('should contain a banner', () => {
      expect(screen.getByRole('banner')).toBeInTheDocument()
    })

    it('should contain a form', () => {
      expect(screen.getByRole('form')).toBeInTheDocument()
    })

    it('should contain a footer section', () => {
      expect(screen.getByRole('contentinfo')).toBeInTheDocument()
    })
  })

  it('should redirect to /dashboard when logged in', async () => {
    mockSignIn.mockReturnValue([jest.fn(), user, false, undefined])

    render(
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route path="/login" element={<LogIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </MemoryRouter>,
    )

    expect(screen.getByText('I am the dashboard')).toBeInTheDocument()
  })

  it('should use form to call signInWithEmailAndPassword', async () => {
    const mockSignInWithEmailAndPassword = jest.fn()
    mockSignIn.mockReturnValue([mockSignInWithEmailAndPassword, undefined, false, undefined])

    render(
      <MemoryRouter>
        <LogIn />
      </MemoryRouter>,
    )

    assertLoginFunctionality('test@mail.com', 'my-password', mockSignInWithEmailAndPassword)
  })
})
