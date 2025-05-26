import React from 'react'
import { GiTireIronCross } from "react-icons/gi";
import { IoPerson } from "react-icons/io5";
import { RiMenuFold3Fill } from "react-icons/ri";
import { HiOutlineLogout } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';

export default function Dashboardnavbar() {
    const navigate=useNavigate()
    const logouthandler=()=>{
navigate('/')
    }
    return (
        <div className='w-full   flex justify-between items-center bg-white  px-4 md:px-8 py-3 '>
            <div className=' flex justify-center  items-center gap-[50px]'>
                <h1 className='text-xl text-gray-500'>SRMS | Admin </h1>
                <div className='hidden md:flex items-center justify-center gap-4'>
                    <RiMenuFold3Fill className='text-2xl' />
                    <IoPerson className='text-xl' />
                    <GiTireIronCross className='text-xl' />
                </div>
               
            </div>

            <div className='flex text-red-500 cursor-pointer ' onClick={logouthandler}>
                <HiOutlineLogout className='text-2xl'/>
                    <h1>LogOut</h1>
                </div>

        </div>
    )
}
