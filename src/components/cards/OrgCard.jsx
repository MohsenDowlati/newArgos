import {useRouter} from "next/router";
import React, {useState} from "react";
import http from "@/services/httpService";
import config from "@/services/config.json";
import {getMembers} from "@/pages/dashboard/usermanagment/users";
import {useEffect} from "react";
import UsersData from "@/components/Usermanagment/UsersData";

const OrgCard = (props) => {

    async function get_members() {
        const {data, status} = await getMembers(props.data.id)
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
    const [members , setMembers] = useState(null)
    return(
        <>
            <div className="w-full mx-auto my-2">
                <div
                    className=" bg-white shadow-md border border-gray-200 rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700"
                    onClick={() => setClicked(!clicked)/*router.replace(`/group/enrollment/${props.data.id}`)*/}>
                    <div className="p-6">
                        <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-4 dark:text-white">{props.data.name}</h5>
                        <p className="font-normal text-xl text-gray-700 mb-2 dark:text-gray-400">{props.data.description}</p>
                    </div>
                </div>
            </div>
            <div>
            {clicked &&
                <table>
                <thead>
                <tr className="border-b text-white">
                    <td className="px-20 pb-4">ID</td>
                    <td className="px-20 pb-4">Username</td>
                    <td className="px-20 pb-4">Email</td>
                    <td className="px-20 pb-4">Staff</td>
                    <td className="px-20 pb-4">Verified</td>
                    <td className="px-20 pb-4"></td>
                </tr>
                </thead>
                <tbody>
                {members?.users.map((item) => (
                    <UsersData
                        data={item.user}
                        admin = {item.is_admin}
                        user={item.is_user}
                        key={item.id}
                    />
                ))}
                </tbody>
                </table>}

            </div>
        </>
    )
}

export default OrgCard;