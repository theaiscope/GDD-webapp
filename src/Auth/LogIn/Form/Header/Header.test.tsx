import React from 'react'
import { render, screen } from '@testing-library/react'
import { Header } from './Header'

describe(Header, () => {
  it('should have a link with the email address on it', () => {
    const emailAddress = 'some-email'

    render(<Header contactAddress={emailAddress} />)

    expect(screen.getByRole('link')).toHaveAttribute('href', `mailto:${emailAddress}`)
  })
})
