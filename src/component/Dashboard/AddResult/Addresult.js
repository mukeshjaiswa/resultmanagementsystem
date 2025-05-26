import { addDoc, collection, getDoc, getDocs, query, where } from 'firebase/firestore'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Dashboardnavbar from '../Dashboardnavbar'
import Left from '../Left/Left'

import { db } from '../../config/firebase'
import { toast } from 'react-toastify'

export default function Addresult() {
    const [selectsemester, setselectsemester] = useState('');
    const [name, setName] = useState('');
    const [symbol, setSymbols] = useState('');
    const [marksList, setMarksList] = useState([]);
   
    const [semesterlist, setSemesterlist] = useState([]);
    const [subject, setSubject] = useState([]);

    const checksymbol = async () => {
        const studentref = collection(db, 'addstudent');
        const matchQuery = query(
            studentref,
            where('symbol', '==', symbol),
            where('semester', '==', selectsemester)
        );

        const matchstudents = await getDocs(matchQuery);

        if (!matchstudents.empty) {
            const Studentdata = matchstudents.docs[0].data();
            const studentsname = Studentdata.name;
            const result = {
                name: studentsname,
                semester: selectsemester,
                symbol: symbol,
                subjects: marksList,
            }
            const resultref = collection(db, "result");
            const usercheck = query(resultref,
                where('symbol', '==', symbol),
                where('semester', '==', selectsemester.toLowerCase()));
            const usermatch = await getDocs(usercheck)
            if (!usermatch.empty) {
                toast.warn("Symbol number is already exit")
            }
            else {
                await addDoc(resultref, result)
                toast.success("Add result sucessfuly");
                setSymbols('')

                setMarksList('');
            }
        }
        else {
            alert("Symbols not found or semester not match")
        }
    }
    useEffect(() => {
        const getstudents = async () => {
            try {
                const subjectref = collection(db, "subject");

                const fetchsemester = query(subjectref, where('semester', '==', selectsemester));
                const semesterref = await getDocs(fetchsemester);

                const data = semesterref.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))

                setSubject(data)
            } catch (error) {
                console.log('Error fetching subjects:', error);
            }
        }

        if (selectsemester) {
            getstudents();
        }
    }, [selectsemester])

    const submit = (e) => {
        e.preventDefault();
        if (marksList.some(s=>s.marks>100)) {
            alert("Marks is not greater than 100")
        } else {
            checksymbol();
        }
    }
    useEffect(() => {
        const getsemester = async () => {
            const semesterref = collection(db, 'semester');
            const semesterdata = await getDocs(semesterref);
            const semesters = semesterdata.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            setSemesterlist(semesters)
        }
        getsemester()
    }, [])

    return (
        <div className=' h-[100vh] w-full'>
            <Dashboardnavbar />
            <div className='flex '>
                <Left />
                <div className=' w-full bg-gray-200  border-t  '>
                    <div className='bg-white p-4 w-full'>

                        <h1 className='text-2xl font-semibold'>Result Declear</h1>
                    </div>


                    <div className="p-8 w-[60%] shadow-lg bg-white mt-5 rounded-md  m-auto px-10">

                        <form className="space-y-6" onSubmit={submit}>
                            <div className="flex items-center space-x-2 mt-1">
                                <label className="w-32 text-gray-700"> Semester</label>

                                <select required name="" id="" className="border rounded-md border-gray-400 p-2 flex-1" onChange={(e) => setselectsemester(e.target.value)}>
                                    <option value='' disabled selected> Select Semester</option>
                                    {semesterlist.map((data, index) => (

                                        <option key={index} value={data.semester}>{data.semester}</option>
                                    ))}

                                </select>
                            </div>

                            <div className="flex items-center ">
                                <label className="w-32 text-gray-700">Symbol number</label>
                                <input value={symbol} type="number" placeholder="Symbol" className="border rounded-md border-gray-400 p-2 flex-1" onChange={(e) => setSymbols(e.target.value)} required />
                            </div>
                            {subject.map((item, index) => (
                                selectsemester === item.semester ? (

                                    <div key={index} className=''>



                                        <div className="flex items-center space-x-2 mt-1">
                                            <label className="w-32 text-gray-700">{item.subjectname}</label>
                                            <input type="number" placeholder="marks" className="border rounded-md border-gray-400 p-2 flex-1" onChange={(e) => {
                                                const newMarks = [...marksList];
                                                newMarks[index] = {
                                                    subject: item.subjectname,
                                                    mark: parseInt(e.target.value),
                                                };
                                                setMarksList(newMarks);
                                            }} required />
                                        </div>
                                    </div>
                                )
                                    :
                                    ""
                            ))}
                            <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">Add Results</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
