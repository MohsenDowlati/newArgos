// Imports
import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import { errorToaster } from '@/components/toasters';
import { loadSlim } from "tsparticles-slim";
import { useEffect, useState } from 'react';
import Particles from "react-tsparticles";
import { useRouter } from 'next/router';
import { useCallback } from "react";
import Cookies from 'js-cookie';

import {GiBleedingEye} from 'react-icons/gi'
import { BiLogInCircle } from 'react-icons/bi';
import { loginService, registerService } from '@/services/userServices';
import { BsEye } from "react-icons/bs";

// Login Page definitions
const Login = () => {
    // Variable declaration and initialization
    const router = useRouter();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [isloading,setIsloading] = useState(false)
    const [isVisible,setIsVisible] = useState(false)
  


    // Particle settings 
    const particlesSettings = {
        background: {
            color: {
                value: "#1d2126",
            },
            opacity: 1
        },
        fpsLimit: 120,
        interactivity: {
            events: {
                resize: true,
            },
            modes: {
                push: {
                    quantity: 4,
                },
                repulse: {
                    distance: 200,
                    duration: 0.4,
                },
            },
        },
        particles: {
            color: {
                value: "#ffffff",
            },
            move: {
                directions: "none",
                enable: true,
                outModes: {
                    default: "bounce",
                },
                random: false,
                speed: 2,
                straight: false,
            },
            number: {
                density: {
                    enable: true,
                    area: 800,
                },
                value: 300,
            },
            opacity: {
                value: 1,
            },
            shape: {
                type: "circle",
            },
            size: {
                value: { min: 1, max: 3 },
            },
        },
        detectRetina: true,
    }

    // Particle engine initialization
    const particlesInit = useCallback(async engine => {
        await loadSlim(engine);
    }, []);

    

    // Function call when the login button is pressed
    const loginPress = async () => {
        setIsloading(true)

        // router.push('/dashboard/home')
        const payload = {
            email : email,
            password : password
        }
        
        const {data,status} = await loginService(payload)
        
        if(status === 200){
            localStorage.setItem('User_data',JSON.stringify(data))
            localStorage.setItem('AccessToken',JSON.stringify(data.tokens.access))
            localStorage.setItem('Refresh',JSON.stringify(data.tokens.refresh))
            router.push('/dashboard/home')
        }else{
            setIsloading(false)
            toast.error("Something went wrong", {

                position: "top-right",
                closeOnClick: true,
            });
        }
 
      
       
    };

    // Component return
    return (
        <div className="relative h-full flex items-center  justify-center">
             <Particles
                id="tsparticles"
                init={particlesInit}
                options={particlesSettings}
            />
            <div className='w-full h-screen '>
                <div className='w-full flex justify-center'>
                    <div className=' w-full pt-[200px] h-screen text-white-p bg-blue-400  rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-0  '>
                        <div className='flex items-center justify-center text-3xl mt-10 font-boldVazir '>
                            <img src='https://i.ibb.co/Xk0MPxS/Argos-Logo.png' className='object-contain w-[200px] h-[100px]'></img>
                        </div>
                        <div className='flex w-full  justify-center'>
                            <p className='mt-2 font-thin tracking-wider border-b text-white border-[#5ddaf0]'>DASHBOARD LOGIN</p>
                        </div>
                        <div className='flex w-full text-white justify-center'>
                            <div>
                                    <div>
                                        <input onChange={(e)=>setEmail(e.currentTarget.value)} className='mt-4 w-[300px] h-[40px] bg-transparent border-b border-[#515152] focus:border-[#5ddaf0] placeholder:text-gray-300 text-white-p outline-none' placeholder='Email'></input>
                                    </div>
                                    <div className="relative">
                                        <BsEye onClick={()=>setIsVisible(!isVisible)} className="absolute right-2 w-[20px] h-[20px] top-7"/>
                                        <input type={isVisible ? 'text' : 'password'} onChange={(e)=>setPassword(e.currentTarget.value)} className='mt-4 w-[300px] h-[40px] bg-transparent border-b border-[#515152] focus:border-[#5ddaf0] placeholder:text-gray-300 text-white-p outline-none' placeholder='Password'></input>
                                    </div>
                            </div>
                        </div>
                        <div className='flex w-full text-white justify-center'>
                        <div>
                            <p onClick={()=>router.push('/reset_password/')} className="text-white w-[300px] mt-3 cursor-pointer hover:text-blue-400">Forgot your password ? </p>
                        </div>
                                 
                        </div>
                       
                        <div className='flex w-full justify-center'>
                            <button onClick={loginPress} className='mt-10 w-[200px] hover:bg-blue-600 text-white flex rounded-md items-center justify-center h-[50px] bg-blue-500 font-thin'>
                                {
                                    isloading 
                                        ? <div className="w-[20px] animate-spin h-[20px] mr-3 border-t-2 rounded-full"></div>
                                        : <BiLogInCircle className='w-[25px] mr-2 h-[25px]'/>
                                }
                                <p className='text-lg'>Login</p>
                            </button>
                        </div>
                       
                    </div>
                </div>
       
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />

            </div>
          
        </div>
    );
};
  
// Export the Login page
export default Login;