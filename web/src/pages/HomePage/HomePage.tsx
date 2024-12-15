import { Metadata } from '@redwoodjs/web'

const HomePage = () => {
  return (
    <>
      <Metadata title='Home' description='Home page' />

      <main className='flex min-h-screen flex-col items-center justify-start bg-zinc-800 px-4 py-16'>
        <div className='text-center'>
          <h1 className='mb-4 text-4xl font-bold text-zinc-200'>Welcome to Your Task Manager</h1>
          <p className='text-zinc-400'>Manage your tasks efficiently and stay organized.</p>
        </div>
        <p className='mt-4 text-xl'>
          There is no tasks for the moment, you&apos;ll be able to create them soon.
        </p>
      </main>
    </>
  )
}

export default HomePage
