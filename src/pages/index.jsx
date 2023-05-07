// Import
import Login from './login';
import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';


export default function Home() {
  const[hastoken,setHastoken] = useState()
  const router = useRouter()
  
      
 

    return (
       <Login/>
        
    )

}