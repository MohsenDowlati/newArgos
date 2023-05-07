// Imports
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/tailwind.css'
import 'focus-visible'
import { decodeToken } from '@/utils/DecodeToken';
import { useEffect } from 'react';
import { useState } from 'react';
// Function to run App
export default function App({ Component, pageProps }) {
    useEffect (() => {
        
        try {
            const token = localStorage.getItem("AccessToken");
            if (token) {
                const decodedToken = decodeToken(token);
                const dateNow = Date.now() / 1000;

                if (decodedToken.payload.exp < dateNow) {
                    localStorage.removeItem("AccessToken");
                }
            }
        } catch (e) {
            console.log(e)
        }

    }, []);
    // Default loading
    return (
        <Component {...pageProps} />
    )
}