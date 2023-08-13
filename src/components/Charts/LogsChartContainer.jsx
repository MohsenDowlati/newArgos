import React from 'react'
import {
  BsCalendar2Date,
  BsCpu,
  BsFan,
  BsGpuCard,
  BsMotherboard,
} from 'react-icons/bs'
import { CgSmartphoneRam } from 'react-icons/cg'
import { CiTempHigh } from 'react-icons/ci'
import { MdOutlineElectricBolt } from 'react-icons/md'
import { TbKeyframes } from 'react-icons/tb'
import { FaSolarPanel } from 'react-icons/fa'
import { PiChargingStationLight } from 'react-icons/pi'
import { useState } from 'react'
import { useEffect } from 'react'
import { BiCamera, BiCctv } from 'react-icons/bi'
import LogsChart from './LogsChart'
function LogsChartContainer({
  activeChart,
  setActiveChart,
  GpuDataSet,
  timelist,
  CpuDataSet,
  RamDataSet,
  FanDataSet,
  TempBoardDataSet,
  TempOutdoorDataSet,
  FpsDataSet,
  BatteryVoltageDataSet,
  SolarPanelVoltageDataSet,
  SolarPanelCurrentDataSet,
  SystemLoadVoltageDataSet,
  SystemLoadCurrentDataSet,
  ChargerCurrentDataSet,
  Payload,
}) {
  const [activeModel, setActiveModel] = useState({
    gpu: false,
    cpu: false,
    ram: false,
    fan: false,
    fps: false,
    temp_board: false,
    temp_outdoor: false,
    battery_voltage: false,
    solar_panel_voltage: false,
    solar_panel_current: false,
    system_load_voltage: false,
    system_load_current: false,
    charger_current: false,
  })

  const handleButtonClick = (property) => {
    const updatedModel = Object.fromEntries(
      Object.keys(activeModel).map((key) => [key, key === property])
    )
    setActiveModel(updatedModel)
  }

  return (
    <div className="flex h-[800px]  w-full rounded-2xl bg-gray-700 ">
      <div className="LogsChartScroll h-full w-[300px] overflow-y-scroll rounded-tl-2xl rounded-bl-2xl bg-gray-800 px-5 pb-10">
        <div className="flex w-full items-center justify-center">
          <p className="mt-5 border-b border-b-gray-500 px-4 pb-2 text-white   ">
            {' '}
            CHARTS
          </p>
        </div>
        <div className="mt-5 flex w-full items-center justify-center">
          <button
            onClick={() => handleButtonClick('gpu')}
            className={`flex w-full items-center py-2  font-medium text-white ${
              activeModel.gpu ? 'border-b border-b-green-400 text-white' : ''
            }`}
          >
            <BsGpuCard
              className={`mr-2 h-[25px] w-[25px] ${
                activeModel.gpu ? 'text-green-400' : ''
              }`}
            />
            <div>
              <p className={`text-left text-[14px] `}>GPU</p>
              <p className="text-left text-[10px] text-gray-400">
                ( GPU usage )
              </p>
            </div>
          </button>
        </div>
        <div className="mt-5 flex w-full items-center justify-center">
          <button
            onClick={() => handleButtonClick('cpu')}
            className={`flex w-full  items-center py-2  font-medium text-white ${
              activeModel.cpu ? 'border-b border-b-blue-400' : ''
            }`}
          >
            <BsCpu
              className={`mr-2 h-[25px] w-[25px] ${
                activeModel.cpu ? 'text-blue-400' : ''
              }`}
            />
            <div>
              <p className="text-left text-[14px]">CPU</p>
              <p className="text-left text-[10px] text-gray-400">
                ( CPU usage )
              </p>
            </div>
          </button>
        </div>
        <div className="mt-5 flex w-full items-center justify-center">
          <button
            onClick={() => handleButtonClick('ram')}
            className={`flex w-full items-center py-2  font-medium text-white ${
              activeModel.ram ? 'border-b border-b-red-400' : ''
            }`}
          >
            <CgSmartphoneRam
              className={`mr-2 h-[25px] w-[25px] ${
                activeModel.ram ? 'text-red-400' : ''
              }`}
            />
            <div>
              <p className="text-left text-[14px]">RAM</p>
              <p className="text-left text-[10px] text-gray-400">
                ( RAM usage )
              </p>
            </div>
          </button>
        </div>
        <div className="mt-5 flex w-full items-center justify-center">
          <button
            onClick={() => handleButtonClick('fan')}
            className={`flex w-full items-center py-2  font-medium text-white ${
              activeModel.fan ? 'border-b border-b-teal-400' : ''
            }`}
          >
            <BsFan
              className={`mr-2 h-[25px] w-[25px] ${
                activeModel.fan ? 'text-teal-400 ' : ' '
              } `}
            />
            <div>
              <p className="text-left text-[14px]">FAN</p>
              <p className="text-left text-[10px] text-gray-400">
                ( FAN speed )
              </p>
            </div>
          </button>
        </div>
        <div className="mt-5 flex w-full items-center justify-center">
          <button
            onClick={() => handleButtonClick('fps')}
            className={`flex w-full items-center py-2  font-medium text-white ${
              activeModel.fps ? 'border-b border-b-pink-400' : ''
            }`}
          >
            <TbKeyframes
              className={`mr-2 h-[25px] w-[25px] ${
                activeModel.fps ? 'text-pink-400 ' : ''
              }`}
            />
            <div>
              <p className="text-left text-[14px]">FPS</p>
              <p className="text-left text-[10px] text-gray-400">
                ( Frame per seconds )
              </p>
            </div>
          </button>
        </div>
        <div className="mt-5 flex w-full items-center justify-center">
          <button
            onClick={() => handleButtonClick('temp_board')}
            className={`flex w-full items-center py-2  font-medium text-white ${
              activeModel.temp_board ? 'border-b border-b-rose-600' : ''
            }`}
          >
            <CiTempHigh
              className={`mr-2 h-[25px] w-[25px] ${
                activeModel.temp_board ? 'text-rose-600' : ''
              }`}
            />
            <div>
              <p className="text-[14px]">TEMPARTURE</p>
              <p className="text-left text-[10px] text-gray-400">( Board )</p>
            </div>
          </button>
        </div>
        <div className="mt-5 flex w-full items-center justify-center">
          <button
            onClick={() => handleButtonClick('temp_outdoor')}
            className={`flex w-full items-center py-2  font-medium text-white ${
              activeModel.temp_outdoor ? 'border-b border-b-rose-600' : ''
            }`}
          >
            <CiTempHigh
              className={`mr-2 h-[25px] w-[25px] ${
                activeModel.temp_outdoor ? 'text-rose-600' : ''
              } `}
            />
            <div>
              <p className="text-[14px]">TEMPARTURE</p>
              <p className="text-left text-[10px] text-gray-400">( Outdoor )</p>
            </div>
          </button>
        </div>
        <div className="mt-5 flex w-full items-center justify-center">
          <button
            onClick={() => handleButtonClick('battery_voltage')}
            className={`flex w-full items-center py-2  font-medium text-white ${
              activeModel.battery_voltage ? 'border-b border-b-yellow-400' : ''
            }`}
          >
            <MdOutlineElectricBolt
              className={`mr-2 h-[25px] w-[25px] ${
                activeModel.battery_voltage ? 'text-yellow-400' : ''
              }`}
            />
            <div>
              <p className="text-[14px]">BATTERY VOLTAGE</p>
              <p className="text-left text-[10px] text-gray-400">( V )</p>
            </div>
          </button>
        </div>
        <div className="mt-5 flex w-full items-center justify-center">
          <button
            onClick={() => handleButtonClick('solar_panel_voltage')}
            className={`flex w-full items-center py-2  font-medium text-white ${
              activeModel.solar_panel_voltage
                ? 'border-b border-b-[#f2a53f]'
                : ''
            }`}
          >
            <FaSolarPanel
              className={`mr-2 h-[25px] w-[25px] ${
                activeModel.solar_panel_voltage ? 'text-[#f2a53f]' : ''
              }`}
            />
            <div>
              <p className="text-[14px]">SOLAR PANEL VOLTAGE</p>
              <p className="text-left text-[10px] text-gray-400">( V )</p>
            </div>
          </button>
        </div>
        <div className="mt-5 flex w-full items-center justify-center">
          <button
            onClick={() => handleButtonClick('solar_panel_current')}
            className={`flex w-full items-center py-2  font-medium text-white ${
              activeModel.solar_panel_current
                ? 'border-b border-b-[#f2a53f]'
                : ''
            }`}
          >
            <FaSolarPanel
              className={`mr-2 h-[25px] w-[25px] ${
                activeModel.solar_panel_current ? 'text-[#f2a53f]' : ''
              }`}
            />
            <div>
              <p className="text-[14px]">SOLAR PANEL CURRENT</p>
              <p className="text-left text-[10px] text-gray-400">( mA )</p>
            </div>
          </button>
        </div>
        <div className="mt-5 flex w-full items-center justify-center">
          <button
            onClick={() => handleButtonClick('system_load_voltage')}
            className={`flex w-full items-center py-2  font-medium text-white ${
              activeModel.system_load_voltage
                ? 'border-b border-b-lime-300'
                : ''
            }`}
          >
            <BsMotherboard
              className={`mr-2 h-[25px] w-[25px] ${
                activeModel.system_load_voltage ? 'text-lime-300' : ''
              } `}
            />
            <div>
              <p className="text-[14px]">SYSTEM LOAD VOLTAGE</p>
              <p className="text-left text-[10px] text-gray-400">( V )</p>
            </div>
          </button>
        </div>
        <div className="mt-5 flex w-full items-center justify-center">
          <button
            onClick={() => handleButtonClick('system_load_current')}
            className={`flex w-full items-center py-2  font-medium text-white ${
              activeModel.system_load_current
                ? 'border-b border-b-lime-300'
                : ''
            }`}
          >
            <BsMotherboard
              className={`mr-2 h-[25px] w-[25px] ${
                activeModel.system_load_current ? 'text-lime-300' : ''
              }`}
            />
            <div>
              <p className="text-[14px]">SYSTEM LOAD CURRENT</p>
              <p className="text-left text-[10px] text-gray-400">( mA )</p>
            </div>
          </button>
        </div>
        <div className="mt-5 flex w-full items-center justify-center">
          <button
            onClick={() => handleButtonClick('charger_current')}
            className={`flex w-full items-center py-2  font-medium text-white ${
              activeModel.charger_current ? 'border-b border-b-indigo-400' : ''
            }`}
          >
            <PiChargingStationLight
              className={`mr-2 h-[25px] w-[25px] ${
                activeModel.charger_current ? 'text-indigo-400' : ''
              }`}
            />
            <div>
              <p className="text-[14px]">CHARGER CURRENT</p>
              <p className="text-left text-[10px] text-gray-400">( mA )</p>
            </div>
          </button>
        </div>
      </div>
      <div className=" flex w-full justify-center ">
        <div className="mt-10 w-[90%]">
          {activeModel.gpu ? (
            <>
              <LogsChart DataSet={GpuDataSet} timelist={timelist} />
              <div className="flex items-center justify-center">
                <div className="flex items-center justify-center">
                  {' '}
                  <BsGpuCard className="h-[30px] w-[30px] text-green-400" />{' '}
                  <p className="ml-5 font-medium text-white">GPU USAGE </p>
                </div>
                <div className="ml-5 flex items-center justify-center">
                  {' '}
                  <BiCctv className="h-[30px] w-[30px] text-green-400" />{' '}
                  <p className="ml-3 font-medium text-white">
                    {Payload.camera_id}{' '}
                  </p>
                </div>
              </div>
            </>
          ) : (
            ''
          )}
          {activeModel.cpu ? (
            <>
              <LogsChart DataSet={CpuDataSet} timelist={timelist} />
              <div className="flex items-center justify-center">
                <div className="flex items-center justify-center">
                  {' '}
                  <BsCpu className="h-[30px] w-[30px] text-blue-400" />{' '}
                  <p className="ml-5 font-medium text-white">CPU USAGE </p>
                </div>
                <div className="ml-5 flex items-center justify-center">
                  {' '}
                  <BiCctv className="h-[30px] w-[30px] text-blue-400" />{' '}
                  <p className="ml-3 font-medium text-white">
                    {Payload.camera_id}{' '}
                  </p>
                </div>
              </div>
            </>
          ) : (
            ''
          )}
          {activeModel.ram ? (
            <>
              <LogsChart DataSet={RamDataSet} timelist={timelist} />
              <div className="flex items-center justify-center">
                <div className="flex items-center justify-center">
                  {' '}
                  <CgSmartphoneRam className="h-[30px] w-[30px] text-red-400" />{' '}
                  <p className="ml-5 font-medium text-white">RAM USAGE </p>
                </div>
                <div className="ml-5 flex items-center justify-center">
                  {' '}
                  <BiCctv className="h-[30px] w-[30px] text-red-400" />{' '}
                  <p className="ml-3 font-medium text-white">
                    {Payload.camera_id}{' '}
                  </p>
                </div>
              </div>
            </>
          ) : (
            ''
          )}
          {activeModel.fan ? (
            <>
              <LogsChart DataSet={FanDataSet} timelist={timelist} />
              <div className="flex items-center justify-center">
                <div className="flex items-center justify-center">
                  {' '}
                  <BsFan className="h-[30px] w-[30px] text-teal-400" />{' '}
                  <p className="ml-5 font-medium text-white">FAN SPEED </p>
                </div>
                <div className="ml-5 flex items-center justify-center">
                  {' '}
                  <BiCctv className="h-[30px] w-[30px] text-teal-400" />{' '}
                  <p className="ml-3 font-medium text-white">
                    {Payload.camera_id}{' '}
                  </p>
                </div>
              </div>
            </>
          ) : (
            ''
          )}
          {activeModel.fps ? (
            <>
              <LogsChart DataSet={FpsDataSet} timelist={timelist} />
              <div className="flex items-center justify-center">
                <div className="flex items-center justify-center">
                  {' '}
                  <TbKeyframes className="h-[30px] w-[30px] text-pink-400" />{' '}
                  <p className="ml-5 font-medium text-white">
                    FRAME PER SECONDS{' '}
                  </p>
                </div>
                <div className="ml-5 flex items-center justify-center">
                  {' '}
                  <BiCctv className="h-[30px] w-[30px] text-pink-400" />{' '}
                  <p className="ml-3 font-medium text-white">
                    {Payload.camera_id}{' '}
                  </p>
                </div>
              </div>
            </>
          ) : (
            ''
          )}
          {activeModel.temp_board ? (
            <>
              <LogsChart DataSet={TempBoardDataSet} timelist={timelist} />
              <div className="flex items-center justify-center">
                <div className="flex items-center justify-center">
                  {' '}
                  <CiTempHigh className="h-[30px] w-[30px] text-rose-600" />{' '}
                  <p className="ml-5 font-medium text-white">
                    BOARD TEMPARTURE{' '}
                  </p>
                </div>
                <div className="ml-5 flex items-center justify-center">
                  {' '}
                  <BiCctv className="h-[30px] w-[30px] text-rose-600" />{' '}
                  <p className="ml-3 font-medium text-white">
                    {Payload.camera_id}{' '}
                  </p>
                </div>
              </div>
            </>
          ) : (
            ''
          )}
          {activeModel.temp_outdoor ? (
            <>
              <LogsChart DataSet={TempOutdoorDataSet} timelist={timelist} />
              <div className="flex items-center justify-center">
                <div className="flex items-center justify-center">
                  {' '}
                  <CiTempHigh className="h-[30px] w-[30px] text-rose-600" />{' '}
                  <p className="ml-5 font-medium text-white">
                    OUT DOOR TEMPARTURE{' '}
                  </p>
                </div>
                <div className="ml-5 flex items-center justify-center">
                  {' '}
                  <BiCctv className="h-[30px] w-[30px] text-rose-600" />{' '}
                  <p className="ml-3 font-medium text-white">
                    {Payload.camera_id}{' '}
                  </p>
                </div>
              </div>
            </>
          ) : (
            ''
          )}
          {activeModel.battery_voltage ? (
            <>
              <LogsChart DataSet={BatteryVoltageDataSet} timelist={timelist} />
              <div className="flex items-center justify-center">
                <div className="flex items-center justify-center">
                  {' '}
                  <MdOutlineElectricBolt className="h-[30px] w-[30px] text-yellow-400" />{' '}
                  <p className="ml-5 font-medium text-white">
                    BATTERY VOLTAGE (V){' '}
                  </p>
                </div>
                <div className="ml-5 flex items-center justify-center">
                  {' '}
                  <BiCctv className="h-[30px] w-[30px] text-yellow-400" />{' '}
                  <p className="ml-3 font-medium text-white">
                    {Payload.camera_id}{' '}
                  </p>
                </div>
              </div>
            </>
          ) : (
            ''
          )}
          {activeModel.solar_panel_voltage ? (
            <>
              <LogsChart
                DataSet={SolarPanelVoltageDataSet}
                timelist={timelist}
              />
              <div className="flex items-center justify-center">
                <div className="flex items-center justify-center">
                  {' '}
                  <FaSolarPanel className="h-[30px] w-[30px] text-[#f2a53f]" />{' '}
                  <p className="ml-5 font-medium text-white">
                    SOLAR PANEL VOLTAGE (V){' '}
                  </p>
                </div>
                <div className="ml-5 flex items-center justify-center">
                  {' '}
                  <BiCctv className="h-[30px] w-[30px] text-[#f2a53f]" />{' '}
                  <p className="ml-3 font-medium text-white">
                    {Payload.camera_id}{' '}
                  </p>
                </div>
              </div>
            </>
          ) : (
            ''
          )}
          {activeModel.solar_panel_current ? (
            <>
              <LogsChart
                DataSet={SolarPanelCurrentDataSet}
                timelist={timelist}
              />
              <div className="flex items-center justify-center">
                <div className="flex items-center justify-center">
                  {' '}
                  <FaSolarPanel className="h-[30px] w-[30px] text-[#f2a53f]" />{' '}
                  <p className="ml-5 font-medium text-white">
                    SOLAR PANEL CURRENT (mA){' '}
                  </p>
                </div>
                <div className="ml-5 flex items-center justify-center">
                  {' '}
                  <BiCctv className="h-[30px] w-[30px] text-[#f2a53f]" />{' '}
                  <p className="ml-3 font-medium text-white">
                    {Payload.camera_id}{' '}
                  </p>
                </div>
              </div>
            </>
          ) : (
            ''
          )}
          {activeModel.system_load_voltage ? (
            <>
              <LogsChart
                DataSet={SystemLoadVoltageDataSet}
                timelist={timelist}
              />
              <div className="flex items-center justify-center">
                <div className="flex items-center justify-center">
                  {' '}
                  <BsMotherboard className="h-[30px] w-[30px] text-lime-300" />{' '}
                  <p className="ml-5 font-medium text-white">
                    SYSTEM LOAD VOLTAGE (V){' '}
                  </p>
                </div>
                <div className="ml-5 flex items-center justify-center">
                  {' '}
                  <BiCctv className="h-[30px] w-[30px] text-lime-300" />{' '}
                  <p className="ml-3 font-medium text-white">
                    {Payload.camera_id}{' '}
                  </p>
                </div>
              </div>
            </>
          ) : (
            ''
          )}
          {activeModel.system_load_current ? (
            <>
              <LogsChart
                DataSet={SystemLoadCurrentDataSet}
                timelist={timelist}
              />
              <div className="flex items-center justify-center">
                <div className="flex items-center justify-center">
                  {' '}
                  <BsMotherboard className="h-[30px] w-[30px] text-lime-300" />{' '}
                  <p className="ml-5 font-medium text-white">
                    SYSTEM LOAD CURRENT (mA){' '}
                  </p>
                </div>
                <div className="ml-5 flex items-center justify-center">
                  {' '}
                  <BiCctv className="h-[30px] w-[30px] text-lime-300" />{' '}
                  <p className="ml-3 font-medium text-white">
                    {Payload.camera_id}{' '}
                  </p>
                </div>
              </div>
            </>
          ) : (
            ''
          )}
          {activeModel.charger_current ? (
            <>
              <LogsChart DataSet={ChargerCurrentDataSet} timelist={timelist} />
              <div className="flex items-center justify-center">
                <div className="flex items-center justify-center">
                  {' '}
                  <PiChargingStationLight className="h-[30px] w-[30px] text-indigo-300" />{' '}
                  <p className="ml-5 font-medium text-white">
                    CHARGER CURRENT (mA){' '}
                  </p>
                </div>
                <div className="ml-5 flex items-center justify-center">
                  {' '}
                  <BiCctv className="h-[30px] w-[30px] text-indigo-300" />{' '}
                  <p className="ml-3 font-medium text-white">
                    {Payload.camera_id}{' '}
                  </p>
                </div>
              </div>
            </>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  )
}

export default LogsChartContainer
