import React from 'react'
import { AiOutlineSetting } from 'react-icons/ai';
import { BiHome } from 'react-icons/bi';


function NavigationCard({Title,Icon,Details,onClick,hoverColor}) {
    return ( 
        <div onClick={onClick} className={`w-[250px]   cursor-pointer bg-transparent  h-[100px]    transform transition duration-500 hover:scale-110   rounded-lg `}>
            <div className='flex items-center '>
                {
                    Icon
                }
                <p className='ml-2 text-lg text-white font-bold'>{Title}</p>
            </div>
            <div className='w-full'>
                <p className='text-sm text-center mx-3 text-white'>{Details}</p>
            </div>
        </div>
     );
}

export default NavigationCard;