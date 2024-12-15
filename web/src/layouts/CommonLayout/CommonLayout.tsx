import { Link, routes } from '@redwoodjs/router'

import { useAuth } from '~/auth'

type CommonLayoutProps = {
  children?: React.ReactNode
}

const CommonLayout = ({ children }: CommonLayoutProps) => {
  const { currentUser, isAuthenticated, logOut } = useAuth()

  return (
    <>
      <header className='fixed top-0 w-full bg-zinc-900 p-4'>
        <nav className='mx-auto flex max-w-7xl items-center justify-between gap-4'>
          <h2 className='text-2xl font-bold'>
            <Link to='/'>Redwood Starter</Link>
          </h2>
          <ul className='flex items-center gap-4'>
            {isAuthenticated ? (
              <>
                <li>
                  <Link to={routes.home()}>{currentUser.name}</Link>
                </li>
                <li>
                  <button type='button' onClick={logOut}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to={routes.signup()}>Signup</Link>
                </li>
                <li>
                  <Link to={routes.login()}>Login</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>

      <main className='flex min-h-screen items-center justify-center bg-zinc-800 px-4'>
        <div className='w-full max-w-7xl py-16'>{children}</div>
      </main>

      <footer className='fixed bottom-0 w-full bg-zinc-900 p-4'>
        <div className='mx-auto max-w-7xl text-center text-zinc-400'>
          Built with ❤️ and lots of coffee by{' '}
          <a
            href='https://github.com/TituxMetal'
            target='_blank'
            rel='noopener noreferrer'
            className='text-zinc-300 hover:text-zinc-400'
          >
            TituxMetal
          </a>
        </div>
      </footer>
    </>
  )
}

export default CommonLayout
