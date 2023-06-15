import React, { useEffect, useState } from 'react'
import { AiOutlineSetting } from 'react-icons/ai';
import { BiHome } from 'react-icons/bi';


function NavigationCard({Title,Icon,Details,onClick,hoverColor,whichActive,MainColor,islogout}) {
   

    return ( 
        <button onClick={onClick} className='w-full pl-3   my-5 flex items-center ' >
            <div className={`    ${whichActive ?  MainColor : 'text-white'} justify-start items-center ${islogout ? 'text-red-500':''} `}>
                {Icon}
            </div>
            <p className={`ml-4 text-white overflow-hidden font-medium  ${whichActive ? ` border-b border-b-${MainColor} ${MainColor}` : 'text-white'}`}>
                {Title}
            </p>
        </button>
     );
}

export default NavigationCard;