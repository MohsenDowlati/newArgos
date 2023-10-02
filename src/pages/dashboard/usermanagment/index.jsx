// Import
import { ToastContainer, toast } from 'react-toastify'
import { successToaster } from '@/components/toasters'
import { AiOutlinePlus } from 'react-icons/ai'
import PageTitle from '@/components/pageTitle'
import { useState, useEffect } from 'react'
import Sidebar from '@/components/sidebar'
import { IconContext } from 'react-icons'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import React from 'react'
import { GiBleedingEye } from 'react-icons/gi'
import { HiOutlineStatusOnline } from 'react-icons/hi'
import NavigationBar from '@/components/NavigationSection/NavigationBar'
import Navbar from '@/components/Navbar/Navbar'
import {
  deleteUsers,
  getUsers,
  VerifyUsers,
} from '@/services/UserManagmentServices'
import UsersData from '@/components/Usermanagment/UsersData'
import CreateUserModal from '@/components/Modals/CreateUser'
import OrgCard from "@/components/cards/OrgCard";

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
        <div className="  min-h-screen  pt-28   ">
          <NavigationBar WhichActive={'Usermanagement'} />
        </div>
        <div className="min-h-screen w-full  bg-[#292c30] pt-32">
          <div className="flex min-h-full w-full items-start justify-center pt-10">
            <div>
              <div className={'flex-col'}>
                {users?.map((org,index)=> (
                    <OrgCard data={org} key={index}/>
                ))}
              </div>

              <CreateUserModal
                getusers={get_users}
                setModalOpen={setModalOpen}
                ModalOpen={ModalOpen}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
