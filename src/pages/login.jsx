// Imports
import React from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { errorToaster } from '@/components/toasters'
import { loadSlim } from 'tsparticles-slim'
import { useEffect, useState } from 'react'
import Particles from 'react-tsparticles'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import Cookies from 'js-cookie'

import { GiBleedingEye } from 'react-icons/gi'
import { BiLogInCircle } from 'react-icons/bi'
import { loginService, registerService } from '@/services/userServices'
import { BsEye } from 'react-icons/bs'
import { VerifyUsers } from '@/services/UserManagmentServices'

// Login Page definitions
const Login = () => {
  // Variable declaration and initialization
  const router = useRouter()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [isloading, setIsloading] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  // Particle settings
  const particlesSettings = {
    background: {
      color: {
        value: '#1d2126',
      },
      opacity: 1,
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
        value: '#ffffff',
      },
      move: {
        directions: 'none',
        enable: true,
        outModes: {
          default: 'bounce',
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
        type: 'circle',
      },
      size: {
        value: { min: 1, max: 3 },
      },
    },
    detectRetina: true,
  }

  // Particle engine initialization
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine)
  }, [])

  // Function call when the login button is pressed
  const loginPress = async () => {
    setIsloading(true)
    // const { data, status } = await VerifyUsers(1, { is_verified: true })
    // router.push('/dashboard/home')x
    const payload = {
      email: email,
      password: password,
    }
    try {
      const { data, status } = await loginService(payload)

      if (status === 200) {
        // localStorage.setItem('User_data', JSON.stringify(data))
        localStorage.setItem('AccessToken', data.tokens.access)
        localStorage.setItem('Refresh', data.tokens.refresh)
        router.push('/dashboard/home')
      }
    } catch (error) {
      console.log(error)
      if (error.response.status === 400) {
        setIsloading(false)
        toast.error(error.response.data?.email[0])
      }
      if (error.response.status === 401) {
        setIsloading(false)
        toast.error(error.response.data.detail)
      }
      if (error.response.status === 500) {
        setIsloading(false)
        toast.error('Server error 500')
      }
    }
  }

  // Component return
  return (
    <div className="relative flex h-full items-center  justify-center">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesSettings}
      />
      <div className="h-screen w-full ">
        <div className="flex w-full justify-center">
          <div className=" text-white-p h-screen w-full rounded-md bg-blue-400  bg-opacity-0 bg-clip-padding pt-[200px] backdrop-blur-md backdrop-filter  ">
            <div className="font-boldVazir mt-10 flex items-center justify-center text-3xl ">
              <img
                src="https://i.ibb.co/Xk0MPxS/Argos-Logo.png"
                className="h-[100px] w-[200px] object-contain"
              ></img>
            </div>
            <div className="flex w-full  justify-center">
              <p className="mt-2 border-b border-[#5ddaf0] font-thin tracking-wider text-white">
                DASHBOARD LOGIN
              </p>
            </div>
            <div className="flex w-full justify-center text-white">
              <div>
                <div>
                  <input
                    onChange={(e) => setEmail(e.currentTarget.value)}
                    className="text-white-p mt-4 h-[40px] w-[300px] border-b border-[#515152] bg-transparent outline-none placeholder:text-gray-300 focus:border-[#5ddaf0]"
                    placeholder="Email"
                  ></input>
                </div>
                <div className="relative">
                  <BsEye
                    onClick={() => setIsVisible(!isVisible)}
                    className="absolute right-2 top-7 h-[20px] w-[20px]"
                  />
                  <input
                    type={isVisible ? 'text' : 'password'}
                    onChange={(e) => setPassword(e.currentTarget.value)}
                    className="text-white-p mt-4 h-[40px] w-[300px] border-b border-[#515152] bg-transparent outline-none placeholder:text-gray-300 focus:border-[#5ddaf0]"
                    placeholder="Password"
                  ></input>
                </div>
              </div>
            </div>
            <div className="flex w-full justify-center text-white">
              <div>
                <p
                  onClick={() => router.push('/reset_password/')}
                  className="mt-3 w-[300px] cursor-pointer text-white hover:text-blue-400"
                >
                  Forgot your password ?{' '}
                </p>
              </div>
            </div>

            <div className="flex w-full justify-center">
              <button
                onClick={loginPress}
                className="mt-10 flex h-[50px] w-[200px] items-center justify-center rounded-md bg-blue-500 font-thin text-white hover:bg-blue-600"
              >
                {isloading ? (
                  <div className="mr-3 h-[20px] w-[20px] animate-spin rounded-full border-t-2"></div>
                ) : (
                  <BiLogInCircle className="mr-2 h-[25px] w-[25px]" />
                )}
                <p className="text-lg">Login</p>
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
  )
}

// Export the Login page
export default Login
