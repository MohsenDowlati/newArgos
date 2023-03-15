// Imports
import Sidebar from "@/components/sidebar";
import React from "react";

// Login Page definitions
const Logs = () => {

    // Component return
    return (
        <div className="relative flex h-full flex-row">
            <Sidebar></Sidebar>
            <div className=" m-10 h-full w-full">
                Logs
            </div>
        </div>
    );
}

// Export the Dashboard page
export default Logs;