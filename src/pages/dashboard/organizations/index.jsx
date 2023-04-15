// Import
import { ToastContainer, toast } from 'react-toastify';
import { successToaster } from '@/components/toasters';
import { AiOutlinePlus } from 'react-icons/ai';
import PageTitle from "@/components/pageTitle";
import { useState, useEffect } from 'react';
import Sidebar from "@/components/sidebar";
import { IconContext } from "react-icons";
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import React from "react";

// Function to define the organization
export default function Organization() {
    // Get the router
    const router = useRouter();

    // Create variables for the intake of data
    const [orgData, setOrgData] = useState([]);

    // Pop toaster message if a s
    useEffect(() => {
        const refresh = Cookies.get('success');
        if (refresh != "") {
            Cookies.set('success', "");
            successToaster(refresh);
        }
    }, []);

    // Query data and store it
    useEffect(() => { 
        // Function to get data
        async function getOrgData() {

            // API Call
            const res = await fetch(
                'http://localhost:8000/api/v1/group/data/',
                {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${Cookies.get('access')}`
                    }
                }
            );

            // Get JSON format of response
            const json = await res.json();

            // Store data
            setOrgData(json);
        }

        // Call retriever
        getOrgData();
    }, []);

    // Add organizaiton handler
    const addOrganization = async () => {
        // Move the add page
        router.push('/dashboard/organizations/add');
    }

    // Card Component
    const card = (item) => {
        return (
            <button className="relative w-60 h-60 rounded-xl drop-shadow-2xl bg-sky mb-5 mr-5">
                <div className="flex justify-center absolute h-10 rounded-b-xl drop-shadow-xl bottom-0 left-0 right-0 opacity-50 bg-white-p">
                    <div className="font-boldVazir m-2 text-xl">
                        {`${item['name']}`}
                    </div>
                </div>
            </button>
        );
    }

    // Check if the user does not have any organizations
    var orgList = (
        <div className="flex flex-wrap">
            {orgData.map(item => (card(item)))}
            <button className="w-60 h-60 rounded-xl border-2 border-dashed border-sky p-4 flex flex-col justify-center items-center" onClick={addOrganization}>
                <IconContext.Provider value={{color: "#60a5fa", size: "3em"}}>
                    <AiOutlinePlus/>
                    <div className="m-2 text-sky">
                        Add Organization
                    </div>
                </IconContext.Provider>
            </button>
        </div>
    );

    // Component return
    return (
        <div className="relative flex h-full flex-row">
            <Sidebar></Sidebar>
            <div className="m-10 w-full">
                <div className="flex-col justify-between">
                    <div className="font-boldVazir text-3.5xl mb-16">
                        {PageTitle()}
                    </div>
                    <div className="">
                        {orgList}
                    </div>
                </div>
            </div>
            <ToastContainer
                position="bottom-right"
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
    );
}