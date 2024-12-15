// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Route, Router, Set } from '@redwoodjs/router'

import { useAuth } from './auth'

import CommonLayout from '~/layouts/CommonLayout/CommonLayout'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Set wrap={CommonLayout}>
        <Route path='/login' page={LoginPage} name='login' />
        <Route path='/signup' page={SignupPage} name='signup' />
        <Route path='/' page={HomePage} name='home' />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
