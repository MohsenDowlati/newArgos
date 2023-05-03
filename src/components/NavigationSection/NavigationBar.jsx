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
        <div className='flex items-center w-full justify-center flex-shrink '>
             <NavigationCard
                    Icon={<AiOutlineHome className="text-indigo-600  w-[40px] h-[40px]"/>}
                    Title={'Home'}
                    onClick={()=>router.push('/dashboard/home')}
                    importantColor={'text-indigo-500'}
                    Details_1={'Main Route of your  '}
                    importantText={'Dashboard'}
                    Details_2={'is home'}
                />
                 <NavigationCard
                    Icon={<AiOutlineSetting className="text-orange-600  w-[40px] h-[40px]"/>}
                    Title={'Configurations'}
                    onClick={()=>router.push('/dashboard/configuration')}
                    importantColor={'text-orange-500'}
                    Details_1={'You can customize your '}
                    importantText={'configurations'}
                    Details_2={'from here'}
                />
                     <NavigationCard
                    Icon={<BiCamera className="text-blue-600  w-[40px] h-[40px]"/>}
                    Title={'Cameras'}
                    onClick={()=>router.push('/dashboard/cameras')}
                    importantColor={'text-blue-400'}
                    Details_1={'All things related to '}
                    importantText={'Cameras'}
                    Details_2={'will be here for you to play with'}
                />
                    <NavigationCard
                    Icon={<BiBarChart className="text-red-600  w-[40px] h-[40px]"/>}
                    Title={'Metrics'}
                    onClick={()=>router.push('/dashboard/metrics')}
                    importantColor={'text-red-400'}
                    Details_1={'Charts and other  '}
                    importantText={'Analytics'}
                    Details_2={'will be here'}
                />
                     <NavigationCard
                    Icon={<GiNotebook className="text-cyan-600    w-[40px] h-[40px]"/>}
                    Title={'Logs'}
                    onClick={()=>router.push('/dashboard/logs')}
                    importantColor={'text-cyan-500'}
                    Details_1={'You can see logs of your   '}
                    importantText={'Cameras'}
                    Details_2={'Here'}
                />
                     <NavigationCard
                    Icon={<BsFillPeopleFill className="text-green-600    w-[40px] h-[40px]"/>}
                    Title={'Organizations'}
                    onClick={()=>router.push('/dashboard/organizations')}
                    importantColor={'text-green-500'}
                    Details_1={'See all    '}
                    importantText={'Organizations'}
                    Details_2={'and connect with them here'}
                />
        </div>
     );
}

export default NavigationBar;