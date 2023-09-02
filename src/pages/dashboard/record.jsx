import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ListBox from '@/components/DropdownBtn/ListDropDown';
import Navbar from '@/components/Navbar/Navbar';
import NavigationBar from '@/components/NavigationSection/NavigationBar';
import { useRouter } from 'next/router';
import { uploadReguest } from '@/services/upload_request';

const Record = () => {
    const router = useRouter();
    const [startdate, setStartdate] = useState(new Date());
    const [enddate, setEnddate] = useState(new Date());
    const [camera_id, setCamera_id] = useState('0');
    const [startTime, setStartTime] = useState('00:00');
    const [endTime, setEndTime] = useState('00:00');
    const [successMessage, setSuccessMessage] = useState(false);
    const [successTime, setSuccessTime] = useState('');

    const userDataString = typeof window !== 'undefined' && localStorage.getItem('User_data');
    const userData = userDataString ? JSON.parse(userDataString) : null;
    const userEmail = userData ? userData.email : ''; 

    useEffect(() => {
        const token = typeof window !== 'undefined' && localStorage.getItem('AccessToken');
        if (!token) {
            router.push('/');
        }
    }, []);

    const canUpload = () => {
        const combinedStartDate = new Date(
            startdate.toISOString().split('T')[0] + 'T' + startTime + ':00'
        );
        const combinedEndDate = new Date(
            enddate.toISOString().split('T')[0] + 'T' + endTime + ':00'
        );

        return (
            camera_id !== '0' && 
            combinedStartDate < combinedEndDate
        );
    };

    const uploadRequest = async () => {
        const combinedStartDate = new Date(
            startdate.toISOString().split('T')[0] + 'T' + startTime + ':00'
        );
        const combinedEndDate = new Date(
            enddate.toISOString().split('T')[0] + 'T' + endTime + ':00'
        );

        const payload = {
            start_date: combinedStartDate.toISOString(),
            end_date: combinedEndDate.toISOString(),
            camera_id: camera_id,
            email: userEmail,
        };

        const { data, status } = await uploadReguest(payload);
        if (status === 200) {
            setSuccessMessage(true);
            const currentTime = new Date().toLocaleTimeString();
            setSuccessTime(currentTime);
        } else {
            console.error("Error upload request:", data.statusText);
        }
    };

    return (
        <div className="w-full bg-[#212326]">
            <Navbar />
            <div className="flex h-fit">
                <div className="min-h-screen pt-28">
                    <NavigationBar WhichActive={'Record'} />
                </div>
                <div className="min-h-screen w-full bg-[#292c30] pt-32">
                    <div className="flex w-full items-center justify-center">
                        <div className="mt-5 flex items-center ">
                            <div className="relative ml-2 rounded-xl border border-white p-3">
                                <p className="absolute -top-3 z-10 bg-[#292c30] px-2 text-sm text-white">
                                    Start Date & Time
                                </p>
                                <DatePicker
                                    selected={startdate}
                                    dateFormat="yyyy-MM-dd HH:mm"
                                    timeIntervals={15}
                                    timeCaption="time"
                                    showTimeSelect
                                    className="z-10 bg-transparent text-white focus:outline-none w-40"
                                    onChange={(Date) => setStartdate(Date)}
                                />
                            </div>
                            <div className="relative ml-2 rounded-xl border border-white p-3">
                                <p className="absolute -top-3 z-10 bg-[#292c30] px-2 text-sm text-white">
                                    End Date & Time
                                </p>
                                <DatePicker
                                    selected={enddate}
                                    dateFormat="yyyy-MM-dd HH:mm"
                                    timeIntervals={15}
                                    timeCaption="time"
                                    showTimeSelect
                                    className="z-10 bg-transparent text-white focus:outline-none w-40"
                                    onChange={(Date) => setEnddate(Date)}
                                />
                            </div>
                            <div>
                                <ListBox setCamera_id={setCamera_id} />
                            </div>
                            <button
                                onClick={uploadRequest}
                                disabled={!canUpload()}
                                className="ml-10 w-[200px] rounded-xl bg-blue-400 p-4 text-white"
                            >
                                Upload Videos
                            </button>
                        </div>
                    </div>
                    {successMessage && (
                        <div className="mb-4 mt-5 text-center bg-white p-3 text-black font-bold">
                            Your video upload request has been processed successfully at {successTime}!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Record;
