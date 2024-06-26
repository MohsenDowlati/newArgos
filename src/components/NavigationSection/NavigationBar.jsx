import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { AiOutlineHome, AiOutlineSetting } from 'react-icons/ai'
import { BiBarChart, BiCctv, BiLogOut,BiVideo} from 'react-icons/bi'
import { BsFillPeopleFill } from 'react-icons/bs'
import { GiNotebook } from 'react-icons/gi'
import { FcHeatMap } from 'react-icons/fc';
import NavigationCard from '../cards/NavigationCards'

function NavigationBar({ WhichActive }) {
  const router = useRouter()
  const [Metrics, setMetrics] = useState(false)
  const [Home, setHome] = useState(false)
  const [Camera, setCamera] = useState(false)
  const [Record, setRecord] = useState(false)
  const [Heatmap, setHeatmap] = useState(false)
  const [Logs, setLogs] = useState(false)
  const [Usermanagement, setUsermanagment] = useState(false)
  useEffect(() => {
    switch (WhichActive) {
      case 'Home':
        return setHome(true)
      case 'Metrics':
        return setMetrics(true)
      case 'Heatmap':
        return setHeatmap(true)
      case 'Camera':
        return setCamera(true)
      case 'Record':
        return setRecord(true)
      case 'Usermanagement':
        return setUsermanagment(true)
      case 'Logs':
        return setLogs(true)
        break

      default:
        break
    }
  }, [WhichActive])
  return (
    <div className="w-[50px] transition-all delay-100 hover:w-[200px]">
        { /*<NavigationCard
        whichActive={Home}
        MainColor={'text-blue-500'}
        Icon={<AiOutlineHome className="  h-[30px] w-[30px]" />}
        Title={'Home'}
        hoverColor={'shadow-blue-500'}
        onClick={() => router.push('/dashboard/home')}
        Details={'Navigate to your home'}
      /> */}
      
      <NavigationCard
        MainColor={'indigo-400'}
        Icon={<BiCctv className=" h-[30px] w-[30px]" />}
        Title={'Live Stream'}
        whichActive={Camera}
        onClick={() => router.push('/dashboard/uploadVideo')}
        Details={'Navigate to Cameras'}
        bgColor={'bg-blue-600'}
      />
      <NavigationCard
        MainColor={'indigo-400'}
        Icon={<BiVideo className=" h-[30px] w-[30px]" />}
        Title={'Region Selection'}
        whichActive={Record}
        onClick={() => router.push('/dashboard/regionSelection')}
        Details={'Navigate to Cameras'}
        bgColor={'bg-blue-600'}
      />

      {/*<NavigationCard
        MainColor={'text-red-500'}
        whichActive={Metrics}
        Icon={<BiBarChart className="  h-[30px] w-[30px]" />}
        Title={'Metrics'}
        onClick={() => router.push('/dashboard/metrics')}
        Details={'Navigate to Metrics'}
        bgColor={'bg-red-600'}
      />
      <NavigationCard
        whichActive={Heatmap}
        MainColor={'text-green-400'}
        Icon={<FcHeatMap className="   h-[30px] w-[30px]" />}
        Title={'Ped Heatmap'}
        onClick={() => router.push('/dashboard/heatmap')}
        bgColor={'bg-green-500'}
        Details={'Navigate to Usermanagment'}
      />
      <NavigationCard
        whichActive={Logs}
        Icon={<GiNotebook className="     h-[30px] w-[30px]" />}
        Title={'Logs'}
        MainColor={'text-orange-500'}
        onClick={() => router.push('/dashboard/logs')}
        Details={'Navigate to Logs'}
        bgColor={'bg-cyan-600'}
      />
      <NavigationCard
        whichActive={Usermanagement}
        MainColor={'text-green-400'}
        Icon={<BsFillPeopleFill className="   h-[30px] w-[30px]" />}
        Title={'Groups'}
        onClick={() => router.push('/dashboard/usermanagment')}
        bgColor={'bg-green-500'}
        Details={'Navigate to Usermanagment'}
      />*/}
      <NavigationCard
        islogout={true}
        MainColor={'green-400'}
        Icon={<BiLogOut className="   h-[30px] w-[30px]" />}
        Title={'Logout'}
        onClick={() => {
          localStorage.clear()
          router.push('/')
        }}
        bgColor={'bg-green-500'}
        Details={'Logout'}
      />
    </div>
  )
}

export default NavigationBar
/*
<NavigationCard
        MainColor={'orange-400'}
        Icon={<AiOutlineSetting className="   h-[30px] w-[30px]" />}
        Title={'Configurations'}
        hoverColor={'shadow-white'}
        onClick={() => router.push('/dashboard/configuration')}
        Details={'Navigate to Configuration'}
      />
*/