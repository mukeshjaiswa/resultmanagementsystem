import React from 'react'
import Dashboardnavbar from './Dashboardnavbar'
import Left from './Left/Left'
import Rightdashboard from './Rightdashboard'

export default function Dashboard() {
  return (
    <div className='bg-gray-300 h-[100vh]'>
      <Dashboardnavbar/>
      <div className='flex '>
          <Left/>
          <Rightdashboard className='mt-10'/>
      </div>
    </div>
  )
}
