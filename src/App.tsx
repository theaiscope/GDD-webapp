import React, {ReactElement} from 'react'
import {BrowserRouter as Router, Route, Routes, Outlet} from 'react-router-dom'
import {Dashboard, Navbar} from './components'
import {LogIn, RequireAuth} from './Auth'
import styles from './App.module.css'

export const App = (): ReactElement => (
    <Routes>
      <Route path="/" element={<LayoutsWithNavbar/>}>
        <Route path="/" element={<LogIn/>}/>
        <Route element={<RequireAuth/>}>
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Route>
      </Route>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
)

export const AppWithRouter = (): ReactElement => (
    <div className={styles.app}>
      <Router>
        <App/>
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
      <Navbar/>
      <Outlet/>
    </>
)
