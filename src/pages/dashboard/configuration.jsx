// Imports
import NavigationBar from "@/components/NavigationSection/NavigationBar";
import Sidebar from "@/components/sidebar";
import { useRouter } from "next/router";
import React from "react";
import { GiBleedingEye } from "react-icons/gi";
import { HiOutlineStatusOnline } from "react-icons/hi";

// Login Page definitions
const Configuration = () => {
    const router = useRouter()
    const path = router.pathname
    const imgsrc = 'https://www.maxpixel.net/static/photo/1x/Young-Smile-Portrait-Ai-Generated-Man-Teeth-7833751.jpg'
    // Component return

    return (
        <div className="">
        <div className="flex w-full justify-between items-center pt-5 shadow-md pb-4 ">
            <div className="ml-10">
                <div className="flex  text-2xl items-center">
                    <p>ARG</p>
                    <GiBleedingEye className="w-[40px] h-[40px] text-red-600"/>
                    <p>OS VISION</p>
                </div>
                <p className="text-sm uppercase text-gray-500">{path.slice(1,10) + ' > ' + path.slice(11,26)}</p>
            </div>
            <div className="mr-10 flex items-center">
                <HiOutlineStatusOnline className="w-[25px] h-[25px] mr-2 animate-blink text-green-500"/>
                <p>Welcome Partiya !</p>
                <img src={imgsrc} className="w-[60px] h-[60px] border rounded-full ml-3 object-cover"></img>
            </div>

        </div>
        <div className=" mt-10">
                <NavigationBar/>
        </div>
     </div>
    );
}

// Export the Dashboard page
export default Configuration;