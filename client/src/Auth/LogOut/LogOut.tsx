import React, { ReactElement } from 'react'
import { signOut } from 'firebase/auth'
import { config } from '../config'

type Props = {
  className?: string
}

export const LogOut = ({ className }: Props): ReactElement => (
  <button className={className} onClick={() => signOut(config)}>
    Logout
  </button>
)
