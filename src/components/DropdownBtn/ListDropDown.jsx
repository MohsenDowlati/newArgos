

import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { BiCamera } from 'react-icons/bi'
import { useState } from 'react'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ListBox({setCamera_id}) {
    const [selected,setSelected] = useState('Camera')
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex items-center w-full justify-center gap-x-1.5 rounded-xl ml-5 bg-slate-700 text-white p-4  text-sm font-semibold  shadow-sm  ">
            <BiCamera className='w-[20px] h-[20px]'/>
            {selected}
        
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute left-5 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
          <Menu.Item>
              {({ active }) => (
                <a
                onClick={()=>{
                    setSelected('ARGV-30001')
                    setCamera_id('ARGv30001')
                }}
                  
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                 ARGV-30001
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
