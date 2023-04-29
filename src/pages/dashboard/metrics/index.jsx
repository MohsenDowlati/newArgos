// Imports
import PageTitle from "@/components/pageTitle";
import Sidebar from "@/components/sidebar";
import MapWrapper from '@/components/Map/map';
import React from "react";

// Login Page definitions
export default function Metrics() {    

    // Component return
    return (
        <div className="relative flex h-full flex-row">
            <Sidebar></Sidebar>
            <div className="m-10 w-full">
                <div className="font-boldVazir text-3.5xl mb-16">
                    {PageTitle()}
                </div>
                <MapWrapper/>         
            </div>
        </div>
    );
}


