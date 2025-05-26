import React from 'react'
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';
import { toast } from 'react-toastify';

export default function AdminLogin() {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [passhide, setPassHide] = useState(false);
    const passhidehandler = () => {
        setPassHide(!passhide);
    }

    const signinhandler = async () => {
        if (username === '' || passhide === '') {
            toast.warning("Please enter all fields")
        } else {
            const adminref = collection(db, "admin");
            const q = query(adminref,
                where('username', '==', username),
                where('password', '==', password)

            )
            const admindata = await getDocs(q)
            if (!admindata.empty) {

                navigate('/dashboard')
                toast.success("Login Sucessfully")
            }
            else {
                toast.warn("UserName and PassWord are not match ")
            }
        }


    }
    return (
        <div className='w-full h-[100vh] bg-gray-100 flex flex-col  items-center '>

            <div className='mt-5 mb-10 '>
                <h1 className='text-xl md:text-3xl font-sans'>Students Result Management system</h1>
            </div>
            <div className=' w-[300px] sm:w-[400px] md:w-[500px] mt-10 h-[300px] bg-white rounded-md flex flex-col items-center'>
                <h1 className='text-2xl mt-5 font-semibold'>Admin Login</h1>
                <div className='flex w-[90%] mt-10 mx-auto gap-1 items-center  '>
                    <label htmlFor="" className='font-semibold '>Username</label>
                    <input value={username}  onChange={(e) => setUserName(e.target.value)} type='email' className='border border-gray-400 w-full p-1 rounded-md ml-1' required placeholder='UserName' />
                </div>
                <div className='flex w-[90%] mt-4 mx-auto gap-1 items-center   '>
                    <label htmlFor="" className='font-semibold '>Password</label>
                    <div className='w-full relative '>
                        <input value={password}  onChange={(e) => setPassword(e.target.value)} type={passhide ? "text" : "password"} className='border border-gray-400 w-full pr-10 p-1 rounded-md ml-1 ' placeholder='Password' />
                        {passhide ?
                            <FiEye className='absolute right-2 top-1/2 transform -translate-y-1/2 text-xl' onClick={passhidehandler} />
                            : <FiEyeOff className='absolute right-2 top-1/2 transform -translate-y-1/2 text-xl' onClick={passhidehandler} />
                        }
                    </div>

                </div>
                <div className=' w-full flex justify-end items-end mr-10 mt-5'>
                    <button onClick={signinhandler} className='bg-green-700 text-white p-2 rounded-md px-10 hover:bg-green-600 font-semibold '>Sign in</button>
                </div>
            </div>
            <div className='mt-10'>
                <h1 className='text- text-gray-400'>Students Result Management System</h1>
            </div>
        </div>
    )
}
