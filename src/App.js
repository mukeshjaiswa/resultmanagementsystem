
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AdminLogin from './component/Admin/AdminLogin';
import Addclass from './component/Dashboard/Addclass/Addclass';
import Managesemester from './component/Dashboard/Addclass/Managesemester';
import ManageNotice from './component/Dashboard/addNotices/ManageNotice';
import Notices from './component/Dashboard/addNotices/Notices';
import Addresult from './component/Dashboard/AddResult/Addresult';
import ManageResult from './component/Dashboard/AddResult/ManageResult';
import Addstudents from './component/Dashboard/addStudents/Addstudents';
import ManageStudents from './component/Dashboard/addStudents/ManageStudents';
import Addsubject from './component/Dashboard/Addsubject/Addsubject';
import Managesubject from './component/Dashboard/Addsubject/Managesubject';
import Dashboard from './component/Dashboard/Dashboard';


import Home from './component/Pages/Home';
import CheckResult from './component/User/CheckResult';
import Result from './component/User/Result'; 
 import { ToastContainer } from 'react-toastify';


function App() {
  return (
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/admin' element={<AdminLogin/>}/>
    <Route path='/dashboard' element={<Dashboard/>}/>
    <Route path='/addStudents' element={<Addstudents/>}/>
    <Route path='/add-subject' element={<Addsubject/>}/>
    <Route path="/add-semester" element={<Addclass />} />
    <Route path="/add-results" element={<Addresult />} />
    <Route path='/managestudents' element={<ManageStudents/>} />
    <Route path='/findresult' element={<CheckResult/>} />
    <Route path='/result/:symbol' element={<Result/>} />
    <Route path='/add-notice' element={<Notices/>} />
    <Route path='/manageresult'element={<ManageResult/>} />
    <Route path='/manage-semester'element={<Managesemester/>} />
    <Route path='/managenotice'element={<ManageNotice/>} />
    <Route path='/manage-subject' element={<Managesubject/>} />
  </Routes>
  <ToastContainer position='top-center' autoClose='2000' />
  </BrowserRouter>
  );
}

export default App;
