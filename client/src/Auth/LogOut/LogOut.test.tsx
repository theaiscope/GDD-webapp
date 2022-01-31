import React from 'react'
import { LogOut } from './LogOut'
import { fireEvent, render, Screen, screen } from '@testing-library/react'
import { signOut } from 'firebase/auth'
import { mocked } from 'jest-mock'
import { assertLogOutPresent } from "./LogOut.test.assertion";

jest.mock('firebase/auth')

const mockSignOut = mocked(signOut, true)

describe(LogOut, function () {
  it('should have a logout button', () => {
    render(<LogOut />)

    assertLogOutPresent(screen)
  })

  it('should call sign out when logout button is clicked', () => {
    render(<LogOut />)

    fireEvent.click(screen.getByRole('button', { name: 'Logout' }))

    expect(mockSignOut).toHaveBeenCalled()
  })
})
