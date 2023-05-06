import React from 'react'
import { BiSearch } from 'react-icons/bi';
import { RiRadioButtonLine } from 'react-icons/ri';
import TableData from './TableData';

function Table() {
    return ( 
        <div className=" h-[600px] w-1/2 rounded-tr-xl rounded-br-xl  shadow-lg overflow-y-scroll overflow-x-hidden">
                    <div className="p-4">
                        <p className="border-b w-fit border-blue-400">Camera's status table </p>
                    </div>
                    <div className="w-full flex px-4 items-center justify-center relative">
                        <BiSearch  className="absolute left-7 w-[20px] h-[20px] text-gray-500"/>
                        <input className="w-full h-[40px] border rounded-xl focus:outline-blue-300 pl-10" placeholder="Camera name , Serial number , Owner , ..."></input>
                    </div>
                    <div className="flex w-full justify-center ">
    <table className="mt-5 " >
        <thead>
            <tr>
            <th className="px-10 border-b pb-2 border-blue-500">Status</th>
            <th className="px-10 border-b pb-2 border-blue-500">Camera name</th>
            <th className="px-10 border-b pb-2 border-blue-500">Serial number</th>
            <th className="px-10 border-b pb-2 border-blue-500">Active hours</th>
            <th className="px-10 border-b pb-2 border-blue-500">Owner</th>
            <th className="px-10 border-b pb-2 border-blue-500">Groups</th>

            </tr>

        </thead>
        <tbody className=" text-center">
            <TableData/>
            <TableData/>
            <TableData/>
            <TableData/>
            <TableData/>
            <TableData/>
            <TableData/>
            <TableData/>
            <TableData/>
            <TableData/>
            <TableData/>
            <TableData/>
            
            </tbody>
    </table>




      
        
 
          
         
           
   
      
       
                    </div>
                </div>
     );
}

export default Table;