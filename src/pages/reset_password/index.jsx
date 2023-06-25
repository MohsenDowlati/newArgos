import React from 'react'
import Particles from "react-tsparticles";
import { useCallback } from "react";
import { loadSlim } from 'tsparticles-slim';
import { resetPassword } from '@/services/userServices';
import { useState } from 'react';

function Reset_password() {
        const [email,setEmail] = useState()
        const [redirectUrl,setRedirectUrl] = useState('/reset_password')
        const [IsSuccess,setIsSuccess] = useState(false)
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


   async function Resetpasswordrequest(){
        const obj = {
            email:email,
            redirect_url:redirectUrl
        }
        const {data,status} = await resetPassword(obj)
        
        if(status===200){
            setIsSuccess(true)
        }
        console.log(data)
    }


    // Particle engine initialization
    const particlesInit = useCallback(async engine => {
        await loadSlim(engine);
    }, []);
    return ( 
        <div className='relative w-full flex items-center justify-center h-screen'>
          <Particles
                id="tsparticles"
                init={particlesInit}
                options={particlesSettings}
            />
            <div className='w-[30%] z-10 p-10 rounded-xl backdrop-blur-md border'>
                {
                    IsSuccess ? 
                    
                    
                    <div className='p-10'>
                        <p className='text-white text-center mt-3'>Verification email has been sent to <span className='text-blue-500   text-lg'>{email}</span></p>
                    </div>
                    
                    
                    : <div>
                        <p className='text-center mt-5 text-white'>Please enter your email below in order to reset your password</p>
                    <p className='text-center text-orange-300'>Verification email will be sent to this email </p>
                    <input onChange={(e)=>setEmail(e.target.value)} value={email} className='w-full outline-none bg-transparent border-b mt-5 h-[50px] text-white px-2' placeholder='example@gmail.com'/>
                    <div className='flex items-center w-full justify-center'>
                    <button onClick={Resetpasswordrequest} className='w-[120px] h-[40px] bg-blue-600 text-white rounded-lg mt-6'>
                        Submit
                    </button>
                    </div>
                    </div>
                    
                    
                    
            
                }
            </div>
        </div>
     );
}

export default Reset_password;