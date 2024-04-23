// Import
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import React from 'react'
import NavigationBar from '@/components/NavigationSection/NavigationBar'
import Navbar from '@/components/Navbar/Navbar'
import {
  deleteUsers,
  getUsers,
  VerifyUsers,
} from '@/services/UserManagmentServices'
import OrgCard from "@/components/cards/OrgCard";
import {ToastContainer} from "react-toastify";

// Function to define the organization
export default function Organization() {
  const [users, setUsers] = useState()
  const [page, setPage] = useState(1)
  const [ModalOpen, setModalOpen] = useState(false)
  // Get the router
  const imgsrc = 'https://www.maxpixel.net/static/photo/1x/Young-Smile-Portrait-Ai-Generated-Man-Teeth-7833751.jpg';
  const date = new Date()
  const router = useRouter()
  const path = router.pathname
  useEffect(() => {
    const token = localStorage.getItem('AccessToken')
    if (!token) {
      router.push('/')
    } else {
      get_users()
    }
  }, [])

  async function get_users() {
    const { data, status } = await getUsers(page)

    setUsers(data)
    console.log(data)
  }
  async function handleDeleteUser(id) {
    const deleteduser = await deleteUsers(id)

    const { data, status } = await getUsers(page)
    setUsers(data)
  }
  async function handleVerifyUser(id, data2) {
    const verifyUser = await VerifyUsers(id, data2)

    const { data, status } = await getUsers(page)
    setUsers(data)
  }

  // Component return
  return (
    <div className="w-full bg-[#212326] ">
      <Navbar />
      <div className="flex h-fit">
        <div className="min-h-screen  pt-28">
          <NavigationBar WhichActive={'Usermanagement'} />
        </div>
        <div className="min-h-screen w-full  bg-[#292c30] pt-32">
          <div className="flex min-h-full w-full items-start justify-center pt-10 w-full px-8">
              <div className={'flex flex-col w-full'}>
                {users?.map((org,index)=> (
                    <OrgCard data={org} key={index}/>
                ))}
              </div>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  )
}
