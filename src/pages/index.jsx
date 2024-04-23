// Import
import Login from './login';
import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import UploadVideo from "@/pages/dashboard/uploadVideo";


export default function Home() {
  const[hasToken,setHasToken] = useState(false)
  const router = useRouter()
  
      
  useEffect(() => {
    const token = localStorage.getItem('AccessToken')
    if(token){
        setHasToken(true)
        router.replace('/dashboard/uploadVideo')
    }else{
      setHasToken(false)
    }
   
   }, []); 

    return (
      <>
      {
       hasToken ? <UploadVideo/> : <Login/>
      }
      </>
       
        
    )

}