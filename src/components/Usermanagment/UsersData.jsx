import React from 'react'
import { TiTick } from 'react-icons/ti'
import { IoMdClose } from 'react-icons/io'
import { AiOutlineDelete } from 'react-icons/ai'
function UsersData({ data, handleDeleteUser, handleVerifyUser }) {
  return (
    <tr className=" border-b text-center text-white">
      <td className="py-4">{data.id}</td>
      <td className="py-4">{data.name}</td>
      <td className="py-4">{data.description}</td>
      <td className="flex items-center justify-center py-5">
        {data.is_staff ? (
          <TiTick className="h-[20px] w-[20px] text-green-600" />
        ) : (
          <IoMdClose className="h-[20px] w-[20px] text-red-600" />
        )}
      </td>
      <td className="py-4">
        <div className="flex items-center justify-center">
          {data.is_verified ? (
            <TiTick
              onClick={() => handleVerifyUser(data.id, { is_verified: false })}
              className=" h-[20px] w-[20px] cursor-pointer text-green-400"
            />
          ) : (
            <IoMdClose
              onClick={() => handleVerifyUser(data.id, { is_verified: true })}
              className=" h-[20px] w-[20px] cursor-pointer text-red-500"
            />
          )}
        </div>
      </td>
      <td className="py-4">
        <button onClick={() => handleDeleteUser(data.id)}>
          <AiOutlineDelete className="h-[25px] w-[25px] text-red-600" />
        </button>
      </td>
    </tr>
  )
}

export default UsersData
