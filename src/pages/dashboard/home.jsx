// Imports
import Sidebar from "@/components/sidebar";
import React from "react";

// Login Page definitions
const Home = () => {

    // Component return
    return (
        <div className="relative flex h-full flex-row">
            <Sidebar></Sidebar>
            <div className=" m-10 w-full">
                Home
            </div>
        </div>
    );
}

// Export the Dashboard page
export default Home;