import React from 'react'
import Navbar from '../Layout/Navbar'
import image from '../assets/images.jpeg'
import Footer from '../Layout/Footer'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import { db } from '../config/firebase'
import { useState } from 'react'
import { useEffect } from 'react'

export default function Home() {
    const [notice, setNotice] = useState([]);
   useEffect(()=>{
       const getnotice=async()=>{
           const noticeref=collection(db,'addnotice')
           const getnoticeref=await getDocs(noticeref);
           const noticedata=getnoticeref.docs.map(doc=>doc.data())
           setNotice(noticedata)
       }
       getnotice();
   },[])
    return (
        <div>
            <Navbar />
            <div className=' bg-red h-full flex flex-col justify-center items-center '>
                <img src={image} alt="results" className='w-full h-[350px] center md:h-[350px] object-fill place-items-center ' />
            </div>
            <div className=' w-[300px] md:w-[600px] m-auto px-5 md:px-10 py-10'>
                <div className=''>
                    <h1 className='text-2xl font-semibold'>Notices Boards</h1>
                    <hr className='bg-gray-300 mt-2 mb-4  ' />
                </div>

                {notice.map((data, index) => (
                    <div key={index} className='gap-2'>
                        <li > <a href="/findresult" className='text-blue-700 font-sans underline cursor-pointer'> {data.semester} {data.notice} </a></li>


                    </div>
                ))}

            </div>
            <Footer />
        </div>
    )
}
