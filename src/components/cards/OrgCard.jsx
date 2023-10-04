import {useRouter} from "next/router";
import React, {useState} from "react";
import {changeRolls, getMembers} from "@/pages/dashboard/usermanagment/users";
import {useEffect} from "react";
import UsersData from "@/components/Usermanagment/UsersData";
import {IoMdArrowDropup , IoMdArrowDropright} from 'react-icons/io'
import {AiOutlineUserAdd} from 'react-icons/ai'
const OrgCard = (props) => {

    async function get_members() {
        const {data, status} = await getMembers(props.data.id)
        console.log(data)
        setMembers(data)
    }

    async function handleVerifyUser(data2) {
        const verifyUser = await changeRolls(data2)

        const { data, status } = await getMembers(props.data.id)
        console.log(data)
        setMembers(data)
    }


    useEffect(() => {
        const token = localStorage.getItem('AccessToken')
        if (!token) {
            router.push('/')
        } else {
            get_members()
        }
    }, [])


    const router =  useRouter();

    const [clicked , setClicked] = useState(false);
    const [members , setMembers] = useState(null);
    //return component
    return(
        <div className={'w-full'}>
            <div className="w-full mx-auto my-2">
                <div
                    className="w-full bg-white shadow-md border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 flex flex-row"
                    onClick={() => setClicked(!clicked)}>
                    <div className="w-full py-5 px-[50px]">
                        <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-4 dark:text-white">{props.data.name}</h5>
                        <p className="font-normal text-xl text-gray-700 mb-2 dark:text-gray-400">{props.data.description}</p>
                    </div>
                    <div className={'flex justify-end items-center p-6'}>
                        {clicked ? <IoMdArrowDropup className=" h-[40px] w-[40px]"/> :
                                    <IoMdArrowDropright className=" h-[40px] w-[40px]"/>}
                    </div>
                </div>
            </div>

            {clicked &&
                <div className={'flex justify-center my-5 p-6 flex-col swing-in-top-fwd'}>
                <table className={'mb-4'}>
                <thead>
                <tr className="border-b text-white">
                    <td className="px-20 pb-4">ID</td>
                    <td className="px-20 pb-4">Username</td>
                    <td className="px-20 pb-4">Email</td>
                    <td className="px-20 pb-4">Admin</td>
                    <td className="px-20 pb-4">User</td>
                    <td className="px-20 pb-4"></td>
                </tr>
                </thead>
                <tbody>
                {members?.users.map((item) => (
                    <UsersData
                        data={item.user}
                        admin = {item.is_admin}
                        user={item.is_user}
                        handleVerifyUser={handleVerifyUser}
                        orgID={props.data.id}
                        key={item.id}
                    />
                ))}
                </tbody>
                </table>
                    {/*TODO: handle new members*/}
                    <div className={'static right-0 flex flex-row bg-green-400 w-fit px-4 py-1.5 justify-center items-center rounded-lg transition-opacity hover:opacity-80 cursor-pointer'}>
                        <p className={'text-base p-0 mr-2'}>Add a new Member</p>
                        <AiOutlineUserAdd className={'h-[37px] w-[37px]'}/>
                    </div>
            </div>}
        </div>
    )
}

export default OrgCard;