import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { db } from '../../config/firebase'
import Dashboardnavbar from '../Dashboardnavbar'
import Left from '../Left/Left'
import { IoTrashOutline } from "react-icons/io5";
import { BiSolidEditAlt } from "react-icons/bi";
import { async } from '@firebase/util'
import { toast } from 'react-toastify'
export default function ManageStudents() {
    const [semester, setSemester] = useState('')
    const [students, setStudents] = useState([])
    const[getsemester,setGetsemester]=useState([])
    useEffect(() => {
        const getstudents = async () => {
            try {
                const studentsref = collection(db, "addstudent");

                let semesterref;
                if (semester) {

                    const fetchsemester = query(studentsref, where('semester', '==', semester))
                    semesterref = await getDocs(fetchsemester);

                }
                else {
                    semesterref = await getDocs(studentsref)
                }

                const data = semesterref.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))


                setStudents(data)
            } catch (error) {
                console.log('error')
            }

        }
        getstudents()
    }, [semester])

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
const handlerdelete=async(id)=>{
    await deleteDoc(doc(db,'students',id));
     setStudents(prev=>prev.filter(sub=>sub.id!=id))
     toast.success("Sucessfully deleter")
}
    console.log(students)
   
    return (
        <div className=' h-[100vh] w-full'>
            <Dashboardnavbar />
            <div className='flex '>
                <Left />
                <div className=' w-full bg-gray-200  border-t  '>
                    <div className='bg-white p-4 w-full'>

                        <h1 className='text-2xl font-semibold'>Manage students </h1>
                    </div>


                    <div className="p-8 w-[80%] shadow-lg bg-white mt-5 rounded-md  m-auto px-10">

                        <div className="space-y-6">

                            <div className="flex items-center space-x-2 mt-1">
                                <label className="w-32 text-gray-700"> Semester</label>

                                <select required name="" id="" className="border rounded-md border-gray-400 p-2 flex-1" onChange={(e) => setSemester(e.target.value)}>
                                    <option value='' disabled selected> Select Semester</option>
                                    
                                   {getsemester.map((data,index)=>(

                                        <option key={index} value={data.semester}>{data.semester} </option>
                                   ))}

                                   
                                    
                                </select>
                            </div>


                            { students.length>0? 


                                <table className=' w-[90%]  mt-5 border border-black rounded-sm m-auto  gap-5 '>

                                    <thead className=''>
                                        <tr className='bg-gray-100 w-full'>
                                            <th className=" w-16 border border-gray-300 px-4 py-2 text-left">Sno.</th>
                                            <th className=" w-16 border border-gray-300 px-4 py-2 text-left">Sno.</th>
                                            <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                                            <th className=" w-16 border border-gray-300 px-4 py-2 text-left">Email</th>
                                            <th className=" w-16 border border-gray-300 px-4 py-2 text-left">Semester</th>
                                            <th className=" w-16 border border-gray-300 px-4 py-2 text-left">Action</th>

                                        </tr>
                                    </thead>

                                    <tbody>
                                        {students.map((data, index) => (
                                            <tr key={index}>
                                                <td className="  border border-gray-300 px-4 py-2 text-left">{index+1}</td>
                                                <td className="  border border-gray-300 px-4 py-2 text-left">{data.symbol}</td>
                                                <td className=' border border-gray-300 px-4 py-2 text-left '>{data.name}</td>
                                                <td className=' border border-gray-300 px-4 py-2 text-left '>{data.email}</td>
                                                <td className=' border border-gray-300 px-4 py-2 text-left '>{data.semester}</td>
                                                <td className=' border flex gap-3 text-2xl border-gray-300 px-4 py-2 text-left '>
                                                    <BiSolidEditAlt />
                                                    <IoTrashOutline className='cursor-pointer hover:text-red-500' onClick={(e)=>handlerdelete(data.id)} />

                                                </td>


                                            </tr>
                                        ))}
                                    </tbody>
                               </table>
                               :
                               <p>No Students</p> }
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
