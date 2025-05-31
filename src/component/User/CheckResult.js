import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';
import { toast } from 'react-toastify';


export default function CheckResult() {
    const [symbol, setSymbol] = useState('');
    const navigate = useNavigate();
    const checksymbol = async () => {

        try {
            const symbolref = collection(db, 'result');
            const check = query(symbolref, where('symbol', '==', symbol));
            const checkdata = await getDocs(check);
            if (!checkdata.empty) {
               
                navigate(`/result/${symbol}` )

                setSymbol('')
                toast.success("Match Sybmol")
            }
            else {
                toast.warn("Not Match symbol")
            }
        } catch (error) {

        }

    }



    const submit = (e) => {
        e.preventDefault();

        checksymbol()

    }


    return (
        <div className='bg-gray-400 h-[100vh] w-full  flex items-center justify-center'>
            <div className='w-[40%] h-[350px] rounded shadow-md py-3 px-5 text-center bg-white'>
                <h1 className='text-2xl text-gray-500 py-4'>Result Management System</h1>
                <form onSubmit={submit}>
                    <div className='w-full px-5 text-start gap-3'>
                        <label htmlFor="" className='font-semibold text-md font-sans text-gray-600'>Enter your Symbol</label>
                        <input value={symbol} onChange={(e) => setSymbol(e.target.value)} type="text" placeholder='Symbol number' required className='border mt-2 rounded p-1 px-3 outline-none w-full border-black ' />
                    </div>



                    <div className='flex items-end justify-end mt-3'>
                        <button type='submit' className='border px-5 py-2  bg-green-600 font-semibold hover:bg-green-400 rounded text-white'>Search</button>
                    </div>
                    <div className='my-4 '>

                        <a href="/" className='text-gray-500 flex items-center gap-3 hover:text-blue-500'>
                            Back to Home</a>

                    </div>
                </form>
            </div>
        </div>
    )
}
