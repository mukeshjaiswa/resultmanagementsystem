import React from 'react'
import { HiMiniUserGroup } from "react-icons/hi2";
import { BiSolidCoupon } from "react-icons/bi";
import { FaBuildingColumns, FaFile } from "react-icons/fa6";
import { FiFileText } from "react-icons/fi";
import { useEffect } from 'react';
import { collection, doc, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useState } from 'react';
import { async } from '@firebase/util';

export default function () {
    const[totalstudent,setTotalstudent]=useState();
    const[totalsubject,setTotalsubject]=useState();
    const[totalsemester,setTotalsemester]=useState();
    useEffect(() => {
        const getuser =async () => {
            const Studentsref = collection(db, "addstudent");
            const studentdata = await getDocs(Studentsref);
            studentdata.docs.forEach((data,index)=>{

                setTotalstudent(`${index+1}` ,data.data())
            })
            const subjectref=collection(db,"subject");
            const subjectdata=await getDocs(subjectref);
            subjectdata.docs.forEach((data,index)=>{
                setTotalsubject(`${index+1}`,data.data())
            })
            const semesterref=collection(db,"semester");
            const semesterdata=await getDocs(semesterref);
            semesterdata.docs.forEach((data,index)=>{
                setTotalsemester(`${index+1}`,data.data())
            })

        }
        getuser()
    }, [])
   
   
    return (
        <div className='w-full  '>
            <div className='bg-white p-5 border-t  '>
                <h1 className='text-2xl font-semibold'>Dashboard</h1>

            </div>
            <div className='flex flex-col flex-wrap md:flex-row justify-center items-center gap-3 mt-6'>
                <div className='w-[70%] md:w-[45%] py-5 rounded-lg bg-blue-500 flex justify-between items-center px-0'>
                    <HiMiniUserGroup size={80} className=' text-gray-200 opacity-50' />
                    <a href='/managestudents' className='flex flex-col justify-between text-white text-xl px-5'>
                        <h1 className='text-end'>{totalstudent}</h1>
                        <h1 className='text-slate-200'>Total Students</h1>

                    </a>

                </div>
                <div className='w-[70%] md:w-[45%] py-5 rounded-lg bg-red-500 flex justify-between items-center px-0'>
                    <BiSolidCoupon size={80} className=' text-gray-200 opacity-50' />
                    <a href='/manage-subject' className='flex flex-col justify-between text-white text-xl px-5'>
                        <h1 className='text-end'>{totalsubject}</h1>
                        <h1 className='text-slate-200'>Subject Listed</h1>

                    </a>

                </div>
                <div className='w-[70%] md:w-[45%] py-5 rounded-lg bg-yellow-500 flex justify-between items-center px-0'>
                    <FaBuildingColumns size={80} className=' text-gray-200 opacity-50' />
                    <a href='' className='flex flex-col justify-between text-white text-xl px-5'>
                        <h1 className='text-end'>{totalsemester}</h1>
                        <h1 className='text-slate-200'>Total semester listed</h1>

                    </a>

                </div>
                <div className='w-[70%] md:w-[45%] py-5 rounded-lg bg-green-500 flex justify-between items-center px-0'>
                    <FiFileText size={80} className=' text-gray-200 opacity-50' />
                    <div className='flex flex-col justify-between text-white text-xl px-5'>
                        <h1 className='text-end'>{totalsemester}</h1>
                        <h1 className='text-slate-200'>Total class listed</h1>

                    </div>

                </div>
            </div>
        </div>
    )
}
