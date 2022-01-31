import React, { ReactElement } from 'react'
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom'
import { Dashboard, Navbar } from './components'
import { LogIn, RequireAuth } from './Auth'

export const App = (): ReactElement => (
  <Routes>
    <Route path="/" element={<LayoutsWithNavbar />}>
      <Route path="/" element={<LogIn />} />
      <Route element={<RequireAuth />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Route>
    <Route path="*" element={<NotFound />} />
  </Routes>
)

export const AppWithRouter = (): ReactElement => (
  <div className="App">
    <Router>
      <App />
    </Router>
  </div>
)

const NotFound = (): ReactElement => (
  <>
    <h3>Nothing to see here</h3>
  </>
)

const LayoutsWithNavbar = () => (
  <>
    <Navbar />
    <Outlet />
  </>
)
