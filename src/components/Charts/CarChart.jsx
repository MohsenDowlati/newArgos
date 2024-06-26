


import dynamic from 'next/dynamic';
import { element } from 'prop-types';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import { BiCar } from 'react-icons/bi';
import ChartDetail from '../ChartDetails';
const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });
function CarChart({data,detialData,camera_id,start_date,end_date,icon,title,timelist})  {
const [series,setSeries] = useState([])
    
    let series2 = []

   
    useEffect(() => {
        
    function generateRandomColor() {
        const letters = "0123456789ABCDEF";
        let color = "#";
        
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        
        return color;
      }


    function transformArray(array) {
        try {
            return array.map(obj => {
              console.log(obj)
                return {
                  name: obj.name,
                  data: obj.data,
                  color: generateRandomColor()
                };
              });
        } catch (error) {
            
        }
       
      }
      const transformedArray = transformArray(data);
      setSeries(transformedArray)
      console.log('series == >' , series)
    }, [data]);


    
      const options = {
        chart: {
          type: 'area',
          width:'100%',
        },

        xaxis: {
          categories: timelist,
          labels: {
            style: {
              colors: '#ffffff', // Customize x-axis label color
            },
          },
        },
        yaxis: {
          title: {
            text: 'Value',
          },
          labels: {
            style: {
              colors: '#ffffff', // Customize x-axis label color
            },
          },
        },
        colors: ['#008FFB', '#00E396'],
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
          },
        },
        legend: {
            labels: {
                colors: ['#FFFFFF'] // Set the color of legend labels to white
              },
            
          position: 'bottom',
          
        },
      };

  return (
    <div className=' w-full flex justify-center'>
        <div className='bg-[#22242e] w-[90%] mt-10 p-10 rounded-xl'>
        <div className='flex items-center w-full mb-10'>
            {
              <BiCar className='w-[40px] h-[40px] text-red-500 '/>
            }
            <p className='text-lg min-w-fit font-thin tracking-wider text-white ml-2 uppercase border-b border-b-red-400'>CAR data charts </p>
            <p className='text-white text-center ml-10 font-thin'>This record was captured from {start_date?.toISOString().slice(0,10)} to {end_date?.toISOString().slice(0,10)}</p>
          
        </div>
        <ApexChart options={options} series={series} type="area" height={500} />
        <ChartDetail
         Title={'Car'}
         TextColor={'text-red-400'}
         Direction={detialData?.directions}
         Total={detialData?.TotalCar}
         camera_id={camera_id}
         PeakTime={detialData?.peakTime} 
         icon={<BiCar className='w-[40px] h-[40px] text-red-400 '/>}
        />
     
        </div>
      
    </div>
  );
};

export default  CarChart;