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
        <div className="bg-[#212326] w-full">
            <Navbar Notabsolute={'block'} />
            <div className="flex h-fit">
                <div className="      ">
                <NavigationBar WhichActive={'Camera'} />
                </div>
                <div className="bg-[#292c30]  w-full">
                <div className="h-full">
                    <div className="App">
                    {image ? <img src={image} alt="Webcam capture" width="900" height="1500" /> : <p>Loading...</p>}
                    </div>
                </div>
                </div>
            </div>
            </div>

    );
}

// Export the Dashboard page
export default Cameras;


/*
// Login Page definitions
const Cameras = () => {
    const router = useRouter()
    const path = router.pathname
    const imgsrc = 'https://www.maxpixel.net/static/photo/1x/Young-Smile-Portrait-Ai-Generated-Man-Teeth-7833751.jpg'
    const [src,setSrc] = useState()
    const videoRef = useRef(null);
    const url = 'rtsp://54.153.60.79:3000/ds-test';
   
    
    

    return (
        <div className="bg-[#212326] w-full ">
            <Navbar Notabsolute={'block'}/>
            <div className="flex h-fit">
            <div className="      ">
                    <NavigationBar WhichActive={'Camera'}/>
            </div>
            <div className="bg-[#292c30]  w-full ">
                              
              <div className="h-full">
                  <video id="player" className="w-full h-full" controls preload>
                      <source src="http://52.53.105.21:5000" type="application/x-mpegURL"/>
                  </video>

              </div>
                    </div>
                </div>
            </div>

    );
}

// Export the Dashboard page
export default Cameras;
*/