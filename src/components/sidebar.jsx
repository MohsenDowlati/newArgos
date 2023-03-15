// Imports
import { BiLogOut } from 'react-icons/bi';
import { 
    AiOutlineHome, 
    AiOutlineCamera, 
    AiOutlineSetting, 
    AiOutlineLineChart,
    AiOutlineBook,
    AiOutlineTeam
} from 'react-icons/ai'
import { IconContext } from "react-icons";
import { useRouter } from 'next/router';
import React from "react";

// Login Page definitions
const Sidebar = () => {

    // Get current path
    const { asPath } = useRouter();

    // Variable declaration and initialization
    const router = useRouter();

    // Function call when the login button is pressed
    function loginPress() {
        router.push('/');
    }

    // Component return
    return (
    <div className="h-full bg-black w-1/6 rounded-r-md">
        <div className="h-full flex flex-col justify-between">
            <div className="grid justify-items-center">
                <div className="text-white-p font-boldVazir text-3.5xl mt-10 mb-12">
                    ARGOS Vision
                </div>
                <button className={`${(asPath == "/dashboard/home") ? "bg-white-p" : "hover:bg-silver"} px-3 py-2 my-1 mx-2 w-10/12 flex justify-start items-center rounded-lg`} onClick={() => router.push("/dashboard/home")}>
                    <IconContext.Provider value={{color: (asPath == "/dashboard/home") ? "#000000" : "#FFFFFF", size: "1.5em", className: "mr-2"}}>
                        <AiOutlineHome/>
                    </IconContext.Provider>
                    <div className={`text-${(asPath == "/dashboard/home") ? "black" : "white-p"} text-lg`}>
                        Home
                    </div>
                </button>
                <button className={`${(asPath == "/dashboard/cameras") ? "bg-white-p" : "hover:bg-silver"} px-3 py-2 my-1 mx-2 w-10/12 flex justify-start items-center rounded-lg`} onClick={() => router.push("/dashboard/cameras")}>
                    <IconContext.Provider value={{color: (asPath == "/dashboard/cameras") ? "#000000" : "#FFFFFF", size: "1.5em", className: "mr-2"}}>
                        <AiOutlineCamera/>
                    </IconContext.Provider>
                    <div className={`text-${(asPath == "/dashboard/cameras") ? "black" : "white-p"} text-lg`}>
                        Cameras
                    </div>
                </button>
                <button className={`${(asPath == "/dashboard/configuration") ? "bg-white-p" : "hover:bg-silver"} px-3 py-2 my-1 mx-2 w-10/12 flex justify-start items-center rounded-lg`} onClick={() => router.push("/dashboard/configuration")}>
                    <IconContext.Provider value={{color: (asPath == "/dashboard/configuration") ? "#000000" : "#FFFFFF", size: "1.5em", className: "mr-2"}}>
                        <AiOutlineSetting/>
                    </IconContext.Provider>
                    <div className={`text-${(asPath == "/dashboard/configuration") ? "black" : "white-p"} text-lg`}>
                        Configuration
                    </div>
                </button>
                <button className={`${(asPath == "/dashboard/metrics") ? "bg-white-p" : "hover:bg-silver"} px-3 py-2 my-1 mx-2 w-10/12 flex justify-start items-center rounded-lg`} onClick={() => router.push("/dashboard/metrics")}>
                    <IconContext.Provider value={{color: (asPath == "/dashboard/metrics") ? "#000000" : "#FFFFFF", size: "1.5em", className: "mr-2"}}>
                        <AiOutlineLineChart/>
                    </IconContext.Provider>
                    <div className={`text-${(asPath == "/dashboard/metrics") ? "black" : "white-p"} text-lg`}>
                        Metrics
                    </div>
                </button>
                <button className={`${(asPath == "/dashboard/logs") ? "bg-white-p" : "hover:bg-silver"} px-3 py-2 my-1 mx-2 w-10/12 flex justify-start items-center rounded-lg`} onClick={() => router.push("/dashboard/logs")}>
                    <IconContext.Provider value={{color: (asPath == "/dashboard/logs") ? "#000000" : "#FFFFFF", size: "1.5em", className: "mr-2"}}>
                        <AiOutlineBook/>
                    </IconContext.Provider>
                    <div className={`text-${(asPath == "/dashboard/logs") ? "black" : "white-p"} text-lg`}>
                        Logs
                    </div>
                </button>
                <button className={`${(asPath == "/dashboard/users") ? "bg-white-p" : "hover:bg-silver"} px-3 py-2 my-1 mx-2 w-10/12 flex justify-start items-center rounded-lg`} onClick={() => router.push("/dashboard/users")}>
                    <IconContext.Provider value={{color: (asPath == "/dashboard/users") ? "#000000" : "#FFFFFF", size: "1.5em", className: "mr-2"}}>
                        <AiOutlineTeam/>
                    </IconContext.Provider>
                    <div className={`text-${(asPath == "/dashboard/users") ? "black" : "white-p"} text-lg`}>
                        Users
                    </div>
                </button>
            </div>
            <div className="bg-white-p m-4 p-3 rounded-lg">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <div className="bg-silver w-8 h-8 mr-2 rounded-full"/>
                        <div className="text-black text-xl">
                            John Doe
                        </div>
                    </div>
                    <button onClick={loginPress}>
                        <BiLogOut color="#C92626" size="2em"/>
                    </button>
                </div>
            </div>
        </div>
    </div>
    );
}

// Export the Dashboard page
export default Sidebar;