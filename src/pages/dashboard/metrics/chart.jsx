import { useEffect, useState } from "react";
import { TrafficAction } from "@/actions/TrafficAciton";
import {data} from "autoprefixer";
import {getCameraData} from "@/services/Analysis";

export default function Chart() {
    const [traffic, setTraffic] = useState([]);

    const directions = [
        '3rd Ave S',
        '3rd Ave N',
        'W Adams St W',
        'W Adams St E'
    ];

    const routes = [];
    const times = [];
    const chartData = {};

    function createDirections(directions) {


        console.log(routes);
    }

    async function GetTraffic(start, end, camId){
        const {data, status} = await getCameraData({
            start_date: start,
            end_date: end,
            camera_id: camId
        })
        setTraffic(data)
    }

    useEffect(() => {

        // create directions
        createDirections(directions);

        //send request
        GetTraffic(
            "2023-07-20T09:03:32.000Z",
            "2023-08-05T09:03:32.104Z",
            "ARGv30001"
        )

    }, []);

    useEffect(() => {

        if (traffic !== null) {
            console.log("run chart function")
            handleCreateTrafficChart(directions);
        }
    }, [traffic]);

    function handleCreateTrafficChart(directions) {

        for (let i = 0; i < directions.length; i++) {
            for (let j = 0; j < directions.length; j++) {
                if (i !== j) {
                    routes.push(directions[i] + '->' + directions[j]);
                }
            }
        }

        for (let direction of routes) {
            chartData[direction] = [];
        }

        for (let index in traffic) {

            // create list times
            times.push(traffic[index].date_time_Record);


            for (let route of routes) {
                try {
                    chartData[route].push(index["area_counts"]["2"][routes[route]]);
                } catch (error) {
                    console.log(error)
                    chartData[route].push(0);
                }
            }
        }
        console.log(chartData)
        console.log(times);

    }


    return <></>;
}