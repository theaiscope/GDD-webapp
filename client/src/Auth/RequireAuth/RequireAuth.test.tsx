import React from "react";
import {RequireAuth} from "./RequireAuth";
import { render, screen } from '@testing-library/react';
import {Location, MemoryRouter, Route, Routes, useLocation} from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";
import { mocked } from 'jest-mock';
import {User} from "@firebase/auth";

jest.mock("react-firebase-hooks/auth")

const mockedAuthState = mocked(useAuthState, true);

const homeText = "Im at home"
const protectedText = "Im protected"

const HomeElement = () => <div>{homeText}</div>
const ProtectedElement = () => <div>{protectedText}</div>

describe(RequireAuth, () => {
  it('should redirect to home if no user', () => {
    mockedAuthState.mockReturnValue([undefined, false, undefined])

    render(
      <MemoryRouter initialEntries={["/protected"]}>
        <Routes>
          <Route path="/" element={<HomeElement />}/>
          <Route element={<RequireAuth />}>
            <Route path="/protected" element={<ProtectedElement/>}/>
          </Route>
        </Routes>
      </MemoryRouter>
    )

    expect(screen.queryByText(homeText)).toBeInTheDocument()
  });

  it('should save location if no user', () => {
    mockedAuthState.mockReturnValue([undefined, false, undefined])

    const HomeElementWithPreviousLocation = () => {
      const location = useLocation()
      const state = location.state as { from: Location };

      return (
        <p>Previous location: {state.from.pathname}</p>
      )
    }

    render(
      <MemoryRouter initialEntries={["/protected"]}>
        <Routes>
          <Route path="/" element={<HomeElementWithPreviousLocation />}/>
          <Route element={<RequireAuth />}>
            <Route path="/protected" element={<ProtectedElement/>}/>
          </Route>
        </Routes>
      </MemoryRouter>
    )

    expect(screen.queryByText("Previous location: /protected")).toBeInTheDocument()
  });

  it('should go to route if there is a user', () => {
    mockedAuthState.mockReturnValue([{} as User, true, undefined])

    render(
      <MemoryRouter initialEntries={["/protected"]}>
        <Routes>
          <Route path="/" element={<HomeElement />} />
          <Route element={<RequireAuth />}>
            <Route path="/protected" element={<ProtectedElement/>}/>
          </Route>
        </Routes>
      </MemoryRouter>
    )

    expect(screen.queryByText(protectedText)).not.toBeInTheDocument()
  });

  it('should return nothing if auth is still loading', () => {
    mockedAuthState.mockReturnValue([undefined, true, undefined])

    render(
      <MemoryRouter initialEntries={["/protected"]}>
        <Routes>
          <Route path="/" element={<HomeElement />} />
          <Route element={<RequireAuth />}>
            <Route path="/protected" element={<ProtectedElement/>}/>
          </Route>
        </Routes>
      </MemoryRouter>
    )

    expect(screen.queryByText(protectedText)).not.toBeInTheDocument()
    expect(screen.queryByText(homeText)).not.toBeInTheDocument()
  });
});