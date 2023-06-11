


import { element } from 'prop-types';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import ApexCharts from 'react-apexcharts';
import { BiCar } from 'react-icons/bi';
import ChartDetail from '../ChartDetails';

function CarChart({data,detialData,camera_id})  {
const [series,setSeries] = useState()
    
    let series2 = []

    function generateRandomColor() {
        const letters = "0123456789ABCDEF";
        let color = "#";
        
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        
        return color;
      }


    function transformArray(array) {
        return array.map(obj => {
          const { details } = obj;
          const values = details.map(detail => detail.value);
      
          return {
            name: details[0].street_name,
            data: values,
            color: generateRandomColor()
          };
        });
      }
   
    useEffect(() => {
        
    }, [data]);
    console.log(data)
    const transformedArray = transformArray(data);
    console.log(transformedArray)

    
      const options = {
        chart: {
          type: 'area',
          width:'100%',
        },

        xaxis: {
          
          categories: [
            '00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00',
            '17:00','18:00','19:00','20:00','21:00','22:00','23:00',

        ] ,
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
            
          position: 'top',
          
        },
      };
      console.log(detialData)
  return (
    <div className=' w-full flex justify-center'>
        <div className='bg-[#22242e] w-[70%] mt-10 p-10 rounded-xl'>
        <div className='flex items-center w-full mb-10'>
            <BiCar className='w-[30px] h-[30px] text-red-500'/>
            <p className='text-lg font-thin tracking-wider text-white ml-2 uppercase border-b border-b-red-400'>Car data charts </p>
        </div>
        <ApexCharts    options={options} series={transformedArray} type="area" height={500} />  
        <ChartDetail
         Title={'Car'}
         TextColor={'text-red-400'}
         Direction={detialData.directions}
         Total={detialData.TotalCar}
         camera_id={camera_id}
         PeakTime={detialData.peakTime} 
         icon={<BiCar className="text-red-400 w-[40px] h-[40px]"/>}
        />
     
        </div>
      
    </div>
  );
};

export default CarChart;