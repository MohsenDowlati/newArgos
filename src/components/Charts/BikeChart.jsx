import dynamic from 'next/dynamic'
import { element } from 'prop-types'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

import { BiCar, BiCycling } from 'react-icons/bi'
import ChartDetail from '../ChartDetails'
const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })
function BikeChart({
  data,
  detialData,
  camera_id,
  start_date,
  end_date,
  icon,
  title,
  timelist,
}) {
  const [series, setSeries] = useState([])

  let series2 = []

  useEffect(() => {
    function generateRandomColor() {
      const letters = '0123456789ABCDEF'
      let color = '#'

      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
      }

      return color
    }

    function transformArray(array) {
      try {
        return array.map((obj) => {
          return {
            name: obj.name,
            data: obj.data,
            color: generateRandomColor(),
          }
        })
      } catch (error) {}
    }
    const transformedArray = transformArray(data)
    setSeries(transformedArray)
  }, [data])

  const options = {
    chart: {
      type: 'area',
      width: '100%',
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
        colors: ['#FFFFFF'], // Set the color of legend labels to white
      },

      position: 'bottom',
    },
  }

  return (
    <div className=" flex w-full justify-center">
      <div className="mt-10 w-[90%] rounded-xl bg-[#22242e] p-10">
        <div className="mb-10 flex w-full items-center">
          {<BiCycling className="h-[40px] w-[40px] text-indigo-500 " />}
          <p className="ml-2 min-w-fit border-b border-b-indigo-400 text-lg font-thin uppercase tracking-wider text-white">
            Bike data charts{' '}
          </p>
          <p className="ml-10 text-center font-thin text-white">
            This record was captured from{' '}
            {start_date?.toISOString().slice(0, 10)} to{' '}
            {end_date?.toISOString().slice(0, 10)}
          </p>
        </div>
        <ApexChart options={options} series={series} type="area" height={500} />
        <ChartDetail
          Title={'Car'}
          TextColor={'text-indigo-400'}
          Direction={detialData?.directions}
          Total={detialData?.TotalBike}
          camera_id={camera_id}
          PeakTime={detialData?.peakTime}
          icon={<BiCycling className="h-[40px] w-[40px] text-indigo-400 " />}
        />
      </div>
    </div>
  )
}

export default BikeChart
