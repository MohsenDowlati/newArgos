// Import
import Login from './login';
import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Dhome from './dashboard/home';
import { useEffect } from 'react';


export default function Home() {
  const[hastoken,setHastoken] = useState(true)
  const router = useRouter()
  
      
  useEffect(() => {
    const token = localStorage.getItem('AccessToken')
    if(token){
        setHastoken(true)
        router.replace('/dashboard/home')
    }else{
      setHastoken(false)
    }
   
   }, []); 

    return (
      <>
      {
       hastoken ? <Dhome/> : <Login/>
      }
      </>
       
        
    )

}