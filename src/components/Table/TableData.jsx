import React from 'react'
import { RiRadioButtonLine } from 'react-icons/ri';

function TableData() {
    return ( 
        <tr className="mb-2 shadow-sm">
        <td className="">
           <div className="w-full flex justify-center">
            <p className='px-4 py-1 text-white rounded-lg bg-green-600'>Online </p>
           </div>
        </td>
        <td className='py-3'>
            <p>MY CAMERA 1</p>
        </td>
        <td className='py-3'>
            124586-295982-22
        </td>
        <td className='py-3'>
            2 Hours
        </td>
        <td className='py-3'>
            City of Phoneix
        </td>
        <td className='py-3'>Police</td>
        </tr>
     );
}

export default TableData;