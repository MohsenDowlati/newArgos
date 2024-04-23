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


  const adminHandling = (boolAdmin) => {
      console.log("bool admin: ", boolAdmin)
      // only users can be admin
      if (isUser && confirm(confirmDialog)) {

          //For sending to back-end
          setIsAdmin(boolAdmin);
          console.log("admin",isAdmin)
          const change = {
              user:data.id ,
              org_id: orgID,
              is_user: isUser,
              is_admin: boolAdmin
          }
              handleVerifyUser(change);
          } else {
          toast.warning('Only Users Can Be Admin', {
              position: 'bottom-right',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: false,
              progress: undefined,
              theme: "light",
          });
          }
  }

  const userHandling = (boolUser) => {
      if(confirm(confirmDialog)){
          if (isUser) {
              //For sending to back-end
              const change = {
                  user:data.id ,
                  org_id: orgID,
                  is_user: boolUser,
                  is_admin: false
              }
              // only users can be admin
              setIsAdmin(false);
              handleVerifyUser(change);
          }
      setIsUser(!isUser);
          //For sending to back-end
          const change = {
              user:data.id ,
              org_id: orgID,
              is_user: boolUser,
              is_admin: isAdmin
          }
          handleVerifyUser(change)
      }
  }

  //return component
  return (
      <>
    <tr className="border-b text-center text-white">
      <td className="py-4">{data.id}</td>
      <td className="py-4">{data.username}</td>
      <td className="py-4">{data.email}</td>
      <td className="flex items-center justify-center py-5">
        {isAdmin ? (
          <TiTick className="h-[20px] w-[20px] text-green-600 cursor-pointer"
                  onClick={()=> {
                      adminHandling(false)
                  }}/>
        ) : (
          <IoMdClose className="h-[20px] w-[20px] text-red-600 cursor-pointer"
                     onClick={() => {
                         adminHandling(true)
                     }}/>
        )}
      </td>
      <td className="py-4">
        <div className="flex items-center justify-center">
          {isUser ? (
            <TiTick
              onClick={()=>userHandling(false)}
              className=" h-[20px] w-[20px] cursor-pointer text-green-400"
            />
          ) : (
            <IoMdClose
              onClick={()=>userHandling(true)}
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
      </>
  )
}

export default UsersData
