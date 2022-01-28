import React from 'react'
import {SignOut} from "./SignOut";
import {fireEvent, render, screen} from "@testing-library/react";
import {signOut} from "firebase/auth";
import { mocked } from 'jest-mock';

jest.mock("firebase/auth")

const mockSignOut = mocked(signOut, true)

describe(SignOut, function () {
  it('should call sign out when logout button is clicked', () => {
    render(<SignOut />)

    fireEvent.click(screen.getByRole('button'))

    expect(mockSignOut).toHaveBeenCalled()
  });
});