import { addDoc, collection, getDoc, getDocs, query, where } from 'firebase/firestore'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Dashboardnavbar from '../Dashboardnavbar'
import Left from '../Left/Left'
import { data } from './Semester'
import { db } from '../../config/firebase'

export default function Addresult() {
    const [selectsemester, setselectsemester] = useState('');
    const[name,setName]=useState('');
    const [symbol, setSymbols] = useState('');
    const [subject1, setSubject1] = useState('');
    const [namesubject1, setNameSubject1] = useState('');
    const [namesubject2, setNameSubject2] = useState('');
    const [namesubject3, setNameSubject3] = useState('');
    const [namesubject4, setNameSubject4] = useState('');
    const [namesubject5, setNameSubject5] = useState('');
    const [projectname, setProjectname] = useState('');

    const [subject2, setSubject2] = useState('');
    const [subject3, setSubject3] = useState('');
    const [subject4, setSubject4] = useState('');
    const [subject5, setSubject5] = useState('');
    const [project, setProject] = useState([]);
    const[semesterlist,setSemesterlist]=useState([]);


    const checksymbol = async () => {
        const studentref = collection(db, 'addstudent');
        const matchQuery = query(
            studentref,
            where('symbol', '==', symbol),
            where('semester', '==', selectsemester)
        );

        const matchstudents = await getDocs(matchQuery);
      
        if (!matchstudents.empty) {
            const Studentdata=matchstudents.docs[0].data();
            const studentsname=Studentdata.name;
          

            const result = {
                name:studentsname,
                semester: selectsemester,
                symbol: symbol,
                subjects: [
                    { subject: namesubject1, mark: parseInt(subject1) },
                    { subject: namesubject2, mark: parseInt(subject2) },
                    { subject: namesubject3, mark: parseInt(subject3) },
                    { subject: namesubject4, mark: parseInt(subject4) },
                    { subject: namesubject5, mark: parseInt(subject5) },
                ]

            }
            if (project.length > 0) {
                result.subjects.push({ subject: projectname, mark: parseInt(project) });
            }

            const resultref = collection(db, "result");
            const usercheck = query(resultref,
                where('symbol', '==', symbol),
                where('semester', '==', selectsemester.toLowerCase()));
            const usermatch = await getDocs(usercheck)
            if (!usermatch.empty) {
                alert("Symbol number is already exit")
            }
            else {
                await addDoc(resultref, result)
                alert("Add result sucessfuly");
                setSymbols('')
               
                setSubject1('');
                setSubject2('');
                setSubject3('');
                setSubject4('')
                setSubject5('')
                setProject('')
            }

        }
        else {
            alert("Symbols not found or semester not match")
        }




    }
  
    
    const submit = (e) => {
        e.preventDefault();
        if (subject1 > 100 || subject2 > 100 || subject3 > 100 || subject4 > 100 || subject5 > 100 || project > 100) {
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
      },[])
    
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

                                <select required name="" id="" className="border rounded-md border-gray-400 p-2 flex-1" onChange={(e)=>setselectsemester(e.target.value)}>
                                    <option value='' disabled selected> Select Semester</option>
                                    {semesterlist.map((data,index)=>(

                                    <option key={index} value={data.semester}>{data.semester}</option>
                                    ))}
                                   
                                </select>
                            </div>

                            <div className="flex items-center ">
                                <label className="w-32 text-gray-700">Symbol number</label>
                                <input value={symbol} type="number" placeholder="Symbol" className="border rounded-md border-gray-400 p-2 flex-1" onChange={(e) => setSymbols(e.target.value)} required />
                            </div>
                            {data.map((item, index) => (
                                selectsemester === item.semester ? (

                                    <div key={index} className=''>



                                        <div className="flex items-center space-x-2 mt-1">
                                            <label className="w-32 text-gray-700">{item.subject1}</label>
                                            <input value={subject1} type="number" placeholder="marks" className="border rounded-md border-gray-400 p-2 flex-1" onChange={(e) => {
                                                setSubject1(e.target.value);
                                                setNameSubject1(item.subject1)
                                            }} required />
                                        </div>
                                        <div className="flex items-center space-x-2 mt-1">
                                            <label className="w-32 text-gray-700">{item.subject2}</label>
                                            <input value={subject2} type="number" placeholder="marks" className="border rounded-md border-gray-400 p-2 flex-1"
                                                onChange={(e) => {
                                                    setSubject2(e.target.value);
                                                    setNameSubject2(item.subject2)
                                                }} required />
                                        </div>
                                        <div className="flex items-center space-x-2 mt-1">
                                            <label className="w-32 text-gray-700">{item.subject3}</label>
                                            <input value={subject3} type="number" placeholder="marks" className="border rounded-md border-gray-400 p-2 flex-1"
                                                onChange={(e) => {
                                                    setSubject3(e.target.value);
                                                    setNameSubject3(item.subject3)
                                                }} required />
                                        </div>
                                        <div className="flex items-center space-x-2 mt-1">
                                            <label className="w-32 text-gray-700">{item.subject4}</label>
                                            <input value={subject4} type="number" placeholder="marks" className="border rounded-md border-gray-400 p-2 flex-1"
                                                onChange={(e) => {
                                                    setSubject4(e.target.value);
                                                    setNameSubject4(item.subject4)
                                                }} required />
                                        </div>
                                        <div className="flex items-center space-x-2 mt-1">
                                            <label className="w-32 text-gray-700">{item.subject5}</label>
                                            <input value={subject5} type="number" placeholder="marks" className="border rounded-md border-gray-400 p-2 flex-1"
                                                onChange={(e) => {
                                                    setSubject5(e.target.value);
                                                    setNameSubject5(item.subject5)
                                                }} required />
                                        </div>
                                        {item.project ?

                                            <div className="flex items-center space-x-2 mt-1">
                                                <label className="w-32 text-gray-700">{item.project}</label>
                                                <input value={project} type="number" placeholder="marks" className="border rounded-md border-gray-400 p-2 flex-1" onChange={(e) => {
                                                    setProject(e.target.value);
                                                    setProjectname(item.project)
                                                }} required />
                                            </div>
                                            : ""
                                        }




                                    </div>

                                )
                                    :
                                    ""
                            ))}





                            <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">Add</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
