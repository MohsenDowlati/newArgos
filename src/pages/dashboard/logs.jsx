// Imports
import ListBox from '@/components/DropdownBtn/ListDropDown'
import Navbar from '@/components/Navbar/Navbar'
import NavigationBar from '@/components/NavigationSection/NavigationBar'
import Sidebar from '@/components/sidebar'
import { useRouter } from 'next/router'
import React from 'react'
import { useEffect } from 'react'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useState } from 'react'
import { getLogsData } from '@/services/Logs'

import LogsChartContainer from '@/components/Charts/LogsChartContainer'
import { element } from 'prop-types'
import Loading from '@/components/loading/loading'

// Login Page definitions
const Logs = () => {
  const router = useRouter()
  const [startdate, setStartdate] = useState(new Date())
  const [enddate, setEnddate] = useState(new Date())
  const [camera_id, setCamera_id] = useState('0')
  const [isloaded, setisloaded] = useState()
  const [ram, setRam] = useState()
  const [time, setTime] = useState()
  const [gpu, setGpu] = useState()
  const [cpu, setCpu] = useState()
  const [fps, setFps] = useState()
  const [fan, setFan] = useState()
  const [solarpanelVoltage, setSolarPanelVoltage] = useState()
  const [solarpanelCurrent, setSolarPanelCurrent] = useState()
  const [systemloadVoltage, setSystemLoadVoltage] = useState()
  const [systemloadCurrent, setSystemLoadCurrent] = useState()
  const [chargercurrent, setChargerCurrent] = useState()
  const [outdoorTemp, setOutDoorTemp] = useState()
  const [batteryVoltage, setBatteryVoltage] = useState()
  const [ActiveChart, setActiveChart] = useState()

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

    setRam([{ data: ram, name: 'RAM USAGE', time: time, color: '#f87171' }])
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
        color: '#e11d47',
      },
    ])
  }

  function CreateOutDoorTempArray(data) {
    let OutDoorTemp = []
    data?.forEach((element) => {
      OutDoorTemp = [...OutDoorTemp, element.temp]
    })
    setOutDoorTemp([
      {
        data: OutDoorTemp,
        name: 'OUTDOOR TEMPATURE',
        time: time,
        color: '#e11d47',
      },
    ])
  }
  function CreateFanArray(data) {
    let Fan = []
    data?.forEach((element) => {
      Fan = [...Fan, Math.floor(element.fan).toString().slice(0, 2)]
    })
    setFan([
      {
        data: Fan,
        name: 'Fan Speed',
        time: time,
        color: '#2dd4be',
      },
    ])
  }
  function CreateBatteryVoltageArray(data) {
    let BatteryVoltage = []
    data?.forEach((element) => {
      BatteryVoltage = [...BatteryVoltage, element.batt_V.toFixed(2)]
    })
    setBatteryVoltage([
      {
        data: BatteryVoltage,
        name: 'Battery Voltage',
        time: time,
        color: '#facc15',
      },
    ])
  }
  function CreateFpsArray(data) {
    let Fps = []
    data?.forEach((element) => {
      Fps = [...Fps, element.fps]
    })
    setFps([
      {
        data: Fps,
        name: 'Frame per seconds',
        time: time,
        color: '#f472b5',
      },
    ])
  }
  function CreateSolarVoltageArray(data) {
    let SolarVoltage = []
    data?.forEach((element) => {
      SolarVoltage = [...SolarVoltage, element.panel_V.toFixed(2)]
    })
    setSolarPanelVoltage([
      {
        data: SolarVoltage,
        name: 'Solar panel voltage',
        time: time,
        color: '#f2a53f',
      },
    ])
  }
  function CreateSolarCurrentArray(data) {
    let SolarCurrent = []
    data?.forEach((element) => {
      SolarCurrent = [...SolarCurrent, element.panel_I.toFixed(2)]
    })
    setSolarPanelCurrent([
      {
        data: SolarCurrent,
        name: 'Solar panel current',
        time: time,
        color: '#f2a53f',
      },
    ])
  }
  function CreateSystemLoadVoltageArray(data) {
    let SystemVoltage = []
    data?.forEach((element) => {
      SystemVoltage = [...SystemVoltage, element.load_V.toFixed(2)]
    })
    setSystemLoadVoltage([
      {
        data: SystemVoltage,
        name: 'System Load Voltage',
        time: time,
        color: '#bef264',
      },
    ])
  }
  function CreateSystemLoadCurrentArray(data) {
    let SystemCurrent = []
    data?.forEach((element) => {
      SystemCurrent = [...SystemCurrent, element.load_I.toFixed(2)]
    })
    setSystemLoadCurrent([
      {
        data: SystemCurrent,
        name: 'System Load Current',
        time: time,
        color: '#bef264',
      },
    ])
  }
  function CreateChargerCurrentArray(data) {
    let ChargerCurrent = []
    data?.forEach((element) => {
      ChargerCurrent = [...ChargerCurrent, element.charge_I.toFixed(2)]
    })
    setChargerCurrent([
      {
        data: ChargerCurrent,
        name: 'Charger current',
        time: time,
        color: '#818df8',
      },
    ])
  }

  async function getCameraLogs() {
    setisloaded(false)
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
    CreateFanArray(data)
    CreateFpsArray(data)
    CreateSolarVoltageArray(data)
    CreateBatteryVoltageArray(data)
    CreateSolarCurrentArray(data)
    CreateOutDoorTempArray(data)
    CreateChargerCurrentArray(data)
    CreateSystemLoadVoltageArray(data)
    CreateSystemLoadCurrentArray(data)

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
            <div className="mb-20 w-[80%]">
              {isloaded ? (
                <LogsChartContainer
                  Payload={{ startdate, enddate, camera_id }}
                  timelist={time}
                  isloaded={isloaded}
                  GpuDataSet={gpu}
                  CpuDataSet={cpu}
                  RamDataSet={ram}
                  FanDataSet={fan}
                  FpsDataSet={fps}
                  TempBoardDataSet={boardtemp}
                  TempOutdoorDataSet={outdoorTemp}
                  BatteryVoltageDataSet={batteryVoltage}
                  SolarPanelVoltageDataSet={solarpanelVoltage}
                  SolarPanelCurrentDataSet={solarpanelCurrent}
                  SystemLoadVoltageDataSet={systemloadVoltage}
                  SystemLoadCurrentDataSet={systemloadCurrent}
                  ChargerCurrentDataSet={chargercurrent}
                />
              ) : (
                ''
              )}
              {isloaded === false ? <Loading /> : ''}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Export the Dashboard page
export default Logs
