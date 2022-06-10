import React, { ReactElement } from 'react'
import { signOut } from 'firebase/auth'
import { firebaseService } from '../../services/firebaseService'

type Props = {
  className?: string
}

export const LogOut = ({ className }: Props): ReactElement => (
  <button className={className} onClick={() => signOut(firebaseService)}>
    Logout
  </button>
)
