
import React from 'react';
import Dashboardnavbar from '../Dashboardnavbar';
import Left from '../Left/Left';

const Addsubject = () => {
    return (
        <div className=' h-[100vh] w-full'>
            <Dashboardnavbar />
            <div className='flex '>
                <Left />
                <div className=' w-full bg-gray-200  border-t  '>
                    <div className='bg-white p-4 w-full'>

                    <h1 className='text-2xl font-semibold'>Subject Creation </h1>
                    </div>


                    <div className="p-8 w-[60%] shadow-lg bg-white mt-5 rounded-md  m-auto px-10">

                        <form className="space-y-4">
                            <div>
                                <label className="flex text-gray-700">Subject Name</label>
                                <input type="text" placeholder="Eg: Third, Fourth" className="border border-gray-400 p-2 w-full" />
                            </div>
                            <div>
                                <label className="flex text-gray-700">Subject Code</label>
                                <input type="text" placeholder="Eg: 1, 2, 3" className="border border-gray-400 p-2 w-full" />
                            </div>
                           
                            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Addsubject;
