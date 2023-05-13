// Imports

import React, { useState } from "react";
import { HiOutlineStatusOnline } from "react-icons/hi";
import NavigationBar from "@/components/NavigationSection/NavigationBar";
import { GiBleedingEye } from "react-icons/gi";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Navbar from "@/components/Navbar/Navbar";
import { getCameraData } from "@/services/Analysis";
import { forEach, merge, toInteger } from "lodash";
import { BsBusFront, BsFilterLeft, BsPerson, BsTrainFront, BsTruck } from "react-icons/bs";
import { BiCar, BiCctv, BiCycling, BiDirections, BiFilter, BiTime } from "react-icons/bi";
import { RiMotorbikeLine } from "react-icons/ri";
import FilterBar from "@/components/FilterBar";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend, Tooltip, AreaChart, Area } from 'recharts';
import { MdExpandMore, MdMore } from "react-icons/md";
// Login Page definitions
export default function Metrics() {    
    const router = useRouter()
    const path = router.pathname
    const [startdate,setStartdate] = useState( new Date())
    const [enddate,setEnddate] = useState(new Date())
    const [camera_id,setCamera_id] = useState('0')
    const imgsrc = 'https://www.maxpixel.net/static/photo/1x/Young-Smile-Portrait-Ai-Generated-Man-Teeth-7833751.jpg'
    const [CameraData,setCameraData] = useState()
    const [BicycleDirection,setBicycleDirection] = useState([])
    const [Bicycle,setBicycle] = useState([])
    const [BicyclePeakTime,setBicyclePeakTime] = useState('00')
    const [TotalBicycle,setTotalBicycle] = useState('0')
    const [Person,setPerson] = useState([])
    const [Car,setCar] = useState([])


    const [show,setShow] = useState(false)
    let bicyclePeaktime = 0;
  

    async function getCameradata (){
        
        const {data,status} = await getCameraData({start_date : startdate,end_date:enddate,camera_id:camera_id})
        console.log(data)
        let BicycleData = [];  
        let BicycleNumber =0;
        let PersonData = []  
        let PersonNumber = 0;
        let CarData = [];
        let Bicycledirections = []
        let CarNumber = 0;   
        setCameraData(data)
        data.forEach(element => {
           if(Object.keys(element.area_counts).length > 0){
               if(element.area_counts[2] !== undefined){
                    Bicycledirections = [...Bicycledirections,element.area_counts[2]]
                for (const key in element.area_counts[2]){
                   
                    BicycleNumber += element.area_counts[2][key]
                    
                }
                BicycleData = [...BicycleData,
                    { 
                    bicycle : BicycleNumber,
                    name:element.date_time_Record.slice(11,13)
                }]
                BicycleNumber = 0
               }




                
               if(element.area_counts[1] !== undefined){
                
               for (const key in element.area_counts[1]){
                PersonNumber += element.area_counts[1][key]
            }
                PersonData = [...PersonData,  { 
                    person : PersonNumber,
                    name:element.date_time_Record.slice(11,13)
                }]
                PersonNumber = 0
               }



               if(element.area_counts[3] !== undefined){
              
                for (const key in element.area_counts[3]){
                    BicycleNumber += element.area_counts[3][key]
                }
                CarData = [...CarData,
                    { 
                    car : CarNumber,
                    name:element.date_time_Record.slice(11,13)
                }]
                CarNumber = 0
               }



           }
        });

       


        const groupedBicycleData = BicycleData.reduce((acc, item) => {
            if (!acc[item.name]) {
              acc[item.name] = {name: item.name, bicycle: 0};
            }
            acc[item.name].bicycle += item.bicycle;
            return acc;
          }, {});

          const Bicycleresult = Object.values(groupedBicycleData).sort((a, b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return a.bicycle - b.bicycle;
          });



          const groupedPersonData = PersonData.reduce((acc, item) => {
            if (!acc[item.name]) {
              acc[item.name] = {name: item.name, person: 0};
            }
            acc[item.name].person += item.person;
            return acc;
          }, {});

          const Personresult = Object.values(groupedPersonData).sort((a, b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return a.person - b.person;
          });

          const groupedCarData = CarData.reduce((acc, item) => {
            if (!acc[item.name]) {
              acc[item.name] = {name: item.name, car: 0};
            }
            acc[item.name].car += item.car;
            return acc;
          }, {});

          const Carresult = Object.values(groupedCarData).sort((a, b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return a.car - b.car;
          });
          
       setCar(Carresult)
       setBicycle(Bicycleresult)
       setPerson(Personresult)

       let TotalBicycle = 0;
       let max_value = Bicycleresult[0]?.bicycle;
       let peakTime = 0
       Bicycleresult.forEach(obj => {
       
            TotalBicycle += obj.bicycle
            if(obj.bicycle > max_value){
                max_value = obj.bicycle
                peakTime = obj.name
            }
      });

      const groupedData = {};

      Bicycledirections.forEach(obj => {
        for (let key in obj) {
          if (groupedData.hasOwnProperty(key)) {
            groupedData[key] += obj[key];
          } else {
            groupedData[key] = obj[key];
          }
        }
      });
      const result = Object.keys(groupedData).map(key => ({ [key]: groupedData[key] }));
      
      

      setBicycleDirection(result)
      setTotalBicycle(TotalBicycle)
      setBicyclePeakTime(peakTime)
      
       console.log('Bicycle Data === > ' , Bicycle)
       console.log('Person Data === > ' , Personresult)
       console.log('Car Data === > ' , Carresult)
       console.log(BicycleDirection)

       
    }


   














    function handleShowFilter(){
        setShow(!show)
    }




    // Component return
    useEffect(() => {
        const token = localStorage.getItem('AccessToken')
        if(!token){
           router.push('/')
        }
     
    }, []);
  
    useEffect(() => {
       console.log('start date === > ',startdate)
       console.log('end date === > ', enddate)
    }, [startdate,enddate]);
    return (
        <div className="bg-[#212326] w-full h-fit">
            <Navbar/>
            <div className="flex h-fit">
            <div className=" pt-32 ml-10  h-full  ">
                    <NavigationBar/>
            </div>
            <div className="bg-[#292c30]  w-full ">
                <div className="w-full flex  ">
                    <button className="flex  justify-center " onClick={(handleShowFilter)}>
                     <BsFilterLeft className="mt-32 hover:bg-slate-600 rounded-xl  text-white ml-4 w-[40px] h-[40px]"/>
                    </button>
                    {show ? <FilterBar ApplyFunction={getCameradata} SETstartdate={setStartdate} setCamera_id={setCamera_id} SETenddate={setEnddate} startdate={startdate} enddate={enddate}/> : <></>}
                </div>
                <p className="mt-5 ml-10 text-white">- Results are based on selected filter  </p>
                <div className="flex items-center flex-wrap pb-10">
                    <div className=" bg-[#1e2127] pr-10 w-fit ml-10 mt-10 rounded-lg">
                        <div className="flex items-center p-4">
                            <BiCycling className="w-[50px] h-[50px] flex items-center text-indigo-400"/>
                            <p className="text-indigo-400 ml-2 border-b border-indigo-400">Bicycle data<span className="text-[12px]"> (Average Bicycle/hour)</span>  </p>
                        </div>
                        <AreaChart  width={800}   className='mt-5 z-0' height={300} data={Bicycle}>
                            <Area type="monotone" strokeWidth={2} fill={'#7984e8'} dataKey="bicycle" stroke="#818df8" />
                            <CartesianGrid stroke="#fffff" />
                            <XAxis  dataKey="name" />
                            <YAxis />
                            <Tooltip  />
                        <Legend />
                        </AreaChart>
                        <div className="w-full flex justify-start items-center mb-10">
                            <div className="flex ml-10 items-center">
                                <BiCycling className="text-indigo-400 w-[40px] h-[40px]"/>
                                <div className="ml-2">
                                    <p className="text-xl font-boldVazir text-indigo-400">{TotalBicycle}</p>
                                    <p className="text-sm text-gray-500">Total bicycles</p>
                                </div>
                            </div>
                              <div className="flex ml-10 items-center">
                                <BiTime className="text-indigo-400 w-[40px] h-[40px]"/>
                                <div className="ml-2">
                                    <p className="text-xl font-boldVazir text-indigo-400">{BicyclePeakTime + ':00'}</p>
                                    <p className="text-sm text-gray-500">Peak Time</p>
                                </div>
                            </div>
                            <div className="flex ml-10 items-center">
                                <BiCctv className="text-indigo-400 w-[40px] h-[40px]"/>
                                <div className="ml-2">
                                    <p className="text-xl font-boldVazir text-indigo-400">{camera_id}</p>
                                    <p className="text-sm text-gray-500">Camera</p>
                                </div>
                            </div>
                            <div className="flex items-center ml-10 ">
                                <BiDirections className="w-[40px] h-[40px] text-indigo-400"/>
                                <div className="overflow-y-scroll h-[80px] px-5">
                                  
                                         {BicycleDirection.map((item, index) => (
                                             <p className="text-white text-sm" key={index}>
                                             {Object.keys(item)[0]}: {item[Object.keys(item)[0]]}
                                             </p>
                                            ))}
                            
                                </div>
                            </div>
                        </div>
                    </div>





                    <div className=" bg-[#1e2127] pr-10  w-fit ml-10 mt-10 rounded-lg">
                        <div className="flex items-center p-4">
                            <BsPerson className="w-[50px] h-[50px] flex items-center text-blue-400"/>
                            <p className="text-blue-400 ml-2 border-b border-blue-400">Person Data <span className="text-[12px]">(Average Person/hour)</span> </p>
                        </div>
                        <AreaChart  width={700}   className='mt-5 z-0' height={300} data={Person}>
                            <Area type="monotone" strokeWidth={2} fill={'#60a5fa'}  dataKey="person" stroke="#60a5fa" />
                            <CartesianGrid stroke="#fffff" />
                            <XAxis  dataKey="name" />
                            <YAxis />
                            <Tooltip  />
                        <Legend />
                        </AreaChart>
                    </div>
                    <div className=" bg-[#1e2127] pr-10  w-fit ml-10 mt-10 rounded-lg">
                        <div className="flex items-center p-4">
                            <BsPerson className="w-[50px] h-[50px] flex items-center text-red-400"/>
                            <p className="text-red-400 ml-2 border-b red-400 border-red-400">Car Data <span className="text-[12px]">(Average Car/hour)</span> </p>
                        </div>
                        <AreaChart  width={700}   className='mt-5 z-0' height={300} data={Car}>
                            <Area type="monotone" strokeWidth={2} fill={'#f87171'}  dataKey="car" stroke="#f87171" />
                            <CartesianGrid stroke="#fffff" />
                            <XAxis  dataKey="name" />
                            <YAxis />
                            <Tooltip  />
                        <Legend />
                        </AreaChart>
                    </div>
                    
                </div>
            </div>

            </div>
       
     </div>
    );
}


