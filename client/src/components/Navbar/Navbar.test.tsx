import { render, Screen, screen, within } from "@testing-library/react";
import React from 'react'
import { Navbar } from "./Navbar";

export const assertNavbarPresent = (screen: Screen, present = true): void => {
  present ?
    expect(screen.getByRole('link', {name: 'aiscope-logo'})).toHaveAttribute('href', "https://aiscope.net/") :
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
}

describe(Navbar, () => {
  it('should have link back to main aiscope page', () => {
    render(<Navbar/>)

    assertNavbarPresent(screen)
  });

  it(' link should display the aiscope logo', () => {
    render(<Navbar/>)

    const homeLink = screen.getByRole('link')

    expect(within(homeLink).getByRole("img")).toHaveAttribute('src', "https://aiscope.net/wp-content/uploads/2019/11/Logo_AiScope-1.png")
  });
});