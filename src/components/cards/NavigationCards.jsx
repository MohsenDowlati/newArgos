import React from 'react'
import { AiOutlineSetting } from 'react-icons/ai';
import { BiHome } from 'react-icons/bi';


function NavigationCard({Title,Icon,Details_1,Details_2,importantText,importantColor,onClick}) {
    return ( 
        <div onClick={onClick} className={`w-[250px] cursor-pointer  h-[150px]  transform transition duration-500 hover:scale-110  mx-3 rounded-md shadow-md`}>
            <div className='flex items-center m-3'>
                {
                    Icon
                }
                <p className='ml-2 text-lg font-bold'>{Title}</p>
            </div>
            <div className='w-full'>
                <p className='text-sm text-center mx-3 text-gray-500'>{Details_1} <span className={`${importantColor}`}>{importantText}</span> {Details_2}</p>
            </div>
        </div>
     );
}

export default NavigationCard;