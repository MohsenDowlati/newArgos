import ListBox from '@/components/DropdownBtn/ListDropDown'
import Navbar from "@/components/Navbar/Navbar";
import NavigationBar from "@/components/NavigationSection/NavigationBar";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Cameras = () => {
    const [camera_id, setCamera_id] = useState('0');
    const [image, setImage] = useState(null);
    let interval;
    const router = useRouter();

    async function fetchImage() {
        try {
            const response = await fetch(`https://api.argos.vision/api/v1/camera/stream/live/?camera_id=${camera_id}`);
            
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

    useEffect(() => {
        if (camera_id !== '0') {
            fetchImage();
            interval = setInterval(fetchImage, 1000);
        }

        return () => clearInterval(interval);
    }, [camera_id]);

    useEffect(() => {
        const handleRouteChange = () => {
            clearInterval(interval);
        };

        router.events.on('routeChangeStart', handleRouteChange);
        return () => {
            router.events.off('routeChangeStart', handleRouteChange);
        };
    }, []);

    return (
        <div className="w-full bg-[#212326]">
            <Navbar />
            <div className="flex h-fit">
                <div className="min-h-screen pt-28">
                    <NavigationBar WhichActive={'Camera'} />
                </div>
                <div className="min-h-screen w-full bg-[#292c30] pt-32 flex flex-col items-center">
                    { !image && 
                        <div className="note">
                            Please select a camera from the list to view the live stream.
                        </div>
                    }
                    <div className="mb-5 flex items-center mt-4"> {/* Added mt-4 for margin-top */}
                        <div>
                            <ListBox setCamera_id={setCamera_id} />
                        </div>
                    </div>
                    <div className="App w-full flex justify-center">
                        {image ? <img src={image} alt="Webcam capture" width="900" height="1500" /> : <p></p>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cameras;