import React from 'react'
import { useNavigate } from 'react-router-dom'

const Error404 = () => {

  let navigate = useNavigate()

  return (
    <div className='h-screen w-full flex flex-col justify-center items-center bg-gradient-to-tr from-blue-800 to-purple-700'>
      <p className=' text-6xl'>PLZ RETREAT TO LOGIN SOMETHING IS BROKEN ...</p>
      <button className=' rounded-xl mt-10 text-xl bg-green-400 hover:bg-green-500 px-4 py-2' onClick={() => {navigate('/login')}} >Back to Login</button>
    </div>
  )
}

export default Error404