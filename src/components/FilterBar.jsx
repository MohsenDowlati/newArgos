import React from 'react'
import { BiCar, BiCycling } from 'react-icons/bi';
import { BsBusFront, BsPerson, BsTrainFront, BsTruck } from 'react-icons/bs';
import { RiMotorbikeLine } from 'react-icons/ri';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { Listbox } from '@headlessui/react';
import ListBox from './DropdownBtn/ListDropDown';




function FilterBar({SETstartdate,SETenddate,startdate,enddate,setCamera_id,ApplyFunction}) {
    
    return ( 
        <div className='animate-fade-in z-10 ml-10 bg-transparent '>
        <div className="mt-32  text-white flex w-fit items-center h-[70px] rounded-xl bg-[#202024]">
                   <div className="w-[130px] h-full bg-blue-400 flex items-center justify-center rounded-tl-xl rounded-bl-xl">
                    <BsPerson className="w-[30px] mr-1 h-[30px]"/>
                    <p>Person</p>
                   </div>
                   <div className="w-[130px] h-full bg-indigo-400 flex items-center justify-center ">
                    <BiCycling className="w-[30px] mr-1 h-[30px]"/>
                    <p>Bicycle</p>
                   </div>
                   <div className="w-[130px] h-full bg-red-400 flex items-center justify-center ">
                    <BiCar className="w-[30px] mr-1 h-[30px]"/>
                    <p>Car</p>
                   </div>
                   <div className="w-[130px] h-full bg-green-400 flex items-center justify-center ">
                    <RiMotorbikeLine className="w-[30px] mr-1 h-[30px]"/>
                    <p className="text-sm">Motorcycle</p>
                   </div>
                   <div className="w-[130px] h-full bg-pink-400 flex items-center justify-center ">
                    <BsBusFront className="w-[30px] mr-1 h-[30px]"/>
                    <p className="text-sm">Bus</p>
                   </div>
                   <div className="w-[130px] h-full bg-amber-500 flex items-center justify-center ">
                    <BsTrainFront className="w-[30px] mr-1 h-[30px]"/>
                    <p className="text-sm">Train</p>
                   </div>
                   <div className="w-[130px] h-full bg-rose-700 rounded-tr-xl rounded-br-xl flex items-center justify-center ">
                    <BsTruck className="w-[30px] mr-1 h-[30px]"/>
                    <p className="text-sm">Truck</p>
                   </div>
                </div>
                <div className='flex mt-5 items-center '>
                    <div className='  relative p-3 rounded-xl border border-white'>
                        <p className='absolute -top-3 text-white z-10 bg-[#292c30] px-2 text-sm'>Start date </p>
                        <DatePicker selected={startdate} dateFormat={'yyyy-MM-dd'}  onChange={(Date)=> SETstartdate(Date)}  className=' z-10 bg-transparent focus:outline-none text-white'/>
                    </div>
                    <div className=' relative p-3 rounded-xl border border-white ml-2'>
                        <p className='absolute -top-3 text-white z-10 bg-[#292c30] px-2 text-sm'>End date </p>
                        <DatePicker selected={enddate}  dateFormat={'yyyy-MM-dd'}  onChange={(Date)=>SETenddate(Date)} className=' z-10 bg-transparent focus:outline-none text-white'/>
                    </div>
                    <div>
                            <ListBox setCamera_id={setCamera_id}/>
                    </div>
                    <button onClick={ApplyFunction} className='ml-10 w-[200px] bg-blue-400 p-4 rounded-xl text-white'>Apply filters</button>
                </div>
        </div>
                
     );
}

export default FilterBar;