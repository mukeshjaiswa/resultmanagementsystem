import React from 'react'

export default function Footer() {
  return (
    <div className='w-full bg-black text-white flex flex-col md:flex-row p-5 mt-5 justify-center items-center h-auto'>
        <p>Copyright &copy;   </p>
        <p>Student Result Management system </p>
        <p>{new Date().getFullYear()}</p>
    </div>
  )
}
