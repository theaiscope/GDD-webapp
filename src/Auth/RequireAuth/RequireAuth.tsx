import React, { ReactElement } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { firebaseService } from '../../services/firebaseService'

export const RequireAuth = (): ReactElement => {
  const [user, loading] = useAuthState(firebaseService)

  if (loading) {
    return <></>
  }

  if (!user) {
    return <Navigate to="/" state={{ from: useLocation() }} />
  }

  return <Outlet />
}
