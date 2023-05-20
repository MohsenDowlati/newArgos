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
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend, Tooltip, AreaChart, Area, PieChart, Pie, ResponsiveContainer } from 'recharts';
import { MdExpandMore, MdMore } from "react-icons/md";
import ChartDetail from "@/components/ChartDetails";
// Login Page definitions
export default function Metrics() {    
    const router = useRouter()
    const path = router.pathname
    const [startdate,setStartdate] = useState( new Date())
    const [enddate,setEnddate] = useState(new Date())
    const [Sdate,setSdate] = useState('')
    const [Edate,setEdate] = useState('')
    const [camera_id,setCamera_id] = useState('0')
    const imgsrc = 'https://www.maxpixel.net/static/photo/1x/Young-Smile-Portrait-Ai-Generated-Man-Teeth-7833751.jpg'
    const [CameraData,setCameraData] = useState()
    const [BicycleDirection,setBicycleDirection] = useState([])
    const [PersonDetails,setPersonDetails] = useState({
        directions : [],
        totalPerson : 0,
        peakTime : 0,
        camera_id : '10',
      })
    const [CarDetails,setCarDetails] = useState({
        directions : [],
        TotalCar : 0 ,
        peakTime  : 0,
        camera_id : ""
    })

    const [Bicycle,setBicycle] = useState([])
    const [BicyclePeakTime,setBicyclePeakTime] = useState('00')
    const [TotalBicycle,setTotalBicycle] = useState('0')
    const [Person,setPerson] = useState([])
    const [Car,setCar] = useState([])


    const [show,setShow] = useState(false)
  

    async function getCameradata (){
        
        const {data,status} = await getCameraData({start_date : startdate,end_date:enddate,camera_id:camera_id})
        console.log(data)
        let BicycleData = [];  
        let BicycleNumber =0;
        let PersonData = []  
        let PersonNumber = 0;
        let Persondirections = []
        let CarData = [];
        let Bicycledirections = []
        let Cardirections = []
        let CarNumber = 0;   
        setCameraData(data)
        setSdate(startdate.toISOString())
        setEdate(enddate.toISOString())

        data.forEach(element => {
           if(Object.keys(element.area_counts).length > 0){

                // 1 person
                // 2 car 
                // 3 motorcycle


               if(element.area_counts[2] !== undefined){
                    Cardirections = [...Cardirections,element.area_counts[2]]
                for (const key in element.area_counts[2]){
                   
                    CarNumber += element.area_counts[2][key]
                    
                }

            CarData = [ ...CarData,
                    { 
                    car : CarNumber,
                    name:element.date_time_Record.slice(11,13)
                }]
                CarNumber = 0
               }




                
               if(element.area_counts[1] !== undefined){
                Persondirections = [...Persondirections,element.area_counts[1]]
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
                BicycleData = [...BicycleData,
                    { 
                    bicycle : BicycleNumber,
                    name:element.date_time_Record.slice(11,13)
                }]
                BicycleNumber = 0
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
       let maxBicycle = Bicycleresult[0]?.bicycle;
       let peakTime = 0
       let TotalPerson = 0 
       let MaxPerson = Personresult[0]?.person
       let PersonPeakTime = 0
       let TotalCar = 0
       let MaxCar = Carresult[0]?.car
       let CarPeakTime = 0



       Personresult.forEach(obj => {
        
         TotalPerson += obj.person
         if(obj.person > MaxPerson){
             MaxPerson = obj.person
             PersonPeakTime = obj.name
         }
        });
        Carresult.forEach(obj => {
                
            TotalCar += obj.car
            if(obj.car > MaxCar){
                MaxCar = obj.car
                CarPeakTime = obj.name
            }
        });
       Bicycleresult.forEach(obj => {
       
            TotalBicycle += obj.bicycle
            if(obj.bicycle > maxBicycle){
                maxBicycle = obj.bicycle
                peakTime = obj.name
            }
      });
      
      
        const groupedDataPerson = {};
        Persondirections.forEach(obj => {
          for (let key in obj) {
            if (groupedDataPerson.hasOwnProperty(key)) {
              groupedDataPerson[key] += obj[key];
            } else {
              groupedDataPerson[key] = obj[key];
            }
          }
        });
        const PersonDirectionDetails = Object.keys(groupedDataPerson).map(key => ({ [key]: groupedDataPerson[key] }));




        
        const groupedDataCar = {};
        Cardirections.forEach(obj => {
          for (let key in obj) {
            if (groupedDataCar.hasOwnProperty(key)) {
              groupedDataCar[key] += obj[key];
            } else {
              groupedDataCar[key] = obj[key];
            }
          }
        });
        const CarDirectionDetails = Object.keys(groupedDataCar).map(key => ({ [key]: groupedDataCar[key] }));






      const groupedBikeData = {};
      Bicycledirections.forEach(obj => {
        for (let key in obj) {
          if (groupedBikeData.hasOwnProperty(key)) {
            groupedBikeData[key] += obj[key];
          } else {
            groupedBikeData[key] = obj[key];
          }
        }
      });
      const BikeDirectionDetail = Object.keys(groupedBikeData).map(key => ({ [key]: groupedBikeData[key] }));

      
      
      
      
      setPersonDetails({
        directions : PersonDirectionDetails,
        totalPerson : TotalPerson,
        peakTime : PersonPeakTime,
        camera_id : camera_id,
      })
      setCarDetails({
        directions : CarDirectionDetails,
        TotalCar : TotalCar,
        peakTime : CarPeakTime,
        camera_id : camera_id
      })




      setBicycleDirection(BikeDirectionDetail)
      setTotalBicycle(TotalBicycle)
      setBicyclePeakTime(peakTime)
      
       console.log('Bicycle Data === > ' , Bicycle)
       console.log('Person Data === > ' , Personresult)
       console.log('Car Data === > ' , Carresult)
       console.log('PersonDetails ==== > ' , PersonDetails)
       console.log(BicycleDirection)
       console.log(Person)
       
    }


    function handleDirectionsChartData(directions){

      const jsonArray = directions.map((item, index) => {
        const key = Object.keys(item)[0];
        const street = key;
        const value = item[key];
        
        return {
          name: street,
          value: value
        };
      });
      console.log('myJsonArray == > ' , jsonArray)
      return jsonArray


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





                    <div className=" bg-[#252830] pr-10  w-fit ml-10 mt-10 rounded-lg">
                        <div className="flex items-center p-4">
                            <BsPerson className="w-[50px] h-[50px] flex items-center text-blue-400"/>
                            <p className="text-blue-400 ml-2 border-b border-blue-400">Person Data <span className="text-[12px]">(Average Person/hour)</span> </p>
                        </div>
                      <div className="flex">
                        <div>
                        <AreaChart  width={700}   className='mt-5 z-0' height={300} data={Person}>
                            <Area type="monotone" strokeWidth={2} fill={'#60a5fa'}  dataKey="person" stroke="#60a5fa" />
                            <CartesianGrid stroke="#fffff" />
                            <XAxis  dataKey="name" />
                            <YAxis />
                            <Tooltip  />
                        <Legend />
                        </AreaChart>
                        <ChartDetail 
                        Title={'Person'}
                        TextColor={'text-blue-400'}
                        Direction={PersonDetails.directions}
                        Total={PersonDetails.totalPerson}
                        camera_id={camera_id}
                        PeakTime={PersonDetails.peakTime} 
                        icon={<BsPerson className="text-blue-400 w-[40px] h-[40px]"/>}
                           
                           /> 
                        </div>
                        <div className="w-[1px] h-[350px] m-10 bg-blue-300"></div>
                        <div className=" ">
                        <p className="text-white font-thin border-b border-blue-400 pb-2">Chart based on Persons/Street</p>
                        <p className="text-gray-500">{Sdate.slice(0,10)} -  {Edate.slice(0,10)}</p>
                        <PieChart width={300} height={300}>
                                    <Pie
                                      dataKey="value"
                                     
                                      isAnimationActive={true}
                                      data={handleDirectionsChartData(PersonDetails.directions)}
                                      cx="50%"
                                      cy="50%"
                                      outerRadius={80}
                                      
                                      fill="#60a5fa"

                                      label
                                    />
                                    
                                    <Tooltip />
                                  </PieChart>
                                  
                        </div>
                               
                               
                            
                           
                        </div>
                    </div>




                    <div className=" bg-[#252830] pr-10  w-fit ml-10 mt-10 rounded-lg">
                        <div className="flex items-center p-4">
                            <BiCar className="w-[50px] h-[50px] flex items-center text-red-400"/>
                            <p className="text-red-400 ml-2 border-b red-400 border-red-400">Car Data <span className="text-[12px]">(Average Car/hour)</span> </p>
                        </div>
                        <div className="flex">
                            <div>
                            <AreaChart  width={700}   className='mt-5 z-0' height={300} data={Car}>
                            <Area type="monotone" strokeWidth={2} fill={'#f87171'}  dataKey="car" stroke="#f87171" />
                            <CartesianGrid stroke="#fffff" />
                            <XAxis  dataKey="name" />
                            <YAxis />
                            <Tooltip  />
                        <Legend />
                        </AreaChart>
                        <ChartDetail 
                        Title={'Car'}
                        TextColor={'text-red-400'}
                        Direction={CarDetails.directions}
                        Total={CarDetails.TotalCar}
                        camera_id={camera_id}
                        PeakTime={CarDetails.peakTime} 
                        icon={<BiCar className="text-red-400 w-[40px] h-[40px]"/>}

                           
                           />
                            </div>
                            <div className="w-[1px] h-[350px] m-10 bg-red-300"></div>
                            <div className=" ">
                              <p className="text-white font-thin border-b border-red-400 pb-2">Chart based on Car/Street</p>
                              <p className="text-gray-500">{Sdate.slice(0,10)} -  {Edate.slice(0,10)}</p>
                              <PieChart width={300} height={300}>
                                    <Pie
                                      dataKey="value"
                                     
                                      isAnimationActive={true}
                                      data={handleDirectionsChartData(CarDetails.directions)}
                                      cx="50%"
                                      cy="50%"
                                      outerRadius={80}
                                      
                                      fill="
                                      #f87171
                                      "

                                      label
                                    />
                                    
                                    <Tooltip />
                                  </PieChart>
                                  
                             </div>
                               




                        </div>

                        
                    
                    </div>








                    <div className=" bg-[#252830] pr-10 w-fit ml-10 mt-10 rounded-lg">
                        <div className="flex items-center p-4">
                            <BiCycling className="w-[50px] h-[50px] flex items-center text-indigo-400"/>
                            <p className="text-indigo-400 ml-2 border-b border-indigo-400">Bicycle data<span className="text-[12px]"> (Average Bicycle/hour)</span>  </p>
                        </div>
                        <AreaChart  width={700}   className='mt-5 z-0' height={300} data={Bicycle}>
                            <Area type="monotone" strokeWidth={2} fill={'#7984e8'} dataKey="bicycle" stroke="#818df8" />
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


