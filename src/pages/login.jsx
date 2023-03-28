// Imports
import Particles from "react-tsparticles";
import { useRouter } from 'next/router';
import { loadSlim } from "tsparticles-slim";
import { useCallback } from "react";
import React from "react";

// Login Page definitions
const Login = () => {

    // Variable declaration and initialization
    const router = useRouter();

    // Particle settings 
    const particlesSettings = {
        background: {
            color: {
                value: "#0d47a1",
            },
            opacity: 0
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
                value: "#808080",
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
                value: 0.5,
            },
            shape: {
                type: "circle",
            },
            size: {
                value: { min: 1, max: 5 },
            },
        },
        detectRetina: true,
    }

    // Particle engine initialization
    const particlesInit = useCallback(async engine => {
        await loadSlim(engine);
    }, []);

    // Function call when the login button is pressed
    function loginPress() {
        router.push('/dashboard/home')
    }

    // Component return
    return (
        <div className="relative h-full bg-gradient-to-tr from-black to-white-p flex items-center justify-center">
            <Particles
                id="tsparticles"
                init={particlesInit}
                options={particlesSettings}
            />
            <div className="h-1/4 w-1/7 bg-white-p rounded-xl drop-shadow-xl">
                <div className="px-5 h-full flex flex-col justify-around">
                    <div className="text-3xl">
                        Webportal Login
                    </div>
                    <div className="">
                        <input class="drop-shadow-md appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"/>
                    </div>
                    <div className="">
                        <input class="drop-shadow-md appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Password"/>
                    </div>
                    <button onClick={loginPress} class="w-1/4 text-lg bg-silver rounded-md drop-shadow-lg hover:bg-black-p">
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
};
  
// Export the Login page
export default Login;