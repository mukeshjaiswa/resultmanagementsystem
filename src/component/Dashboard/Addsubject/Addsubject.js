
import { async } from '@firebase/util';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { db } from '../../config/firebase';
import Dashboardnavbar from '../Dashboardnavbar';
import Left from '../Left/Left';

const Addsubject = () => {
    const [getsemester, setGetsemester] = useState([])
    const [semester, setSemester] = useState('')
    const [subjectname, setSubjectname] = useState('')
    const [subjectcode, setSubjectcode] = useState('')
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
    }, [])
    const addsubjecttoFB = async (data) => {
        try {
            const subjectref = collection(db, "subject");

            const q = query(subjectref, where('subjectcode', '==', subjectcode),
                where('subjectname', '==', subjectname),
                where('semester', '==', semester));
            const subjectdata = await getDocs(q);
            if (!subjectdata.empty) {
                toast.warn("Subject name or Subject Code already exit")
            }
            else {
                await addDoc(subjectref, data)

                setSubjectcode('')
                setSubjectname('')
                setSemester('')
                toast.success("Add subject sucess")

            }
            

        } catch (error) {
            alert("error")
        }
    }
    const addsubject = (e) => {
        e.preventDefault();
        if (subjectname === '' || subjectcode === '' || semester === '') {
            toast.warn("Please enter all fields")
        }
        else {
            const data = {
                semester: semester.toLowerCase(),
                subjectname: subjectname,
                subjectcode: subjectcode,
            }

            addsubjecttoFB(data)
        }
    }
    return (
        <div className=' h-[100vh] w-full'>
            <Dashboardnavbar />
            <div className='flex '>
                <Left />
                <div className=' w-full bg-gray-200  border-t  '>
                    <div className='bg-white p-4 w-full'>

                        <h1 className='text-2xl font-semibold'>Subject Creation </h1>
                    </div>

                    <div className="p-8 w-[80%] shadow-lg bg-white mt-5 rounded-md  m-auto px-10">

                        <form className="space-y-6" onSubmit={addsubject} >

                            <div className="flex items-center space-x-4">
                                <label className="w-32 text-gray-700">Semester</label>
                                <select value={semester} onChange={(e) => setSemester(e.target.value)} required className="border rounded-md border-gray-400 p-2 flex-1">
                                    <option value='' disabled selected> Select Semester</option>
                                    {getsemester.map((item, index) => (

                                        <option key={index} value={item.semester}>{item.semester}</option>
                                    ))}

                                </select>
                            </div>
                            <div className="flex items-center space-x-4">
                                <label className="w-32 text-gray-700">Subject Name</label>
                                <input value={subjectname} onChange={(e) => setSubjectname(e.target.value)} required type="text" placeholder="Eg: Third, Fourth" className="border rounded-md border-gray-400 p-2 flex-1" />
                            </div>
                            <div className="flex items-center space-x-4">
                                <label className="w-32 text-gray-700">Subject Code</label>
                                <input value={subjectcode} onChange={(e) => setSubjectcode(e.target.value)} required type="text" placeholder="Eg: 1, 2, 3" className="border rounded-md border-gray-400 p-2 flex-1" />
                            </div>



                            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Add subject</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Addsubject;
