import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { AiOutlineHome, AiOutlineSetting } from 'react-icons/ai';
import { BiBarChart, BiCamera } from 'react-icons/bi';
import { BsFillPeopleFill } from 'react-icons/bs';
import { GiNotebook } from 'react-icons/gi';
import NavigationCard from '../cards/NavigationCards';

function NavigationBar({WhichActive}) {
    const router = useRouter()
    const [Metrics,setMetrics] = useState(false)
    const [Home,setHome] = useState(false)

    useEffect(() => {
        
        switch (WhichActive) {
            case 'Home': return setHome(true)
            case 'Metrics' : return setMetrics(true)
                break;
        
            default:
                break;
        }


    }, [WhichActive]);
    return (
        <div className='w-[50px] hover:w-[200px] transition-all delay-100'>
             <NavigationCard
                    whichActive={Home}
                    MainColor={'blue-500'}
                    Icon={<AiOutlineHome className="  w-[30px] h-[30px]"/>}
                    Title={'Home'}
                    hoverColor={'shadow-blue-500'}
                    onClick={()=>router.push('/dashboard/home')}
                    Details={'Navigate to your home'}
                />
                 <NavigationCard
                    MainColor={'orange-400'}
                    Icon={<AiOutlineSetting className="   w-[30px] h-[30px]"/>}
                    Title={'Configurations'}
                    hoverColor={'shadow-white'}
                    onClick={()=>router.push('/dashboard/configuration')}
                  

                    Details={'Navigate to Configuration'}
                />
                     <NavigationCard
                     MainColor={'indigo-400'}
                    Icon={<BiCamera className=" w-[30px] h-[30px]"/>}
                    Title={'Cameras'}
                    onClick={()=>router.push('/dashboard/cameras')}
                    Details={'Navigate to Cameras'}
                    bgColor={'bg-blue-600'}
                  
                />
                    <NavigationCard
                    MainColor={'red-500'}
                    whichActive={Metrics}
                    Icon={<BiBarChart className="  w-[30px] h-[30px]"/>}
                    Title={'Metrics'}
                    onClick={()=>router.push('/dashboard/metrics')}
                    Details={'Navigate to Metrics'}
                    bgColor={'bg-red-600'}
                />
                     <NavigationCard
                    Icon={<GiNotebook className="     w-[30px] h-[30px]"/>}
                    Title={'Logs'}
                    onClick={()=>router.push('/dashboard/logs')}
                    Details={'Navigate to Logs'}
                    bgColor={'bg-cyan-600'}
                  
                />
                     <NavigationCard
                    MainColor={'green-400'}
                    Icon={<BsFillPeopleFill className="   w-[30px] h-[30px]"/>}
                    Title={'Organizations'}
                    onClick={()=>router.push('/dashboard/organizations')}
                    bgColor={'bg-green-500'}
                    Details={'Navigate to Organizations'}
                />
        </div>
     );
}

export default NavigationBar;