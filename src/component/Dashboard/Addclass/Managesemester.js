import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore'
import React from 'react'
import { BiSolidEditAlt } from 'react-icons/bi'
import { IoTrashOutline } from 'react-icons/io5'
import { useState, useEffect } from 'react'
import { db } from '../../config/firebase'
import Dashboardnavbar from '../Dashboardnavbar'
import Left from '../Left/Left'
import { async } from '@firebase/util'
import { toast } from 'react-toastify'

export default function Managesemester() {


    const [getsemester, setGetsemester] = useState([])
    useEffect(() => {
        const getstudents = async () => {
            try {
                const semesterref = collection(db, "semester");
                const semesterdata = await getDocs(semesterref);
                const semester = semesterdata.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
                setGetsemester(semester);
            }
            catch {

            }
        }
        getstudents()
    }, [])
    const handlerdelete = async (id) => {
        await deleteDoc(doc(db, "semester", id));
        setGetsemester((prev) => prev.filter(sem => sem.id !== id))
        toast.success("Sucessfully delete")
    }

    return (
        <div className=' h-[100vh] w-full'>
            <Dashboardnavbar />
            <div className='flex '>
                <Left />
                <div className=' w-full bg-gray-200  border-t  '>
                    <div className='bg-white p-4 w-full'>

                        <h1 className='text-2xl font-semibold'>Manage Suject </h1>
                    </div>


                    <div className="p-8 w-[80%] shadow-lg bg-white mt-5 rounded-md  m-auto px-10">

                        <div className="space-y-6">




                            {getsemester.length > 0 ?


                                <table className=' w-[90%]  mt-5 border border-black rounded-sm m-auto  gap-5 '>

                                    <thead className=''>
                                        <tr className='bg-gray-100 w-full'>
                                            <th className=" w-16 border border-gray-300 px-4 py-2 text-left">Sno.</th>
                                            <th className="border border-gray-300 px-4 py-2 text-left">Semester name</th>
                                            <th className=" w-16 border border-gray-300 px-4 py-2 text-left">Action</th>

                                        </tr>
                                    </thead>

                                    <tbody>
                                        {getsemester.map((data, index) => (
                                            <tr key={index}>
                                                <td className="  border border-gray-300 px-4 py-2 text-left">{index + 1}</td>
                                                <td className=' border border-gray-300 px-4 py-2 text-left '>{data.semester.toUpperCase()}</td>

                                                <td className=' border flex gap-3 text-2xl border-gray-300 px-4 py-2 text-left '>
                                                    <BiSolidEditAlt />
                                                    <IoTrashOutline className='cursor-pointer hover:text-red-500' onClick={()=>handlerdelete(data.id)} />

                                                </td>


                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                :
                                <p>No Subject Found</p>}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
