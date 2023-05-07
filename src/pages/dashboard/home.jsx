// Imports
import React from "react";
import NavigationBar from "@/components/NavigationSection/NavigationBar";
import { useRouter } from "next/router";
import 'mapbox-gl/dist/mapbox-gl.css';
import CircularProgress from "@/components/Progressbar/CircularProgress";
import { useState } from "react";
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import { useEffect } from "react";
import Table from "@/components/Table/Table";
import { HiLocationMarker, HiOutlineStatusOnline } from "react-icons/hi";
import { BiCamera } from "react-icons/bi";

// Login Page definitions
const Home = () => {
 const imgsrc = 'https://www.maxpixel.net/static/photo/1x/Young-Smile-Portrait-Ai-Generated-Man-Teeth-7833751.jpg'
 const date = new Date()
 const router = useRouter()
 const path = router.pathname 
 const [userdata,setUserdata] = useState() 
 
try {
     const token = localStorage.getItem('AccessToken')
     if(!token){
        router.push('/')
     }
} catch (error) {
    
}


    // Component return
   
    const Map = ReactMapboxGl({
        accessToken: 'pk.eyJ1IjoicGFydGl5YTAyMTAiLCJhIjoiY2xoYzVjODlnMDlhbzNtbnZyNzdvZDV0NSJ9.pENwwnr9suPHN1Liq2izQA',
      });
      
      const mapStyle = 'mapbox://styles/mapbox/dark-v11';
      
      const centerCoordinates = [-122.431297, 37.773972];
      

        useEffect(() => {
            setUserdata(JSON.parse(localStorage.getItem('User_data')))
        }, []);











    return (
        <div className="">
            <div className="flex w-full absolute z-10 justify-between items-center pt-5 bg-transparent backdrop-blur-md text-white shadow-md pb-4 ">
                <div className="ml-10">
                    <div className="flex  text-2xl items-center">
                        <img src="https://i.ibb.co/Xk0MPxS/Argos-Logo.png" className="object-contain w-[150px] h-[50px]"></img>
                        <p className="text-sm uppercase  ml-3 mt-3">{path.slice(1,10) + ' > ' + path.slice(11,15)}</p>
                    </div>
                    
                </div>
                <div className="mr-10 flex items-center">
                    <HiOutlineStatusOnline className="w-[25px] h-[25px] mr-2 animate-blink text-green-500"/>
                    <p>Welcome {userdata?.username} !</p>
                    <img src={imgsrc} className="w-[60px] h-[60px] border rounded-full ml-3 object-cover"></img>
                </div>

            </div>
            <div className=" p-10 absolute z-10 top-28 w-[0px]">
                    <NavigationBar/>
            </div>
            


            <div className="  flex items-center w-full justify-center">
                {/* MAP CONTAINER  */}
            
                <Map
                     style={mapStyle}
                     center={centerCoordinates}
                     zoom={[3]}
                     className={'w-full h-screen'}
                     
                >
                     <Marker coordinates={[-122.431297, 37.773972]}>
                        <div>
                            <HiLocationMarker className="w-[30px] h-[30px] text-green-600"/>
                        </div>
                    </Marker>
                    <Marker coordinates={[-122.421297, 37.773972]}>
                        <div>
                            <HiLocationMarker className="w-[30px] h-[30px] text-green-600"/>
                        </div>
                    </Marker>
                </Map>
           
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
        
            
         </div>
         
     
    );
}

// Export the Dashboard page
export default Home;