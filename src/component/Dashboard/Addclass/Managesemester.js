import { collection, deleteDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import React from 'react'
import { BiSolidEditAlt } from 'react-icons/bi'
import { IoTrashOutline } from 'react-icons/io5'
import { useState, useEffect } from 'react'
import { db } from '../../config/firebase'
import Dashboardnavbar from '../Dashboardnavbar'
import Left from '../Left/Left'
import { async } from '@firebase/util'
import { toast } from 'react-toastify'
import { RxCross1 } from "react-icons/rx";

export default function Managesemester() {

    const [semester, setSemester] = useState('')
    const [getsemester, setGetsemester] = useState([])
    const [editid, setEditid] = useState(null);
    const [edit, setEdit] = useState(true);
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
    const handleredit = (data) => {
        setEdit(edit => !edit);
        setSemester(data.semester);
       setEditid(data.id)

    }
    const onclose = () => {
        setEdit(!edit)
    }

    const handlerupdate = async (e) => {
        e.preventDefault();
        try {
            const updateref = doc(db, "semester", editid);
            await updateDoc(updateref, { semester });
            toast.success("Sucessfully update semester")
            setGetsemester((prev) => prev.map((item) => item.id === editid ? { ...item, semester } : item))

            setSemester('');
            setEdit(true);
            setEditid(null);
        } catch (error) {
            toast.error("Failed to update semester");
        }

    }
    return (
        <div className=' h-[100vh] w-full'>
            <Dashboardnavbar />
            <div className='flex '>
                <Left />
                {edit ?

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
                                                        <BiSolidEditAlt className='cursor-pointer hover:text-green-400' onClick={() => handleredit(data)} />
                                                        <IoTrashOutline className='cursor-pointer hover:text-red-500' onClick={() => handlerdelete(data.id)} />

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
                    : <div className='w-[400px] relative h-[300px] bg-white border rounded shadow-md m-auto'>
                        <div className='absolute top-4 right-4'>
                            <RxCross1 className='text-2xl cursor-pointer ' onClick={onclose} />
                        </div>
                        <div className="p-8 w-full mt-5 ">

                            <form className="space-y-4" onSubmit={handlerupdate}>

                                <div>
                                    <label className="block text-gray-700">Semester Name</label>
                                    <input value={semester} required type="text" onChange={(e) => setSemester(e.target.value)} placeholder="Eg: Third, Fourth" className="border border-gray-400 p-2 w-full" />
                                </div>

                                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Update</button>
                            </form>
                        </div>
                    </div>
                }

            </div>
        </div>
    )
}
