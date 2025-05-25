// src/pages/AddClass.jsx
import { async } from '@firebase/util';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { db } from '../../config/firebase';
import Dashboardnavbar from '../Dashboardnavbar';
import Left from '../Left/Left';

const Addclass = () => {
    const [semester, setSemester] = useState('');
   
        const createsemester = async(data) => {
            try {
                const semesterref = collection(db, 'semester');
        
                await addDoc(semesterref, data)
                alert("Create semester sucessfully")
                setSemester('');

            } catch (error) {
                console.log("error")
            }
        }
   

    const submit = (e) => {
        e.preventDefault();
        const data={
            semester:semester.toLowerCase(),
        }
        createsemester(data)
    }
    return (
        <div className=' h-[100vh] w-full'>
            <Dashboardnavbar />
            <div className='flex '>
                <Left />
                <div className=' w-full bg-gray-200  border-t  '>
                    <div className='bg-white p-4 w-full'>

                        <h1 className='text-2xl font-semibold'>Create Semester </h1>
                    </div>


                    <div className="p-8 w-[60%] shadow-lg bg-white mt-5 rounded-md  m-auto px-10">

                        <form className="space-y-4" onSubmit={submit}>
                            <div>
                                <label className="block text-gray-700">Semester Name</label>
                                <input value={semester} type="text" onChange={(e) => setSemester(e.target.value)} placeholder="Eg: Third, Fourth" className="border border-gray-400 p-2 w-full" />
                            </div>

                            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Addclass;
