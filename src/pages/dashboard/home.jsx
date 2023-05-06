// Imports
import NavigationCard from "@/components/cards/NavigationCards";
import Sidebar from "@/components/sidebar";
import React from "react";
import { AiOutlineSetting } from "react-icons/ai";
import { BiBarChart, BiCamera, BiSearch } from "react-icons/bi";
import { GiBleedingEye, GiLog, GiNotebook } from "react-icons/gi";
import {BsFillPeopleFill} from 'react-icons/bs';
import {HiOutlineStatusOnline} from 'react-icons/hi'
import NavigationBar from "@/components/NavigationSection/NavigationBar";
import { useRouter } from "next/router";
import 'mapbox-gl/dist/mapbox-gl.css';
import {RiRadioButtonLine} from 'react-icons/ri'
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import CircularProgress from "@/components/Progressbar/CircularProgress";

import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import Table from "@/components/Table/Table";

// Login Page definitions
const Home = () => {
 const imgsrc = 'https://www.maxpixel.net/static/photo/1x/Young-Smile-Portrait-Ai-Generated-Man-Teeth-7833751.jpg'
 const date = new Date()
 const router = useRouter()
 const path = router.pathname


    // Component return
    mapboxgl.accessToken = 'pk.eyJ1IjoicGFydGl5YTAyMTAiLCJhIjoiY2xoYzVjODlnMDlhbzNtbnZyNzdvZDV0NSJ9.pENwwnr9suPHN1Liq2izQA';
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(7);
    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],
        zoom: zoom
        });
        });
    return (
        <div className="">
            <div className="flex w-full justify-between items-center pt-5 shadow-md pb-4 ">
                <div className="ml-10">
                    <div className="flex  text-2xl items-center">
                        <img src="https://i.ibb.co/swKsNv1/output-onlinepngtools.png" className="object-contain w-[150px] h-[50px]"></img>
                    </div>
                    <p className="text-sm uppercase text-gray-500 ml-3 mt-3">{path.slice(1,10) + ' > ' + path.slice(11,15)}</p>
                </div>
                <div className="mr-10 flex items-center">
                    <HiOutlineStatusOnline className="w-[25px] h-[25px] mr-2 animate-blink text-green-500"/>
                    <p>Welcome Partiya !</p>
                    <img src={imgsrc} className="w-[60px] h-[60px] border rounded-full ml-3 object-cover"></img>
                </div>

            </div>
            <div className=" mt-10">
                    <NavigationBar/>
            </div>
            <div className="w-full flex justify-center mt-10">
                <hr className="w-3/4"></hr>
            </div>
            <div className="flex items-center w-full justify-center mt-5">
                <CircularProgress  
          
                DetailText={'This graph is showing you  the number of live cameras     '} 
                BgColor={'bg-green-500'} trailColor={'#00a851'} 
                Title={'Active cameras'} 
                value={7} 
                maxValue={10} 
                />
                <CircularProgress  
                DetailText={'This graph is showing you  the number of disabled cameras    '} 
                BgColor={'bg-red-500'} trailColor={'#9e022e'} 
                Title={'Out of service'} 
                value={2} 
                maxValue={10} 
                />
                <CircularProgress  
                DetailText={'This graph is showing you  the number of calibrated cameras     '} 
                BgColor={'bg-orange-500'} trailColor={'#9e5302'} 
                Title={'Calibrated'} 
                value={10} 
                maxValue={10} 
                />
            </div>
            <div className="mt-10 pb-10 flex items-center w-full justify-center">
                {/* MAP CONTAINER  */}
                <div ref={mapContainer} className='h-[600px] w-1/3 rounded-tl-xl rounded-bl-xl' />
                <Table/>
            </div>
            
         </div>
         
     
    );
}

// Export the Dashboard page
export default Home;