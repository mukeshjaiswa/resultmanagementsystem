import React from 'react'
import { IoIosMenu } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { useState } from 'react';

export default function Navbar() {
    const [menu, setmenu] = useState(false);
    const menuhandler = () => {
        setmenu(!menu);
    }
    return (
        <div>


            <div className=' w-full bg-black sticky top-0 text-white h-auto py-2 px-5 flex justify-between items-center '>

                <h1 className='cursor-pointer text-xl'><a href="/"> SRMS-(School Results Management System)</a>
               </h1>
                <nav className='hidden md:flex  gap-4'>
                    <li className='list-none text-xl p-2 hover:bg-white rounded-md hover:text-black '><a href="/">Home</a></li>
                    {/* <li className='list-none text-xl p-2 hover:bg-white rounded-md hover:text-black '><a href="findresult">Students</a></li> */}
                    <li className='list-none text-xl p-2 hover:bg-white rounded-md hover:text-black '><a href="admin">Admin</a></li>
                </nav>
                {menu ?
            <RxCross1 className='font-semibold text-2xl cursor-pointer md:hidden' onClick={menuhandler} />
            : <IoIosMenu className='font-semibold text-2xl cursor-pointer md:hidden' onClick={menuhandler} />
  }
            </div>
            {menu?
            
            <div className=' w-[200px] absolute    right-0 rounded-b-md flex flex-col items-start px-5 bg-gray-200 justify-ends'>
                <nav className=' md:hidden  gap-4'>
                    <li className='list-none text-xl block p-2 hover:bg-white rounded-md hover:text-black '><a href="/">Home</a></li>
                    {/* <li className='list-none text-xl block p-2 hover:bg-white rounded-md hover:text-black '><a href="findresult">Students</a></li> */}
                    <li className='list-none text-xl block p-2 hover:bg-white rounded-md hover:text-black '><a href="admin">Admin</a></li>
                </nav>
            </div>
            :''}
        </div>
    )
}
