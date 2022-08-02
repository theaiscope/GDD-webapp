import React, { ReactElement } from 'react'
import { signOut } from 'firebase/auth'
import { firebaseAuth } from '../../services/firebaseService'

type Props = {
  className?: string
}

export const LogOut = ({ className }: Props): ReactElement => (
  <button className={className} onClick={() => signOut(firebaseAuth)}>
    Logout
  </button>
)
