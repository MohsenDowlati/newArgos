import { useRouter } from 'next/router';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { HiOutlineStatusOnline } from 'react-icons/hi';


function Navbar() {
    const router = useRouter()
    const imgsrc = 'https://www.maxpixel.net/static/photo/1x/Young-Smile-Portrait-Ai-Generated-Man-Teeth-7833751.jpg'
    const [userdata,setUserdata] = useState() 
    
    const path = router.pathname 
    useEffect(() => {
      
        setUserdata(JSON.parse(localStorage.getItem('User_data')))
    }, []);
    return ( 
        <div className="flex w-full absolute z-10 justify-between items-center pt-5 bg-transparent backdrop-blur-md text-white shadow-md pb-4 ">
                <div className="ml-10">
                    <div className="flex  text-2xl items-center">
                        <img src="https://i.ibb.co/Xk0MPxS/Argos-Logo.png" className="object-contain w-[150px] h-[50px]"></img>
                        <p className="text-sm uppercase  ml-3 mt-3">{path.slice(1,10) + ' > ' + path.slice(11,30)}</p>
                    </div>
                    
                </div>
                <div className="mr-10 flex items-center">
                    <HiOutlineStatusOnline className="w-[25px] h-[25px] mr-2 animate-blink text-green-500"/>
                    <p>Welcome {userdata?.username} !</p>
                    <img src={imgsrc} className="w-[60px] h-[60px] border rounded-full ml-3 object-cover"></img>
                </div>

            </div>
     );
}

export default Navbar;