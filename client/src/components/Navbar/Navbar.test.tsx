import { User } from "@firebase/auth";
import { render, Screen, screen, within } from "@testing-library/react";
import { mocked } from "jest-mock";
import React from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import { Navbar } from "./Navbar";

jest.mock("react-firebase-hooks/auth")

const mockedAuthState = mocked(useAuthState, true);

export const assertNavbarPresent = (screen: Screen, present = true): void => {
  present ?
    expect(screen.getByRole('link', {name: 'aiscope-logo'})).toHaveAttribute('href', "https://aiscope.net/") :
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
}

describe(Navbar, () => {
  beforeEach(() => {
    mockedAuthState.mockReturnValue([{email: "some-email"} as User, false, undefined])
  });

  it('should have link back to main aiscope page', () => {
    render(<Navbar/>)

    assertNavbarPresent(screen)
  });

  it(' link should display the aiscope logo', () => {
    render(<Navbar/>)

    const homeLink = screen.getByRole('link')

    expect(within(homeLink).getByRole("img")).toHaveAttribute('src', "https://aiscope.net/wp-content/uploads/2019/11/Logo_AiScope-1.png")
  });

  describe('when logged in', () => {

    it('should show the user name', () => {
      render(<Navbar/>)

      expect(screen.getByText("some-email")).toBeInTheDocument()
    });
  });
});