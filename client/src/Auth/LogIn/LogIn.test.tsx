import React from "react";
import {LogIn} from "./LogIn";
import {fireEvent, render, screen} from "@testing-library/react";
import {MemoryRouter, Route, Routes} from "react-router-dom";
import userEvent from '@testing-library/user-event';
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import {mocked} from "jest-mock";
import {UserCredential} from "@firebase/auth/dist/auth-public"

jest.mock("react-firebase-hooks/auth")
const mockSignIn = mocked(useSignInWithEmailAndPassword, true)

const Dashboard = () => <div>I am the dashboard</div>

describe(LogIn, () => {
  it('should call signInWithEmailAndPassword with email and password when login button clicked', async () => {
    const mockSignInWithEmailAndPassword = jest.fn()
    mockSignIn.mockReturnValue([mockSignInWithEmailAndPassword, undefined, false, undefined])

    render(
      <MemoryRouter>
        <LogIn/>
      </MemoryRouter>
    )

    const emailInput = await screen.getByRole("textbox")
    userEvent.type(emailInput, "test@mail.com")

    const passwordInput = await screen.getByPlaceholderText("password")
    userEvent.type(passwordInput, "my-password")

    const loginButton = await screen.getByRole('button', {name: "LOGIN"})
    fireEvent.click(loginButton)

    expect(mockSignInWithEmailAndPassword).toHaveBeenCalledWith("test@mail.com", "my-password")
  });

  it('should redirect to /dashboard when logged in', async () => {
    mockSignIn.mockReturnValue([jest.fn(), {} as UserCredential, false, undefined])

    render(
      <MemoryRouter initialEntries={["/login"]}>
        <Routes>
          <Route path="/login" element={<LogIn />}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByText("I am the dashboard")).toBeInTheDocument()
  });
});