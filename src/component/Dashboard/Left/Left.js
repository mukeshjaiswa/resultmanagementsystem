import React from 'react'
import { AiFillDashboard } from "react-icons/ai";
import { RiArrowDropRightLine, RiArrowDropUpLine } from "react-icons/ri";
import { MdViewSidebar } from "react-icons/md";
import { useState } from 'react';

import { data } from './LeftData'
import { Link } from 'react-router-dom';


export default function Left() {
   
    const [arrow, setArrow] = useState(null);
    const arrowhandler = (itemName) => {
        setArrow((prev) => (prev === itemName ? null : itemName))
    }

    return (
        <div className='w-[380px] h-[91vh] bg-gray-800 hidden sm:block md:block px-4 py-5  '>
            <h1 className='text-gray-400 text-md  font-semibold'>MAIN CATEGORY</h1>
            <div className='flex items-center mt-5 text-lg text-white gap-3'>
                <AiFillDashboard />
                <a href='dashboard'>Dashboard</a>
            </div>
            <h1 className='text-gray-400 mt-5  text-md capitalize font-semibold'>APPEARANCE</h1>
            {data.map((item, index) => (
                <>

                    <div key={index} className='flex justify-between items-center mt-5 text-lg text-white gap-3'>
                        <div className='flex items-center gap-3'>

                            <item.icons />
                            <h1>{item.title} </h1>
                        </div>

                        <div className='' onClick={() => arrowhandler(`${item.name}`)}>
                            {arrow === `${item.name}` ?

                                <RiArrowDropUpLine className='text-2xl cursor-pointer' />
                                :
                                <RiArrowDropRightLine className='text-2xl cursor-pointer' />
                            }
                        </div>


                    </div>
                    {arrow == `${item.name}` ?
                    <>
                        <div className='flex  text-white items-center gap-3 px-10 mt-3' >

                            <item.icons />
                            <Link to={item.route} className='cursor-pointer hover:text-green-500 transition'>
                                {item.add}
                            </Link>

                        </div>
                        {item.manageicon?
                         <div className='flex  text-white items-center gap-3 px-10 mt-3' >

                         <item.manageicon />
                         <Link to={item.manageroute} className='cursor-pointer hover:text-green-500 transition'>
                             {item.manage}
                         </Link>
                     </div>
                         :''
                        
                         }
                        

                     </>
                        : ""}
                </>
            ))}
            <div className='flex justify-between items-center mt-5 text-lg text-white gap-3'>
                <div className='flex items-center gap-3'>

                    <MdViewSidebar className='text-white' />
                    <h1>Admin password change</h1>
                </div>


            </div>
        </div>
    )
}
