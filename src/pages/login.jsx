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
import {Register} from "@/services/Register";
// Login Page definitions
const Login = () => {
  // Variable declaration and initialization
  const [rightPanel , setRightPanel] = useState("");

  const[name , setName] = useState('');
  const[email , setEmail] = useState('');
  const[passwordSignUp , setPasswordSignUp] = useState('');
  const[passwordSignUpAgain , setPasswordSignUpAgain] = useState('');
  const[company , setCompany] = useState('');

  const[passwordSignIn , setPasswordSignIn] = useState('');
  const[emailSignIn , setEmailSignIn] = useState('');
  //useEffect

  useEffect(()=>{

  })
  //handle API
  async function sign_up(data) {
    try{
      const {data,status} = await Register(data)
      if (status===201)
    } catch (e) {
      console.log(e)
    }
  }

  async function

  // Function call when the sign-up button pressed
  const handleSignUp = () => {
    if (signUpValidation()) {
      const data = {
        "name": name,
        "email": email,
        "password": passwordSignUp,
        "passwordConfirm": passwordSignUpAgain,
        "photo": null,
        "company_name": company,
      };
      console.log(data)

    }

  }

  const signUpValidation = () => {
    if (name === "" || email === "" || passwordSignUp === "" || passwordSignUpAgain === "" || company === "") {
      toast("Fill out all textFields.")
      return false;
    } else {
      if (passwordSignUp.length < 8){
        toast("Password must contains at least 8 character.")
        return false;
      } else{
      if (passwordSignUp === passwordSignUpAgain) {
        return true;
      }
      toast("Password and Password confirmation must be same.")
      return false;
    }
    }
  }

  const handleSignIn = () => {
    const data = {
      "name": passwordSignIn,
      "email": emailSignIn,
    }

    console.log(data)
  }

  // Component return
  return (
    <div className="relative flex h-full items-center  justify-center bg-main">
      <div className="h-screen w-full ">
        <div className="flex w-full justify-center flex-col">
            <div className="font-boldVazir mt-10 flex items-center justify-center text-3xl">
              <img
                src="https://i.ibb.co/Xk0MPxS/Argos-Logo.png"
                className="h-[100px] w-[200px] object-contain"
              ></img>
            </div>
                <div className={`container ${rightPanel} mt-6`}>
                  <div className="form-container sign-up-container">
                    <form action="#">
                      <h1>Sign Up</h1>
                      <label>
                        <input type="text" placeholder="Name" onChange={(e)=>setName(e.currentTarget.value)}/>
                      </label>
                      <label>
                        <input type="email" placeholder="Email" onChange={(e)=>setEmail(e.currentTarget.value)}/>
                      </label>
                      <label>
                        <input type="password" placeholder="Password" onChange={(e)=>setPasswordSignUp(e.currentTarget.value)}/>
                      </label>
                      <label>
                        <input type="password" placeholder="Password" onChange={(e)=>setPasswordSignUpAgain(e.currentTarget.value)}/>
                      </label>
                      <label>
                        <input type="text" placeholder="Company" onChange={(e)=>setCompany(e.currentTarget.value)}/>
                      </label>
                      <button className={"mt-2.5 bg-second"} onClick={handleSignUp}>Sign Up</button>
                    </form>
                  </div>
                  <div className="form-container sign-in-container">
                    <form action="#">
                      <h1>Sign in</h1>
                      <label>
                        <input type="email" placeholder="Email" onChange={(e)=>setEmailSignIn(e.currentTarget.value)}/>
                      </label>
                      <label>
                        <input type="password" placeholder="Password" onChange={(e)=>setPasswordSignIn(e.currentTarget.value)}/>
                      </label>
                      <a href="#">Forgot your password?</a>
                      <button className={"bg-second"} onClick={handleSignIn} >Sign In</button>
                    </form>
                  </div>
                  <div className="overlay-container">
                    <div className="overlay">
                      <div className="overlay-panel overlay-left bg-second">
                        <h1>Log in</h1>
                        <p>Sign in here if you already have an account </p>
                        <button className="ghost mt-5" id="signIn" onClick={()=>setRightPanel("")}>Sign In</button>
                      </div>
                      <div className="overlay-panel overlay-right bg-second">
                        <h1>Create, Account!</h1>
                        <p>Sign up if you still don't have an account ... </p>
                        <button className="ghost" id="signUp" onClick={()=>setRightPanel("right-panel-active")}>Sign Up</button>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>

        <ToastContainer
          position="top-right"
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
  )
}

// Export the Login page
export default Login
