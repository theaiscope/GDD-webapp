import React from 'react'
import { render, screen } from '@testing-library/react'
import { Footer } from './Footer'

describe(Footer, () => {
  const someEmail = 'some-email'

  it('should have an email link for forgotten passwords', () => {
    render(<Footer contactAddress={someEmail} />)

    expect(screen.getByRole('link', { name: 'Forgot your password?' })).toHaveAttribute('href', `mailto:${someEmail}`)
  })

  it('should have alink to the privacy policy', () => {
    render(<Footer contactAddress={someEmail} />)

    expect(screen.getByRole('link', { name: 'Privacy policy' })).toHaveAttribute(
      'href',
      `https://aiscope.net/privacy-policy/`,
    )
  })
})
