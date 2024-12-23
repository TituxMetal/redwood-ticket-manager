import { PrivateSet, Route, Router, Set } from '@redwoodjs/router'

import { useAuth } from './auth'

import CommonLayout from '~/layouts/CommonLayout/CommonLayout'
import TicketLayout from '~/layouts/TicketLayout/TicketLayout'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Set wrap={CommonLayout}>
        <Route path='/login' page={LoginPage} name='login' />
        <Route path='/signup' page={SignupPage} name='signup' />
        <Route path='/' page={HomePage} name='home' />
        <Set wrap={TicketLayout}>
          <PrivateSet unauthenticated='login'>
            <Route path='/tickets/new' page={NewTicketPage} name='newTicket' />
            <Route path='/tickets/{id}' page={SingleTicketPage} name='singleTicket' />
            <Route path='/tickets' page={TicketsPage} name='tickets' />
          </PrivateSet>
        </Set>
        <Route notfound page={NotFoundPage} />
      </Set>
    </Router>
  )
}

export default Routes
