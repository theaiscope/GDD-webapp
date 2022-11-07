import { render, screen } from '@testing-library/react'
import React from 'react'
import { ActionsBar } from './ActionsBar'

describe(ActionsBar, () => {
  it('should render the Save button', () => {
    render(<ActionsBar disabled={false} />)

    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument()
  })

  it('should render the Skip button', () => {
    render(<ActionsBar disabled={false} />)

    expect(screen.getByRole('button', { name: 'Skip' })).toBeInTheDocument()
  })

  it('should render the Invalid button', () => {
    render(<ActionsBar disabled={false} />)

    expect(screen.getByRole('button', { name: 'Invalid' })).toBeInTheDocument()
  })
})
