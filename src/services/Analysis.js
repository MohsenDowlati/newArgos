import http from "./httpService";
import config from "./config.json";


export const getCameraData = data => {
    return http.get(`${config.api}/camera/traffic/data/`,{params : {start_date : data.start_date , end_date : data.end_date , camera_id : data.camera_id}})
}
