import React from 'react'
import { useNavigate } from 'react-router-dom'

function Navbar() {

  const navigate = useNavigate();


  return (
    <div className='w-full flex justify-around'>
        <div className='flex items-center justify-start w-full p-4 text-neutral-800'>
            <h2 className='text-xl font-bold mr-4 ml-6'>MovieRec</h2>
            <ul className='flex gap-12'>
                <li
                onClick={() => navigate('/')}
                className='cursor-pointer hover:text-neutral-600 transition duration-200 ease-in-out'
                >Home</li>
                <li
                onClick={() => navigate('/recommend')}
                className='cursor-pointer hover:text-neutral-600 transition duration-200 ease-in-out'
                >Recommend</li>
                <li
                onClick={() => navigate('/ann')}
                className='cursor-pointer hover:text-neutral-600 transition duration-200 ease-in-out'
                >ANN</li>
                <li
                onClick={() => navigate('/project-page')}
                className='cursor-pointer hover:text-neutral-600 transition duration-200 ease-in-out'
                >Project Page</li>
                
            </ul>
        </div>
    </div>
  )
}

export default Navbar