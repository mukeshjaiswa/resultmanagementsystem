import { async } from '@firebase/util';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { db } from '../../config/firebase';
import Dashboardnavbar from '../Dashboardnavbar'
import Left from '../Left/Left'

export default function Notices() {
    const[semester,setSemester]=useState();
    const[notice,setNotice]=useState();
    const[getsemester,setGetsemester]=useState([])

    const addnotice=async(data)=>{
        try {
            const noticeref=collection(db,'addnotice');
            await addDoc(noticeref,data)
            toast("Notice sucessfully added")
        } catch (error) {
            console.log("error")
        }
    }
    const submit=(e)=>{
        e.preventDefault();
       console.log(semester, notice)
       setSemester('')
       setNotice('')
       const data={
           semester:semester,
           notice:notice,
       }
       addnotice(data)
    }
    useEffect(() => {
      const getsemester = async () => {
        const semesterref = collection(db, 'semester');
        const semesterdata = await getDocs(semesterref);
        const semesters = semesterdata.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setGetsemester(semesters)
      }
      getsemester()
    },[])
  return (
    <div className=' h-[100vh] w-full'>
      <Dashboardnavbar />
      <div className='flex '>
        <Left />
        <div className=' w-full bg-gray-200  border-t  '>
          <div className='bg-white p-4 w-full'>

            <h1 className='text-2xl font-semibold'>Add Notices </h1>
          </div>


          <div className="p-8 w-[80%] shadow-lg bg-white mt-5 rounded-md  m-auto px-10">

            <form className="space-y-6" onSubmit={submit}>
              <div className="flex items-center space-x-4">
                <label className="w-32 text-gray-700">Class</label>
                <select value={semester} onChange={(e) => setSemester(e.target.value)} required className="border rounded-md border-gray-400 p-2 flex-1">
                <option value='' disabled selected> Select Semester</option>
                                   {getsemester.map((data,index)=>(

                                    <option key={index} value={data.semester}>{data.semester}</option>
                                   ))}
                                    
                                    
                </select>
              </div>
              <div className="flex items-center space-x-4">
                <label className="w-32 text-gray-700">Notices</label>
                <textarea cols={5} rows={5} value={notice} onChange={(e) => setNotice(e.target.value)} required type="text" placeholder="Notices" className="border rounded-md border-gray-400 p-2 flex-1" />
              </div>
              

              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                Add Notice
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>
  )
  
}
