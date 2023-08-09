// Imports
import ListBox from '@/components/DropdownBtn/ListDropDown'
import Navbar from '@/components/Navbar/Navbar'
import NavigationBar from '@/components/NavigationSection/NavigationBar'
import Sidebar from '@/components/sidebar'
import { useRouter } from 'next/router'
import React from 'react'
import { useEffect } from 'react'

import { GiBleedingEye } from 'react-icons/gi'
import { HiOutlineStatusOnline } from 'react-icons/hi'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useState } from 'react'
import { getLogsData } from '@/services/Logs'
import { element } from 'prop-types'
import dynamic from 'next/dynamic'
import GPUChart from '@/components/Charts/GPU_Chart'
import CPUChart from '@/components/Charts/CPU_Chart'
import RAMChart from '@/components/Charts/RAM_Chart'
import BoardTempChart from '@/components/Charts/BoardTemp_Chart'
const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })
// Login Page definitions
const Logs = () => {
  const router = useRouter()
  const [startdate, setStartdate] = useState(new Date())
  const [enddate, setEnddate] = useState(new Date())
  const [camera_id, setCamera_id] = useState('0')
  const [isloaded, setisloaded] = useState(false)
  const [ram, setRam] = useState()
  const [time, setTime] = useState()
  const [gpu, setGpu] = useState()
  const [cpu, setCpu] = useState()

  const [boardtemp, setBoardTemp] = useState()
  const path = router.pathname
  const imgsrc =
    'https://www.maxpixel.net/static/photo/1x/Young-Smile-Portrait-Ai-Generated-Man-Teeth-7833751.jpg'
  // Component return
  useEffect(() => {
    const token = localStorage.getItem('AccessToken')
    if (!token) {
      router.push('/')
    }
  }, [])

  function CreateTimeArray(data) {
    let time = []
    data?.forEach((element) => {
      time = [...time, element.time]
    })
    setTime(time)
  }
  function CreateGpuArray(data) {
    let gpu = []

    data?.forEach((element) => {
      gpu = [...gpu, `${element.gpu}%`]
    })

    setGpu([{ data: gpu, name: 'GPU USAGE', time: time, color: '#63cf55' }])
  }
  function CreateRamArray(data) {
    let ram = []
    data.forEach((element) => {
      ram = [...ram, `${(element.ram * 100).toFixed(2)}`]
    })

    setRam([{ data: ram, name: 'RAM USAGE', time: time, color: '#c92c41' }])
  }
  function CreateCpuArray(data) {
    let cpu = []
    data?.forEach((element) => {
      cpu = [...cpu, element.cpu]
    })

    setCpu([{ data: cpu, name: 'CPU USAGE', time: time, color: '#49b2c4' }])
  }
  function CreateBoradTempArray(data) {
    let BoradTemp = []
    data?.forEach((element) => {
      BoradTemp = [...BoradTemp, element.board_temp]
    })
    setBoardTemp([
      {
        data: BoradTemp,
        name: 'BOARD TEMPATURE',
        time: time,
        color: '#cf912d',
      },
    ])
  }

  async function getCameraLogs() {
    const payload = {
      start_date: startdate.toISOString().slice(0, 19),
      end_date: enddate.toISOString().slice(0, 19),
      camera_id: camera_id,
    }
    console.log(payload)

    const { data, status } = await getLogsData(payload)

    CreateTimeArray(data)
    CreateRamArray(data)
    CreateGpuArray(data)
    CreateCpuArray(data)
    CreateBoradTempArray(data)
    setisloaded(true)

    console.log('logs -==== > ', ram)
    console.log('time =>', time)
  }

  return (
    <div className="w-full bg-[#212326] ">
      <Navbar />
      <div className="flex h-fit">
        <div className="  min-h-screen  pt-28   ">
          <NavigationBar WhichActive={'Logs'} />
        </div>
        <div className="min-h-screen  w-full bg-[#292c30] pt-32">
          <div className="flex w-full items-center justify-center">
            <div className="mt-5 flex items-center ">
              <div className="  relative rounded-xl border border-white p-3">
                <p className="absolute -top-3 z-10 bg-[#292c30] px-2 text-sm text-white">
                  Start date{' '}
                </p>
                <DatePicker
                  selected={startdate}
                  dateFormat={'yyyy-MM-dd'}
                  onChange={(Date) => setStartdate(Date)}
                  className=" z-10 bg-transparent text-white focus:outline-none"
                />
              </div>
              <div className=" relative ml-2 rounded-xl border border-white p-3">
                <p className="absolute -top-3 z-10 bg-[#292c30] px-2 text-sm text-white">
                  End date{' '}
                </p>
                <DatePicker
                  selected={enddate}
                  dateFormat={'yyyy-MM-dd'}
                  onChange={(Date) => setEnddate(Date)}
                  className=" z-10 bg-transparent text-white focus:outline-none"
                />
              </div>
              <div>
                <ListBox setCamera_id={setCamera_id} />
              </div>
              <button
                onClick={getCameraLogs}
                className="ml-10 w-[200px] rounded-xl bg-blue-400 p-4 text-white"
              >
                Search Logs
              </button>
            </div>
          </div>
          <div className="mt-10 flex w-full justify-center ">
            <div className="w-[80%]">
              {isloaded ? <GPUChart GpuDataSet={gpu} timelist={time} /> : ''}
            </div>
          </div>
          <div className="flex w-full justify-center ">
            <div className="w-[80%]">
              {isloaded ? <CPUChart CpuDataSet={cpu} timelist={time} /> : ''}
            </div>
          </div>
          <div className="flex w-full justify-center ">
            <div className="w-[80%]">
              {isloaded ? <RAMChart RamDataSet={ram} timelist={time} /> : ''}
            </div>
          </div>
          <div className="flex w-full justify-center ">
            <div className="w-[80%]">
              {isloaded ? (
                <BoardTempChart BoardTempDataSet={boardtemp} timelist={time} />
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Export the Dashboard page
export default Logs
