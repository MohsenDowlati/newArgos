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
            <div className="absolute h-1/3 w-1/5 bg-white-p flex-col items-center justify-left rounded-xl drop-shadow-xl">
                <div className="text-4xl ml-10 mt-10">
                    Webportal Login
                </div>
                <div className="mx-10 my-7">
                    <input class="drop-shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"/>
                </div>
                <div className="mx-10 my-7">
                    <input class="drop-shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Password"/>
                </div>
                <button onClick={loginPress} class="absolute text-xl mx-10 mt-2 py-1 px-4 bg-silver rounded-md drop-shadow-lg">
                    Login
                </button>
            </div>
        </div>
    );
};
  
// Export the Login page
export default Login;