import Navbar from "@/components/Navbar/Navbar";
import NavigationBar from "@/components/NavigationSection/NavigationBar";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {ToastContainer , toast} from "react-toastify";
import RegionSelect from "react-region-select";

const Region = () => {
    //initialize variables
    const router = useRouter();

    const [regionsNew, setRegionsNew] = useState([]);
    const [img , setImg] = useState(null);


    useEffect(() => {
        const token = localStorage.getItem('AccessToken')
        if(!token){
            router.push('/')
        }

    }, []);


    const regionStyle = {
        background: "rgba(50,79,96,0.7)"
    };
    const onChange = (regions) => setRegionsNew(regions);


    return (
        <div className="w-full bg-main">
            <Navbar />
            <div className="flex h-full">
                <div className="min-h-screen pt-28">
                    <NavigationBar WhichActive={'Record'} />
                </div>
            <div className={"flex items-center justify-center w-full flex-row"}>
                <div className={"flex items-center justify-center w-full flex-col"}>
                    <p className={"mb-3 font-sans text-lg font-semibold text-white2"}> Upload your image here. </p>
                    <label>
                        <input type="file" placeholder="Upload video" className={"bg-white2 border-0 rounded-[50px] py-[12px] px-[15px] my-[8px] w-full text-center"} onChange={(e)=>setImg(e.target.files[0])}/>
                    </label>
                    <button className={"mt-10 bg-second text-white2 py-1 px-2 w-40 h-10 font-sans text-lg font-semibold text-white2 shadow-md rounded-md"} onClick={()=>{
                        console.log(regionsNew)}}>Upload</button>
                </div>

                <div style={{ flexGrow: 1, flexShrink: 1, width: "50%" }}>
                    <RegionSelect
                        regions={regionsNew}
                        regionStyle={regionStyle}
                        constraint
                        onChange={onChange}
                        style={{ border: "1px solid black" }}
                    >
                        <img
                            alt="Coca cola"
                            style={{ width: "300px", height: "300px" }}
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Coca-Cola_bottle_cap.svg/1200px-Coca-Cola_bottle_cap.svg.png"
                        />
                    </RegionSelect>
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
        </div>
    );
}

export default Region;