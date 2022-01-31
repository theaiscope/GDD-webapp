import React from 'react';
import { render, screen } from '@testing-library/react';
import { App } from './App';
import { MemoryRouter } from "react-router-dom";
import { useAuthState, useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { User } from "@firebase/auth/dist/auth-public"
import { mocked } from 'jest-mock';
import { assertNavbarPresent } from "./components/Navbar/Navbar.test";

jest.mock("react-firebase-hooks/auth")

const mockedAuthState = mocked(useAuthState, true);
const mockedSignIn = mocked(useSignInWithEmailAndPassword, true);

describe(App, () => {
  it('should render the login screen when not authenticated', async () => {
    mockedSignIn.mockReturnValue([jest.fn(), undefined, false, undefined])

    render(
      <MemoryRouter>
        <App/>
      </MemoryRouter>
    )

    expect(screen.queryByText("Login")).toBeInTheDocument()
  });

  it('should render the dashboard when authenticated', async () => {
    mockedAuthState.mockReturnValue([{email: "some-email"} as User, false, undefined])

    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <App/>
      </MemoryRouter>
    )

    expect(screen.queryByText("I am the Dashboard - please implement me")).toBeInTheDocument()
    expect(screen.queryByText("Login")).not.toBeInTheDocument()
  });

  it('should redirect to login page when not authenticated', async () => {
    mockedAuthState.mockReturnValue([undefined, false, undefined])
    mockedSignIn.mockReturnValue([jest.fn(), undefined, false, undefined])

    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <App/>
      </MemoryRouter>
    )

    expect(screen.queryByText("Login")).toBeInTheDocument()
    expect(screen.queryByText("Dashboard")).not.toBeInTheDocument()
  });

  it('should show 404 message for unknown paths', async () => {
    render(
      <MemoryRouter initialEntries={["/something-weird"]}>
        <App/>
      </MemoryRouter>
    );

    expect(screen.queryByText("Login")).not.toBeInTheDocument()
    expect(screen.queryByText("Nothing to see here")).toBeInTheDocument()
  });

  describe('LayoutsWithNavbar', () => {
    it('should show the navbar on login screen', () => {
      mockedSignIn.mockReturnValue([jest.fn(), undefined, false, undefined])

      render(
        <MemoryRouter>
          <App/>
        </MemoryRouter>
      )

      assertNavbarPresent(screen)
    });

    it('should show the navbar on dashboard', () => {
      mockedAuthState.mockReturnValue([{email: "some-email"} as User, false, undefined])

      render(
        <MemoryRouter initialEntries={["/dashboard"]}>
          <App/>
        </MemoryRouter>
      )

      assertNavbarPresent(screen)
    });

    it('should not show the navbar on 404', () => {
      render(
        <MemoryRouter initialEntries={["/something-weird"]}>
          <App/>
        </MemoryRouter>
      );

      assertNavbarPresent(screen, false)
    });
  });
});