// Imports
import Navbar from "@/components/Navbar/Navbar";
import NavigationBar from "@/components/NavigationSection/NavigationBar";
import Sidebar from "@/components/sidebar";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { GiBleedingEye } from "react-icons/gi";
import { HiOutlineStatusOnline } from "react-icons/hi";
import WebSocket from "reconnecting-websocket";

// Login Page definitions
const Cameras = () => {
    const router = useRouter()
    const path = router.pathname
    const imgsrc = 'https://www.maxpixel.net/static/photo/1x/Young-Smile-Portrait-Ai-Generated-Man-Teeth-7833751.jpg'
    const [src,setSrc] = useState()
    const videoRef = useRef(null);
    const url = 'rtsp://54.153.60.79:3000/ds-test';
   
    
    

    return (
        <div className="bg-[#212326] w-full ">
            <Navbar Notabsolute={'block'}/>
            <div className="flex h-fit">
            <div className="      ">
                    <NavigationBar WhichActive={'Camera'}/>
            </div>
            <div className="bg-[#292c30]  w-full ">
                              
      <div className="h-full">

      </div>
   

                    </div> 




                    
                </div>
            </div>

    );
}

// Export the Dashboard page
export default Cameras;