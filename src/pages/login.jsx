// Imports
import { ToastContainer, toast } from 'react-toastify';
import { errorToaster } from '@/components/toasters';
import { loadSlim } from "tsparticles-slim";
import { useEffect } from 'react';
import Particles from "react-tsparticles";
import { useRouter } from 'next/router';
import { useCallback } from "react";
import Cookies from 'js-cookie';
import React from "react";
import {GiBleedingEye} from 'react-icons/gi'
import { BiLogInCircle } from 'react-icons/bi';

// Login Page definitions
const Login = () => {
    // Variable declaration and initialization
    const router = useRouter();

    // Particle settings 
    const particlesSettings = {
        background: {
            color: {
                value: "#24273b",
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
                value: "#00eeff",
            },
            move: {
                directions: "none",
                enable: true,
                outModes: {
                    default: "bounce",
                },
                random: false,
                speed: 1,
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

    // Pop toaster message if noTokens cookie is present
    useEffect(() => {
        const refresh = Cookies.get('noTokens');
        if (refresh === 'true') {
            Cookies.set('noTokens', false);
            errorToaster('Login to access your dashboard', 'top-center');
        }
    }, []);

    // Function call when the login button is pressed
    const loginPress = async () => {
        router.push('/dashboard/home')
        // Try to login
        try {
            // Send API request
            const res = await fetch(
                'http://localhost:8000/api/v1/auth/login/',
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(
                        {
                            "email": document.getElementById('email').value,
                            "password": document.getElementById('password').value,
                        }
                    ),
                }
            );

            // Turn API request result into JSON
            const data = await res.json();
            
            // Check if the response is not OK
            if (!res.ok) {
                // Check if the email has any issues
                if (Array.isArray(data['email'])) {
                    // Print email's issue
                    errorToaster("Email: " + data['email'][0]);
                }

                // Check if the password has any issues
                if (Array.isArray(data['password'])) {
                    // Print password's issue
                    errorToaster("Password: " + data['password'][0]);
                }
                
                // Check if details appear in the response
                if ('detail' in data) {
                    // Check if the 
                    errorToaster(data['detail']);
                }
            }

            // If the login was a sucess, move to the dashboard and 
            // store information into a cookie
            else {
                // Store basic information into a cookie
                cookie.set('firstName', data['firstname']);
                cookie.set('lastName', data['lastname']);
                cookie.set('profileImage', data['profile_image']);
                Cookies.set('refresh', data['tokens']['refresh']);
                Cookies.set('access', data['tokens']['access']);
                Cookies.set('success', "");
                
                // Move to the dashboard
                router.push('/dashboard/home');
            }

        // Catch any errors
        } catch (err) {
            // Print errors
            console.log(err);
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
                    <div className='mt-[240px] w-full h-[500px] text-white-p bg-blue-400  rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0  '>
                        <div className='flex items-center justify-center text-3xl mt-10 font-boldVazir '>
                            <div className='text-center  flex items-center'>
                            <p>ARG</p>
                                <GiBleedingEye className='w-[60px] h-[60px]'/>
                            </div>
                            <p>S VISION</p>
                        </div>
                        <div className='flex w-full  justify-center'>
                            <p className='mt-2 font-thin tracking-wider border-b border-[#5ddaf0]'>LOGIN PANEL</p>
                        </div>
                        <div className='flex w-full justify-center'>
                            <div>
                                    <div>
                                        <input className='mt-4 w-[300px] h-[40px] bg-transparent border-b border-[#515152] focus:border-[#5ddaf0] placeholder:text-gray-300 text-white-p outline-none' placeholder='Email'></input>
                                    </div>
                                    <div>
                                        <input className='mt-4 w-[300px] h-[40px] bg-transparent border-b border-[#515152]  focus:border-[#5ddaf0] placeholder:text-gray-300 text-white-p outline-none' placeholder='Password'></input>
                                    </div>
                            </div>
                        </div>
                        <div className='flex w-full justify-center'>
                            <button className='mt-10 w-[200px] flex rounded-md items-center justify-center h-[50px] bg-[#4097a7] font-thin'>
                                <BiLogInCircle className='w-[25px] mr-2 h-[25px]'/>
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