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
import { useState, useEffect } from 'react';
import { IconContext } from "react-icons";
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import React from "react";

// Login Page definitions
const Sidebar = () => {
    // Get current path and router
    const { asPath } = useRouter();
    const router = useRouter();

    // Reroute user to the login page if the 
    // refresh or access tokens are not present
    useEffect(() => {
        // const refresh = Cookies.get('refresh');
        // if (!refresh || refresh === 'undefined') {
        //     Cookies.set('noTokens', true);
        //     router.push('/');
        // }
    }, []);

    // Function call when the login button is pressed
    const logoutPress = async () => {
        // Call the logout api endpoint
        await fetch(
            'http://localhost:8000/api/v1/auth/logout/',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('access')}`
                },
                body: JSON.stringify(
                    {
                        "refresh": Cookies.get('refresh'),
                    }
                ),
            }
        );

        // Clear the cookies
        Cookies.remove("firstName");
        Cookies.remove("lastName");
        Cookies.remove("refresh");
        Cookies.remove("access");

        // Go the root directory
        router.push('/');
    }

    // List of items for the sidebar
    const items = [
        {
            title: "Home",
            icon: <AiOutlineHome/>
        },
        {
            title: "Cameras",
            icon: <AiOutlineCamera/>
        },
        {
            title: "Configuration",
            icon: <AiOutlineSetting/>
        },
        {
            title: "Metrics",
            icon: <AiOutlineLineChart/>
        },
        {
            title: "Logs",
            icon: <AiOutlineBook/>
        },
        {
            title: "Organizations",
            icon: <AiOutlineTeam/>
        }
    ]

    // Render the list
    const sidebarList = items.map(item => (
        <button key={`${item.title.toLocaleLowerCase()}`} className={`${(asPath.includes(`/dashboard/${item.title.toLocaleLowerCase()}`)) ? "bg-white-p" : "hover:bg-silver"} px-3 py-2 my-1 mx-2 w-full flex justify-start items-center `} onClick={() => router.push(`/dashboard/${item.title.toLocaleLowerCase()}`)}>
            <IconContext.Provider value={{color: (asPath.includes(`/dashboard/${item.title.toLocaleLowerCase()}`)) ? "#000000" : "#FFFFFF", size: "1.5em", className: "mr-2"}}>
                {item.icon}
            </IconContext.Provider>
            <div className={`text-${(asPath.includes(`/dashboard/${item.title.toLocaleLowerCase()}`)) ? "black" : "white-p"} text-lg`}>
                {item.title}
            </div>
        </button>
    ));

    // Create variables to store the first and last names
    const [firstName, setFirstDate] = useState(null);
    const [lastName, setLastDate] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    
    // Make the changes to the name variables
    useEffect(() => {   
        // setFirstDate(cookie.get('firstName'))
        // setLastDate(cookie.get('lastName'))
        // setProfileImage(cookie.get('profileImage'))
    }, []);
    

    // Component return
    return (
        <div className="h-full bg-[#26283b] w-[320px]  drop-shadow-xl">
            <div className="h-full flex flex-col justify-between">
                <div className="grid justify-items-center">
                    <div className="text-white-p tracking-wide text-2xl mt-10 mb-10">
                       <p>ARGOS VISION</p>
                       <p className='text-sm text-gray-300 font-thin'>Dashboard</p>
                    </div>
                
                    {sidebarList}
                </div>
                <div className="bg-white-p m-4 p-3 rounded-lg">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <div className="bg-silver w-8 h-8 mr-2 rounded-full">
                                <img src={`http://localhost:8000/mediafiles/${profileImage}`}></img>
                            </div>
                            <div className="text-black text-sm">
                                {`${firstName} ${lastName}`}   
                            </div>
                        </div>
                        <button onClick={logoutPress}>
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