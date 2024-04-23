import ListBox from '@/components/DropdownBtn/ListDropDown'
import Navbar from "@/components/Navbar/Navbar";
import NavigationBar from "@/components/NavigationSection/NavigationBar";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {ToastContainer , toast} from "react-toastify";
import {UploadVideos} from "@/services/UploadVideo";

const UploadVideo = () => {

    //intialize variables
    const router = useRouter();

    const [video, setVideo] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('AccessToken')
        if(!token){
            router.push('/')
        }

    }, []);

    const handleAnalyze = () => {
        post_video(video);
    }

    async function post_video(input) {
        try {
            const {data,status} = await UploadVideos(input);
            if (status!==200){
                toast("something went wrong. status: "+status)
            } else {
                console.log(data)
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="w-full bg-main">
            <Navbar />
            <div className="flex h-full">
                <div className="min-h-screen pt-28">
                    <NavigationBar WhichActive={'Camera'} />
                </div>
                <div className={"flex items-center justify-center w-full flex-col"}>
                    <p className={"mb-3 font-sans text-lg font-semibold text-white2"}> Upload your video here. </p>
                    <label>
                        <input type="file" placeholder="Upload video" className={"bg-white2 border-0 rounded-[50px] py-[12px] px-[15px] my-[8px] w-full text-center"} onChange={(e)=>setVideo(e.target.files[0])}/>
                    </label>
                    <button className={"mt-10 bg-second text-white2 py-1 px-2 w-40 h-10 font-sans text-lg font-semibold text-white2 shadow-md rounded-md"} onClick={handleAnalyze}>Upload</button>
                </div>

            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    );
}

export default UploadVideo;