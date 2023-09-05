// Imports
import React, { useState, useEffect, useRef } from 'react';
import ListBox from '@/components/DropdownBtn/ListDropDown';
import Navbar from '@/components/Navbar/Navbar';
import NavigationBar from '@/components/NavigationSection/NavigationBar';
import { useRouter } from 'next/router';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getCameraData } from '@/services/Analysis';
import {HeatMapGrid } from 'react-grid-heatmap';

const Heatmap = () => {
    const router = useRouter();
    const [startdate, setStartdate] = useState(new Date());
    const [enddate, setEnddate] = useState(new Date());
    const [camera_id, setCamera_id] = useState('0');
    const [combinedHeatmap, setCombinedHeatmap] = useState([]);
    const [backgroundImage, setBackgroundImage] = useState(null);
    

    useEffect(() => {
        const token = localStorage.getItem('AccessToken');
        if (!token) {
            router.push('/');
        }
    }, []);


    async function getCameraLogs() {

        const payload = {
            start_date: startdate.toISOString().slice(0, 19),
            end_date: enddate.toISOString().slice(0, 19),
            camera_id: camera_id,
        };

        const { data, status } = await getCameraData(payload);

        let summedHeatmap = [];
        data.forEach((element) => {
            const heatmap = element.heatmap;
            if (!summedHeatmap.length) {
                summedHeatmap = heatmap;
            } else {
                // iterate over each item in the array
                for (let i = 0; i < heatmap.length; i++ ) {
                  for (let j = 0; j < heatmap[i].length; j++ ) {
                    summedHeatmap[i][j]+=heatmap[i][j]
                  }
                }
            }
        });
        try {
            const response = await fetch(`https://api.argos.vision/api/v1/camera/conf/satelite/?camera_id=${camera_id}`);
            
            if (!response.ok) {
                console.error("Error fetching image:", response.statusText);
                return;
            }

            const data = await response.json();
            setBackgroundImage("data:image/jpeg;base64," + data.image);
        } catch (error) {
            console.error("Error occurred:", error);
        }
        setCombinedHeatmap(summedHeatmap);
    }

    return (
        <div className="w-full bg-[#212326] ">
            <Navbar />
            <div className="flex h-fit">
                <div className="min-h-screen pt-28">
                    <NavigationBar WhichActive={'Heatmap'} />
                </div>
                <div className="min-h-screen w-full bg-[#292c30] pt-32">
                    <div className="flex w-full items-center justify-center">
                        <div className="mt-5 flex items-center ">
                            <div className="relative rounded-xl border border-white p-3">
                                <p className="absolute -top-3 z-10 bg-[#292c30] px-2 text-sm text-white">
                                    Start date
                                </p>
                                <DatePicker
                                    selected={startdate}
                                    dateFormat={'yyyy-MM-dd'}
                                    onChange={(Date) => setStartdate(Date)}
                                    className="z-10 bg-transparent text-white focus:outline-none"
                                />
                            </div>
                            <div className="relative ml-2 rounded-xl border border-white p-3">
                                <p className="absolute -top-3 z-10 bg-[#292c30] px-2 text-sm text-white">
                                    End date
                                </p>
                                <DatePicker
                                    selected={enddate}
                                    dateFormat={'yyyy-MM-dd'}
                                    onChange={(Date) => setEnddate(Date)}
                                    className="z-10 bg-transparent text-white focus:outline-none"
                                />
                            </div>
                            <div>
                                <ListBox setCamera_id={setCamera_id} />
                            </div>
                            <button
                                onClick={getCameraLogs}
                                className="ml-10 w-[200px] rounded-xl bg-blue-400 p-4 text-white"
                            >
                                Generate Heatmap
                            </button>
                        </div>
                    </div>
                    <div className="mt-10 flex w-full justify-center ">
                    {combinedHeatmap && (
                    <div style={{
                        marginTop: 0,
                        width: 900,
                        height: 500, // or imageDimensions.height if you prefer,
                        backgroundImage: `url(${backgroundImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center center'
                    }}>
                        <HeatMapGrid
                        data={combinedHeatmap}
                        cellRender={(x, y, value) => (
                            <div title={`Pos(${x}, ${y}) = ${value}`}>{value}</div>
                        )}
                        xLabelsStyle={(index) => ({
                            color: index % 2 ? 'transparent' : '#777',
                            fontSize: '.8rem'
                        })}
                        yLabelsStyle={() => ({
                            fontSize: '.7rem',
                            textTransform: 'uppercase',
                            color: '#777'
                        })}
                        cellStyle={(_x, _y, ratio) => ({
                            background: `rgb(100, 160, 44, ${ratio})`,
                            fontSize: '.8rem',
                            color: `rgb(255, 255, 255)`
                        })}
                        cellHeight='3.47rem'
                        xLabelsPos='bottom'
                        yLabelsPos='right'
                        />
                    </div>
                    )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Export the Dashboard page
export default Heatmap;
