import { useRouter } from 'next/router';
import React from 'react'
import { AiOutlineHome, AiOutlineSetting } from 'react-icons/ai';
import { BiBarChart, BiCamera } from 'react-icons/bi';
import { BsFillPeopleFill } from 'react-icons/bs';
import { GiNotebook } from 'react-icons/gi';
import NavigationCard from '../cards/NavigationCards';

function NavigationBar() {
    const router = useRouter()
    return (
        <div className=' items-center justify-center  '>
             <NavigationCard
                    Icon={<AiOutlineHome className="text-blue-300  w-[40px] h-[40px]"/>}
                    Title={'Home'}
                    hoverColor={'shadow-blue-500'}
                    onClick={()=>router.push('/dashboard/home')}
                    Details={'Navigate to your home'}
                />
                 <NavigationCard
                    Icon={<AiOutlineSetting className="text-orange-300   w-[40px] h-[40px]"/>}
                    Title={'Configurations'}
                    hoverColor={'shadow-white'}
                    onClick={()=>router.push('/dashboard/configuration')}
                  

                    Details={'Navigate to Configuration'}
                />
                     <NavigationCard
                    Icon={<BiCamera className="text-indigo-300 w-[40px] h-[40px]"/>}
                    Title={'Cameras'}
                    onClick={()=>router.push('/dashboard/cameras')}
                    Details={'Navigate to Cameras'}
                    bgColor={'bg-blue-600'}
                  
                />
                    <NavigationCard
                    Icon={<BiBarChart className="text-red-300  w-[40px] h-[40px]"/>}
                    Title={'Metrics'}
                    onClick={()=>router.push('/dashboard/metrics')}
                    Details={'Navigate to Metrics'}
                    bgColor={'bg-red-600'}
                />
                     <NavigationCard
                    Icon={<GiNotebook className="text-cyan-300    w-[40px] h-[40px]"/>}
                    Title={'Logs'}
                    onClick={()=>router.push('/dashboard/logs')}
                    Details={'Navigate to Logs'}
                    bgColor={'bg-cyan-600'}
                  
                />
                     <NavigationCard
                    Icon={<BsFillPeopleFill className="text-green-300   w-[40px] h-[40px]"/>}
                    Title={'Organizations'}
                    onClick={()=>router.push('/dashboard/organizations')}
                    bgColor={'bg-green-500'}
                    Details={'Navigate to Organizations'}
                />
        </div>
     );
}

export default NavigationBar;