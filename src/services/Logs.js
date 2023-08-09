import http from "./httpService";
import config from "./config.json";


export const getLogsData = data => {
    return http.get(`${config.api}/camera/logs/data/`,{params : {start_date : data.start_date , end_date : data.end_date , camera_id : data.camera_id}})
}
