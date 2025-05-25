import { async } from '@firebase/util';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import React from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { db } from '../../config/firebase';

import Dashboardnavbar from '../Dashboardnavbar'
import Left from '../Left/Left'

export default function Addstudents() {
  const [dob, setDOb] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('')
  const [symbol, setSymbol] = useState('')

  const [semester, setSemester] = useState([])
  const [selectsemester, setSelectsemester] = useState('')
  const [gender, setGender] = useState('')
  const adddata = async (data) => {
    try {
      const addref = collection(db, "addstudent");


      //to check symbol is alread exit or not 
      const q = query(addref, where('symbol', '==', data.symbol));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        alert("These symbol number is already exit");
        return false;

      }
      await addDoc(addref, data);
      alert("Add students to firebase sucessfull")
      return true
    } catch (error) {
      console.log("error")
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
      setSemester(semesters)
    }
    getsemester()
  }, [])

  const submit = async (e) => {
    e.preventDefault();
    const today = new Date();
    today.setHours(0, 0, 0,)


    if (new Date(dob) > today) {
      alert("Date in not valid")
    }
    else {

      const data =
      {
        name: name,
        symbol: symbol,
        email: email,
        dob: dob,
        semester: selectsemester.toLowerCase(),
        gender: gender,
      }

      const sucess = await adddata(data);
      if (sucess) {
        setDOb('');
        setName('');
        setEmail('');
        setSymbol('');
        setSelectsemester('')
        setGender('')
      }

    }
  }


  return (
    <div className=' h-[100vh] w-full'>
      <Dashboardnavbar />
      <div className='flex '>
        <Left />
        <div className=' w-full bg-gray-200  border-t  '>
          <div className='bg-white p-4 w-full'>

            <h1 className='text-2xl font-semibold'>Add students </h1>
          </div>


          <div className="p-8 w-[80%] shadow-lg bg-white mt-5 rounded-md  m-auto px-10">

            <form className="space-y-6" onSubmit={submit}>
              <div className="flex items-center space-x-4">
                <label className="w-32 text-gray-700">Full Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} required type="text" placeholder="Full Name" className="border rounded-md border-gray-400 p-2 flex-1" />
              </div>

              <div className="flex items-center space-x-4">
                <label className="w-32 text-gray-700">Symbol Number</label>
                <input value={symbol} onChange={(e) => setSymbol(e.target.value)} required type="text" placeholder="Roll Number" className="border rounded-md border-gray-400 p-2 flex-1" />
              </div>

              <div className="flex items-center space-x-4">
                <label className="w-32 text-gray-700">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" placeholder="Email" className="border rounded-md border-gray-400 p-2 flex-1" />
              </div>

              <div className="flex items-center space-x-4">
                <label className="w-32 text-gray-700">DOB</label>
                <input type="date" value={dob} onChange={(e) => setDOb(e.target.value)} required className="border rounded-md border-gray-400 p-2 flex-1" />
              </div>

              <div className="flex items-center space-x-4">
                <label className="w-32 text-gray-700">Class</label>
                <select value={selectsemester} onChange={(e) => setSelectsemester(e.target.value)} required className="border rounded-md border-gray-400 p-2 flex-1">
                  <option value='' disabled selected> Select Semester</option>
                  {semester.map((item, index) => (

                    <option key={index} value={item.semester}>{item.semester}</option>
                  ))}

                </select>
              </div>

              <div className="flex items-center space-x-4">
                <label required className="w-32 text-gray-700 " >Gender</label>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-1">
                    <input checked={gender === 'male'} required type="radio" name="gender" value="male" onChange={(e) => setGender(e.target.value)} />
                    <span>Male</span>
                  </label>
                  <label className="flex items-center space-x-1">
                    <input checked={gender === 'female'} required type="radio" name="gender" value="female" onChange={(e) => setGender(e.target.value)} />
                    <span>Female</span>
                  </label>
                  <label className="flex items-center space-x-1">
                    <input checked={gender === 'other'} required type="radio" name="gender" value="other" onChange={(e) => setGender(e.target.value)} />
                    <span>Other</span>
                  </label>
                </div>
              </div>

              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                Add
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>
  )
}
