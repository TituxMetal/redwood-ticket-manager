// import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

const SingleTicketPage = () => {
  return (
    <>
      <Metadata title='SingleTicket' description='SingleTicket page' />

      <h1>SingleTicketPage</h1>
      <p>
        Find me in <code>./web/src/pages/SingleTicketPage/SingleTicketPage.tsx</code>
      </p>
      {/*
          My default route is named `singleTicket`, link to me with:
          `<Link to={routes.singleTicket()}>SingleTicket</Link>`
      */}
    </>
  )
}

export default SingleTicketPage
