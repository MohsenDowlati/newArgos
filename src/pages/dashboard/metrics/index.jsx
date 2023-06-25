// Imports

import React, { useState } from "react";
import { HiOutlineStatusOnline } from "react-icons/hi";
import NavigationBar from "@/components/NavigationSection/NavigationBar";
import { GiBleedingEye, GiDirectionSigns, GiPerson } from "react-icons/gi";
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
import { element } from "prop-types";
import CarChart from "@/components/Charts/CarChart";
import BikeChart from "@/components/Charts/BikeChart";
import Loading from "@/components/loading/loading";
// Login Page definitions
export default function Metrics() {
    const router = useRouter()
    const path = router.pathname
    const [startdate,setStartdate] = useState( new Date())
    const [enddate,setEnddate] = useState(new Date())
    const [Sdate,setSdate] = useState('')
    const [Edate,setEdate] = useState('')
    const [isloaded,setisloaded]= useState(false)
    const [camera_id,setCamera_id] = useState('0')
    const imgsrc = 'https://www.maxpixel.net/static/photo/1x/Young-Smile-Portrait-Ai-Generated-Man-Teeth-7833751.jpg'
    const [CameraData,setCameraData] = useState()
    const [BicycleDirection,setBicycleDirection] = useState([])
    const [CarDirection,setCarDirection] = useState([{}])
    const [BikeDirection,setBikeDirection] = useState()
    const [BikeDetail,setBikeDetial] = useState()
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
    const [search,setSearch] = useState()
    const [CarTimelist,setCarTimelist] = useState()
    const [BikeTimelist,setBikeTimelist] = useState()
    const [show,setShow] = useState(false)
  

    async function getCameradata (){
        setisloaded(false)
        setSearch(true)
        const {data,status} = await getCameraData({start_date : startdate,end_date:enddate,camera_id:camera_id})
    
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
        setSearch(false)
        
        console.log('ajab chaghali hasti to partiya === > ' , data)
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
                Bicycledirections = [...Bicycledirections,element.area_counts[1]]
               for (const key in element.area_counts[1]){
                BicycleNumber += element.area_counts[1][key]
            }
                BicycleData = [...BicycleData,  { 
                    bicycle : BicycleNumber,
                    name:element.date_time_Record.slice(11,13)
                }]
                BicycleNumber = 0
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
       let BikepeakTime = 0
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
                BikepeakTime = obj.name
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
      setBikeDetial({
        directions : BikeDirectionDetail,
        TotalBike : TotalBicycle,
        peakTime : BikepeakTime,
        camera_id : camera_id
      })


      
      DirectionsObjectCreator(data)
      setBicycleDirection(BikeDirectionDetail)

  
    }





    function DirectionsObjectCreator(data){
      let streets_car_data = []
      let streets_bike_data = []
     
      data.forEach(element => {
        if(element.area_counts[2] !== undefined){

          streets_car_data= [
            ...streets_car_data, {
                 ...element.area_counts[2],
                time: element.date_time_Record
            }
          ]

        }
      });
      data.forEach(element => {
        if(element.area_counts[1] !== undefined){

          streets_bike_data= [
            ...streets_bike_data, {
                 ...element.area_counts[1],
                time: element.date_time_Record
            }
          ]

        }
      });

      
      console.log('street_bike_data === >' , streets_bike_data)



      const extractStreets = (data) => {
        const streets = {};

        // Sort the data by time in ascending order
        const sortedData = data.sort((a, b) => {
          const timeA = new Date(a.time);
          const timeB = new Date(b.time);
          return timeA - timeB;
        });
      
        sortedData.forEach((obj) => {
          Object.keys(obj).forEach((key) => {
            if (key !== "time") {
              if (!streets[key]) {
                streets[key] = {
                  name: key,
                  data: [],
                  time: []
                };
              }
      
              streets[key].data.push(obj[key]);
              streets[key].time.push(obj.time);
            }
          });
        });
      
        return Object.values(streets);
      };


      const sortedCarData = streets_car_data.sort((a, b) => {
        const timeA = new Date(a.time);
        const timeB = new Date(b.time);
        return timeA - timeB;
      });
      const sortedBikeData = streets_car_data.sort((a, b) => {
        const timeA = new Date(a.time);
        const timeB = new Date(b.time);
        return timeA - timeB;
      });

      const CartimeList = sortedCarData.map(object => object.time);
      const BikeTimeList = sortedBikeData.map(object => object.time)
      setCarTimelist(CartimeList)
      setBikeTimelist(BikeTimeList)
     
     

    
    


    const transformedCarData = extractStreets(streets_car_data)
    const transformedBikeData = extractStreets(streets_bike_data)


 
      setCarDirection(transformedCarData)
      setBikeDirection(transformedBikeData)

      setisloaded(true)
    }


      
      
    


    function handleShowFilter(){
        setShow(!show)
    }

    function getRandomColor() {
      const letters = "0123456789ABCDEF";
      let color = "#";
      
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      
      return color;
    }




    // Component return
    useEffect(() => {
        const token = localStorage.getItem('AccessToken')
        if(!token){
           router.push('/')
        }
     
    }, []);
  
    useEffect(() => {
      console.log('CarDirection === > ' , CarDirection )
 
    }, [CarDirection]);



    
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    // Extract the data from the payload
    const { time, value , streetName  } = payload[0].payload;

    return (
      <div className="bg-red-500 p-5 rounded-xl text-white">
        <p>{`Street : ${streetName}`}</p>
        <p>{`Time: ${time}:00`}</p>
        <p>{`Amount: ${value}`}</p>
      </div>
    );
  }

  return null;
};






    return (
        <div className="bg-[#212326] w-full ">
            <Navbar/>
            <div className="flex h-fit">
            <div className="  pt-28  min-h-screen   ">
                    <NavigationBar WhichActive={'Metrics'}/>
            </div>
            <div className="bg-[#292c30]  w-full min-h-screen">
                <div className="w-full flex  ">
                    <button className="flex  justify-center " onClick={(handleShowFilter)}>
                     <BsFilterLeft className="mt-32 hover:bg-slate-600 rounded-xl  text-white ml-4 w-[40px] h-[40px]"/>
                    </button>
                    {show ? <FilterBar ApplyFunction={getCameradata} SETstartdate={setStartdate} setCamera_id={setCamera_id} SETenddate={setEnddate} startdate={startdate} enddate={enddate}/> : <></>}
                </div>
                <p className="mt-5 ml-10 text-white">- Results are based on selected filter  </p>
                <div className=" items-center  pb-10">

              {
                search ? <Loading/> :  <></>
              }

              {
                isloaded?    <CarChart timelist={CarTimelist} data={CarDirection} detialData={CarDetails} camera_id={camera_id} start_date={startdate} end_date={enddate}/> : ''
              }
              
              {
                isloaded?    <BikeChart timelist={BikeTimelist} data={BikeDirection} detialData={BikeDetail} camera_id={camera_id} start_date={startdate} end_date={enddate}/> : ''
              }

{/* 

                    <div className=" bg-[#252830] pr-10  w-fit ml-10 mt-10 rounded-lg">
                        <div className="flex items-center justify-between p-4">
                            <div className="w-full flex items-center">
                            <BsPerson className="w-[50px] h-[50px] flex items-center text-blue-400"/>
                            <p className="text-blue-400 ml-2 border-b border-blue-400">Person Data </p>
                            </div>
                            <div className="flex items-center">

                              <button className="flex hover:border-b hover:border-b-blue-400 pb-2  items-center text-white"> 
                                  <GiPerson className="w-[25px] h-[25px] "/>
                                  <p className="text-sm w-[100px]">Person / hour</p>
                              </button>
                              <button className="flex hover:border-b hover:border-b-blue-400 pb-2  items-center text-white"> 
                                  <GiDirectionSigns className="w-[25px] h-[25px] "/>
                                  <p className="text-sm w-[100px]">Person / Street</p>
                              </button>



                            </div>
                        </div>
                      <div className="flex">
                        <div className="">
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
                       
                               
                               
                            
                           
                        </div>
                    </div> */}












                 
                    
                </div>
            </div>

            </div>
       
     </div>
    );
}


