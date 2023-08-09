import React from 'react'

import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import { useState } from 'react'

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })
function RAMChart({ timelist, RamDataSet }) {
  const [series, setSeries] = useState([])
  const [time, setTime] = useState([])

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
        text: 'RAM',
      },
      labels: {
        style: {
          colors: '#ffffff', // Customize x-axis label color
        },
      },
    },
    colors: ['#ffffff', '#ffffff'],
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
    <ApexChart options={options} series={RamDataSet} type="area" height={500} />
  )
}

export default RAMChart
