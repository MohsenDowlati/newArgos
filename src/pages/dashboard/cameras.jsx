// Imports
import Navbar from "@/components/Navbar/Navbar";
import NavigationBar from "@/components/NavigationSection/NavigationBar";
import Sidebar from "@/components/sidebar";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { GiBleedingEye } from "react-icons/gi";
import { HiOutlineStatusOnline } from "react-icons/hi";
import WebSocket from "reconnecting-websocket";


// Login Page definitions
const Cameras = () => {
    const [image, setImage] = useState(null);

    useEffect(() => {
    async function fetchImage() {
      try {
        const response = await fetch("https://api.argos.vision/api/v1/camera/stream/live/");
        
        if (!response.ok) {
          console.error("Error fetching image:", response.statusText);
          return;
        }

        const data = await response.json();
        setImage("data:image/jpeg;base64," + data.image);
      } catch (error) {
        console.error("Error occurred:", error);
      }
    }

    // Fetch the image immediately
    fetchImage();

    // Set an interval to fetch a new image every 5 seconds
    const interval = setInterval(() => {
      fetchImage();
    }, 1000); // 5000 milliseconds = 5 seconds

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(interval);
  }, []);
   
    return (
      <div className="w-full bg-[#212326] ">
        <Navbar />
        <div className="flex h-fit">
          <div className="  min-h-screen  pt-28   ">
            <NavigationBar WhichActive={'Logs'} />
          </div>
          <div className="min-h-screen  w-full bg-[#292c30] pt-32">
            <div className="flex w-full items-center justify-center">
              <div className="mt-5 flex items-center ">
                <div className="App">
                    {image ? <img src={image} alt="Webcam capture" width="900" height="1500" /> : <p>Loading...</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    
}   


// Export the Dashboard page
export default Cameras;


