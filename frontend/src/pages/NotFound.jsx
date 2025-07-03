import React from 'react'
import {Link} from 'react-router'

const NotFound = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-center items-center">
      <h1 className='text-2xl text-center'>404 Error<br/>Page Not Found</h1>
      <Link to="/" className='mt-8 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer px-4 py-2 rounded-md'>Get back to Home</Link>
    </div>
  )
}

export default NotFound
