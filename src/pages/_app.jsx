// Imports
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/tailwind.css'
import 'focus-visible'
import { decodeToken } from '@/utils/DecodeToken';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import jwtDecode from 'jwt-decode';
import jwt from 'jsonwebtoken';
import Script from 'next/script';

// Function to run App
export default function App({ Component, pageProps }) {
    const router =useRouter()

      
           
   
        // try {
        //        const token = localStorage.getItem("AccessToken");
        //     if (token) {
        //         const decodedToken = decodeToken(token);
        //         const dateNow = Date.now() / 1000;
              
        //         if (decodedToken.payload.exp < dateNow) {
        //             localStorage.removeItem("AccessToken");
        //             router.push('/')
                  
        //         }
        //     }
        // } catch (error) {
            
        // }
           
    
    
     


    // Default loading
    return (
        <>
                <Component {...pageProps} />
                <Script src='https://api.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.js'/>
        </>
    )
}