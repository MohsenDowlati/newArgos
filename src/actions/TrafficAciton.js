import {getCameraData} from "@/services/Analysis";

export const TrafficAction = async (start, end, camId) => {
    const {data, status} = await getCameraData({
        start_date: start,
        end_date: end,
        camera_id: camId
    })

    console.log("action:  ", data)

    return data
}