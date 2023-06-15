// Imports
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/tailwind.css'
import 'focus-visible'

import { useEffect } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';

import Script from 'next/script';
import jwt_decode from 'jwt-decode';
// Function to run App
export default function App({ Component, pageProps }) {
    const router =useRouter()

      
           
   
    function isTokenExpired(token) {
        if (token) {
          const decodedToken = jwt_decode(token);
          const currentTime = Date.now() / 1000; // Convert milliseconds to seconds
          console.log('decode ==  > ' , decodedToken)
          // Check if the token has an expiration date
          if (decodedToken.exp && decodedToken.exp < currentTime) {
            return localStorage.clear(),router.push('/'); // Token has expired
          } else {
            return false; // Token is valid
          }
        } else {
          return false; // No token provided
        }
      }
           
    useEffect(() => {
        isTokenExpired(localStorage.getItem('AccessToken'))
    }, []);
    
     


    // Default loading
    return (
        <>
                <Component {...pageProps} />
                <Script src='https://api.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.js'/>
        </>
    )
}