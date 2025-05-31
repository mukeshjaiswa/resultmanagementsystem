import { FiFileText } from "react-icons/fi";
import { MdOutlineGroupAdd } from "react-icons/md";
import { FaCircleInfo } from "react-icons/fa6";
import { IoIosNotifications } from "react-icons/io";

import { TiThMenu } from "react-icons/ti";

export default function () {
    
  return null
}
export const data=[
    {
        title:"Semester ",
        icons:FiFileText,
        name:'class',
        add:'Add semester',
        manage:'Manage semester',
        manageicon:TiThMenu,
        manageroute:'/manage-semester',
        route: '/add-semester',

    },
    {
        title:'Subjects',
        icons: FiFileText,
        name:"subjects",
        add:'Add Subjects',
        manage:'Manage Subject',
        route: '/add-subject',
        manageroute:'/manage-subject',
        manageicon:TiThMenu,

    },

    {
        title:'Students',
        icons:MdOutlineGroupAdd,
        name:"students",
        add:'Add Students',
        route: '/addStudents',
        
        manage:'Manage Students',
        manageroute:'/managestudents',
        manageicon:TiThMenu,


    },
    {
        title:'Result',
        icons:FaCircleInfo,
        name:"results",
        add:"Add Results",
        manage:'Manage Results',
        route: '/add-results',
        manageroute:'/manageresult',
        manageicon:TiThMenu,

    },
    {
        title:'Notices',
        icons:IoIosNotifications,
        name:"notices",
        add:"Add Notices",
        route: '/add-notice',
        manage:'Managenotice',
        manageroute:'/managenotice',
        manageicon:TiThMenu,

    },

    
]
