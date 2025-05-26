import React from 'react'
import { FiPrinter } from "react-icons/fi";
import { useState } from 'react';

import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { collection, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';

export default function Result() {
  const { symbol } = useParams();
  const [studentdata, setStudentdata] = useState();
  useEffect(() => {
    const fetchresult= async()=>{
      try {
    const resultref = collection(db, 'result');
        const resultquery=query(resultref,where('symbol','==',symbol));
        const resultdata=await getDocs(resultquery);
        if(!resultdata.empty){
          setStudentdata(resultdata.docs[0].data())


        }
      } catch (error) {
        console.log("error")
      }
    }
fetchresult();

  },[symbol])


if (!studentdata) {
  return <div className="p-5">Loading or no data found for symbol {symbol}</div>;
}

  const Totalmakrs = studentdata.subjects.reduce((sum, item) => sum + item.mark, 0);
  const fail =  studentdata.subjects.some(item => item.mark < 32);

  const percent = fail ? '' : ((Totalmakrs / ( studentdata.subjects.length * 100)) * 100).toFixed(2)





  return (
    <div className='w-full h-auto bg-gray-300 flex items-center px-5 py-4 justify-center '>
      <div className=' w-full sm:w-[60%] h-auto py-5  bg-white rounded'>
        <div className='border-b flex w-full  shadow-sm item-center justify-center py-3'>
          <h1 className='text-2xl text-gray-500'>Student Result Details</h1>
        </div>
        <div className='mt-5'>

          <div className='flex px-1 sm:px-5  '>
            <h1 className='font-semibold text-gray-700 text-sm sm:text-lg font-mono whitespace-nowrap tracking-wide'>Student Name: </h1>
            <h4 className='font-mono tracking-wide text-sm sm:text-lg'> Name: {studentdata.name}</h4>
          </div>
          <div className='flex px-1 sm:px-5  mt-1 '>
            <h1 className='font-semibold text-gray-700 text-sm sm:text-lg whitespace-nowrap font-mono tracking-wide'>Symbol number: </h1>
            <h4 className='font-mono tracking-wide text-sm sm:text-lg'> {symbol}</h4>
          </div>
          <div className='flex px-1 sm:px-5  mt-1  '>
            <h1 className='font-semibold text-gray-700 text-sm sm:text-lg whitespace-nowrap font-mono tracking-wide'>Semester: </h1>
            <h4 className='font-mono tracking-wide text-sm sm:text-lg'>  { studentdata.semester}</h4>
          </div>

        </div>
        <table className=' w-[90%]  mt-5 border border-black rounded-sm m-auto  gap-5 '>
          <thead className=''>
            <tr className='bg-gray-100 w-full'>
              <th className=" w-16 border border-gray-300 px-4 py-2 text-left">#</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Subject</th>
              <th className=" w-16 border border-gray-300 px-4 py-2 text-left">Marks</th>

            </tr>
          </thead>
          <tbody>
            {studentdata.subjects.map((item, index) => (
              <tr key={index} className={`${item.mark < 32 ? 'bg-red-300' : ''}`}>
                <td className=" w-16 border border-gray-300 px-4 py-2 text-left">{index + 1}</td>
                <td className=' border border-gray-300 px-4 py-2 text-left '>{item.subject}</td>
                
                
                <td className={` w-16 border border-gray-300 px-4 py-2 text-left `} >{item.mark}</td>
              </tr>
            ))}




            <tr className=''>
              <th className="  border border-gray-300 text-center px-4 py-2" colSpan="2">Total Marks</th>
              <th className="  border border-gray-300 px-4 py-2 text-left whitespace-nowrap">{Totalmakrs} out of {studentdata.subjects.length * 100}</th>
            </tr>
            <tr className=''>
              <th className="  border border-gray-300 text-center px-4 py-2" colSpan="2">Percentage</th>
              <th className="  border border-gray-300 px-4 py-2 text-left whitespace-nowrap">{fail ? 'fail' : `${percent}%`}</th>
            </tr>

          </tbody>


        </table>
      </div>
    </div>
  )
}
// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { collection, getDocs, query, where } from 'firebase/firestore';
// import { db } from '../config/firebase';

// export default function Result() {
//   const { symbol } = useParams();
//   const [studentdata, setStudentdata] = useState(null); // null initially

//   useEffect(() => {
//     const fetchresult = async () => {
//       try {
//         const resultref = collection(db, 'result');
//         const resultquery = query(resultref, where('symbol', '==', symbol));
//         const resultdata = await getDocs(resultquery);
//         if (!resultdata.empty) {
//           setStudentdata(resultdata.docs[0].data()); // set the object
//         } else {
//           setStudentdata(null);
//         }
//       } catch (error) {
//         console.log('error', error);
//       }
//     };
//     fetchresult();
//   }, [symbol]);

//   if (!studentdata) {
//     return <div className="p-5">Loading or no data found for symbol {symbol}</div>;
//   }

//   // Calculate total marks and pass/fail from fetched data
//   const Totalmarks = studentdata.subjects.reduce((sum, item) => sum + item.mark, 0);
//   const fail = studentdata.subjects.some(item => item.mark < 32);
//   const percent = fail ? 'Fail' : ((Totalmarks / (studentdata.subjects.length * 100)) * 100).toFixed(2);

//   return (
//     <div className="w-full h-auto bg-gray-300 flex items-center px-5 py-4 justify-center">
//       <div className="w-full sm:w-[60%] h-auto py-5 bg-white rounded">
//         <div className="border-b flex w-full shadow-sm items-center justify-center py-3">
//           <h1 className="text-2xl text-gray-500">Student Result Details</h1>
//         </div>
//         <div className="mt-5">
//           <div className="flex px-1 sm:px-5">
//             <h1 className="font-semibold text-gray-700 text-sm sm:text-lg font-mono whitespace-nowrap tracking-wide">
//               Symbol number:
//             </h1>
//             <h4 className="font-mono tracking-wide text-sm sm:text-lg">{studentdata.symbol}</h4>
//           </div>
//           <div className="flex px-1 sm:px-5 mt-1">
//             <h1 className="font-semibold text-gray-700 text-sm sm:text-lg whitespace-nowrap font-mono tracking-wide">
//               Semester:
//             </h1>
//             <h4 className="font-mono tracking-wide text-sm sm:text-lg">{studentdata.semester}</h4>
//           </div>
//         </div>
//         <table className="w-[90%] mt-5 border border-black rounded-sm m-auto gap-5">
//           <thead>
//             <tr className="bg-gray-100 w-full">
//               <th className="w-16 border border-gray-300 px-4 py-2 text-left">#</th>
//               <th className="border border-gray-300 px-4 py-2 text-left">Subject</th>
//               <th className="w-16 border border-gray-300 px-4 py-2 text-left">Marks</th>
//             </tr>
//           </thead>
//           <tbody>
//             {studentdata.subjects.map((item, index) => (
//               <tr key={index} className={item.mark < 32 ? 'bg-red-300' : ''}>
//                 <td className="w-16 border border-gray-300 px-4 py-2 text-left">{index + 1}</td>
//                 <td className="border border-gray-300 px-4 py-2 text-left">{item.subject}</td>
//                 <td className="w-16 border border-gray-300 px-4 py-2 text-left">{item.mark}</td>
//               </tr>
//             ))}
//             <tr>
//               <th className="border border-gray-300 text-center px-4 py-2" colSpan={2}>
//                 Total Marks
//               </th>
//               <th className="border border-gray-300 px-4 py-2 text-left whitespace-nowrap">
//                 {Totalmarks} out of {studentdata.subjects.length * 100}
//               </th>
//             </tr>
//             <tr>
//               <th className="border border-gray-300 text-center px-4 py-2" colSpan={2}>
//                 Percentage
//               </th>
//               <th className="border border-gray-300 px-4 py-2 text-left whitespace-nowrap">
//                 {fail ? 'Fail' : `${percent}%`}
//               </th>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
