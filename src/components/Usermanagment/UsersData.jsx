import React from 'react'
import { TiTick } from 'react-icons/ti'
import { IoMdClose } from 'react-icons/io'
import { AiOutlineDelete } from 'react-icons/ai'
import {useState} from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UsersData({ data, admin , user , orgID,handleVerifyUser}) {
    //initialize useState
  const [isAdmin , setIsAdmin] = useState(admin);
  const [isUser , setIsUser] = useState(user);

  const confirmDialog = "Are sure about that?"
    //For sending to back-end
  const change = {
      user:data.id ,
      org_id: orgID,
      is_user: user,
      is_admin: admin
  }

  const adminHandling = () => {
      // only users can be admin
      if (isUser && confirm(confirmDialog)) {
              setIsAdmin(!isAdmin);
              handleVerifyUser(change);
          } else {
              console.log('Only Users Can Be Admin')
              //TODO: toast massage
          }
  }

  const userHandling = () => {
      if(confirm(confirmDialog)){
          if (isUser) {
              // only users can be admin
              setIsAdmin(false)
          }
      setIsUser(!isUser);
      handleVerifyUser(change);
      }
  }

  //return component
  return (
    <tr className=" border-b text-center text-white">
      <td className="py-4">{data.id}</td>
      <td className="py-4">{data.username}</td>
      <td className="py-4">{data.email}</td>
      <td className="flex items-center justify-center py-5">
        {isAdmin ? (
          <TiTick className="h-[20px] w-[20px] text-green-600"
                  onClick={adminHandling}/>
        ) : (
          <IoMdClose className="h-[20px] w-[20px] text-red-600"
                     onClick={adminHandling}/>
        )}
      </td>
      <td className="py-4">
        <div className="flex items-center justify-center">
          {isUser ? (
            <TiTick
              onClick={userHandling}
              className=" h-[20px] w-[20px] cursor-pointer text-green-400"
            />
          ) : (
            <IoMdClose
              onClick={userHandling}
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
