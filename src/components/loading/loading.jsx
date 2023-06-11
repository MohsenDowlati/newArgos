import React from 'react'


function Loading() {
    return ( 
        <div className='w-full h-[500px] flex items-center justify-center'>
            <div className='w-[500px] h-[300px] rounded-xl relative bg-[#252525] '>
            <span className="  bg-[rgba(255, 255, 255, 0.15)] h-5 w-full inline-block  overflow-hidden 
                           after:w-[192px] after:h-[4.8px] after:bg-white after:absolute after:bottom-0 after:left-0 after:box-border after:animate-animloader
            "></span>
            <div className='flex w-full justify-center items-center mt-5'>
                     <img src="https://i.ibb.co/Xk0MPxS/Argos-Logo.png" className="object-contain w-[150px] h-[70px]"></img>
   
            </div>
            <div className='flex items-center justify-center w-full '>
            <p className='text-centet font-medium mt-10 text-white text-lg '>Argos vision servers are gathering data please wait </p>
            </div>
            </div>

        </div>
     );
}

export default Loading;