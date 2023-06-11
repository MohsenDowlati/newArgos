import React from 'react'
import { BiCctv, BiDirections, BiTime } from 'react-icons/bi';

function ChartDetail({Total,PeakTime,camera_id,Direction,icon ,TextColor,Title}) {
    return ( 
        <div className="w-full flex justify-around items-center mb-10">
        <div className="flex ml-10 items-center">
            {icon}
            <div className="ml-2">
                <p className={`text-xl font-boldVazir ${TextColor}`}>{Total}</p>
                <p className="text-sm text-gray-500">Total {Title}</p>
            </div>
        </div>
          <div className="flex ml-4 items-center">
            <BiTime className={`text-xl w-[40px] h-[40px]  font-boldVazir ${TextColor}`}/>
            <div className="ml-2">
                <p className={`text-xl font-boldVazir ${TextColor}`}>{PeakTime + ':00'}</p>
                <p className="text-sm text-gray-500">Peak Time</p>
            </div>
        </div>
    
        <div className="flex ml-4 items-center">
            <BiCctv className={`text-xl w-[40px] h-[40px]  font-boldVazir ${TextColor}`}/>
            <div className="ml-2">
                <p className={`text-xl font-boldVazir ${TextColor}`}>{camera_id}</p>
                <p className="text-sm text-gray-500">Camera</p>
            </div>
        </div>
        <div className="flex items-center ml-7 ">
            <BiDirections className={`w-[40px] h-[40px] ${TextColor}`}/>
            <div className="overflow-y-scroll h-[80px] px-5">
              
                     {Direction?.map((item, index) => (
                         <p className="text-white text-sm" key={index}>
                         {Object.keys(item)[0]}: {item[Object.keys(item)[0]]}
                         </p>
                        ))}
        
            </div>
        </div>
    </div>
     );
}

export default ChartDetail;