import React from 'react'
import Particles from "react-tsparticles";
import { useCallback } from "react";
import { loadSlim } from 'tsparticles-slim';
import { resetPassword } from '@/services/userServices';
import { useState } from 'react';

function ChangePassword() {
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
         
      </div>
     );
}

export default ChangePassword;