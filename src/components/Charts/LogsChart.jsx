import React from 'react'

import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import { useState } from 'react'

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })
function LogsChart({ timelist, DataSet }) {
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
        text: 'GPU',
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
    <ApexChart options={options} series={DataSet} type="area" height={500} />
  )
}

export default LogsChart
