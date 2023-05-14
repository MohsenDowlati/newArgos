// Imports
import React, { useRef } from "react";
import NavigationBar from "@/components/NavigationSection/NavigationBar";
import { useRouter } from "next/router";
import 'mapbox-gl/dist/mapbox-gl.css';

import CircularProgress from "@/components/Progressbar/CircularProgress";
import { useState } from "react";
import ReactMapboxGl, { Layer, Marker } from 'react-mapbox-gl';
import { useEffect } from "react";

import {MdOutlineSatelliteAlt} from 'react-icons/md'
import { RiRoadMapFill } from "react-icons/ri";

import Navbar from "@/components/Navbar/Navbar";
import TestMap from "@/components/Map/TestMap";



// Login Page definitions
const Dhome = () => {
 const date = new Date()
 const router = useRouter()
 const path = router.pathname 
 const [showMap,setShowmap] = useState(false)
 
 const [mapstyle,setMapstyle] = useState('mapbox://styles/mapbox/dark-v11')

 const [data,setData] = useState()
 const example = useRef()

    // Component return
   
    const Map = ReactMapboxGl({
        accessToken: 'pk.eyJ1IjoicGFydGl5YTAyMTAiLCJhIjoiY2xoYzVjODlnMDlhbzNtbnZyNzdvZDV0NSJ9.pENwwnr9suPHN1Liq2izQA',
        
      });
      
     
      
      const centerCoordinates = [-122.431297, 37.773972];
      
        // Check if Token is available 
        useEffect(() => {
            const token = localStorage.getItem('AccessToken')
            if(!token){
               router.push('/')
            }
         
        }, []);

       
        let tempdata2
    // useEffect(() => {
    //     const key = "ARGv30002";
    //     const socket = new WebSocket(`wss://api.argos.vision/ws/socket-server/`)
  
    //  socket.onopen = () => console.log("WebSocket connected");
    //     socket.send(key)
        
    //     socket.onmessage = (event) => {
    //      setData(event.data)
    //      const a = JSON.parse(event.data)
        
    //         example.current = JSON.parse(a.live_data)
         
    //     };
      
    //     return () => {
   
    //         socket.close();
    //     };
     
    // }, []);


   




    return (
        <div className="">
            <Navbar/>
            <div className=" p-10 absolute  z-10 top-28 w-[0px]">
                    <NavigationBar/>
            </div>
            


            <div className="  flex items-center w-full justify-center">
                {/* MAP CONTAINER  */}
            
                {/* <Map 
                     
                     style={mapstyle}
                     center={centerCoordinates}
                     zoom={[3]}
                     
                     className={'w-full h-screen'}
                     
                >
                        
                  {example.current?.payload.detections.wide.map((item,key)=>(
                    
                    <Marker key={key} coordinates={[item.gps[1],item.gps[0]]}>
                        <div className="flex items-center">
                            <BiCctv className="w-[30px] h-[30px] p-1 bg-green-400 text-white rounded-xl "/>
                                <div>
                                    <p className="text-white ml-1">{example.current.payload.date}</p>
                                    <p className="text-white ml-1">{example.current.id}</p>
                                </div>
                        </div>
                    </Marker>
                  ))}
       
                </Map> */}
                <TestMap></TestMap>

            </div>







            <div className="absolute top-32 flex z-[8]  w-full justify-center  ">
                <CircularProgress  
          
                DetailText={'This graph is showing you  the number of live cameras     '} 
                BorderColor={'border-green-500'} trailColor={'#00a851'} 
                Title={'Active cameras'} 
                value={7} 
                maxValue={10} 
                />
                <CircularProgress  
                DetailText={'This graph is showing you  the number of disabled cameras    '} 
                BorderColor={'border-red-500'} trailColor={'#9e022e'} 
                Title={'Out of service'} 
                value={2} 
                maxValue={10} 
                />
                <CircularProgress  
                DetailText={'This graph is showing you  the number of calibrated cameras     '} 
                BorderColor={'border-orange-500'} trailColor={'#9e5302'} 
                Title={'Calibrated'} 
                value={10} 
                maxValue={10} 
                />
            </div>
            <div className="absolute top-32 right-10 z-10">
            <button onClick={()=>setMapstyle('mapbox://styles/mapbox/dark-v11')} className="hover:bg-pink-800 backdrop-blur-sm p-3 my-2 rounded-xl  flex items-center">
                    <RiRoadMapFill className="w-[30px] h-[30px] text-white"/>
                    <p className="text-white ml-2">Normal view</p>
                </button>
                <button onClick={()=>setMapstyle('mapbox://styles/mapbox/satellite-streets-v12')} className="hover:bg-teal-700 backdrop-blur-sm p-3 rounded-xl  z-10 flex items-center">
                    <MdOutlineSatelliteAlt className="w-[30px] h-[30px] text-white"/>
                    <p className="text-white ml-2">Satelite view</p>
                </button>
            </div>
        
            
         </div>
         
     
    );
}

// Export the Dashboard page
export default Dhome;