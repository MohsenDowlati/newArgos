import http from "./httpService";
import config from "./config.json";


export const uploadReguest = data => {
    return http.get(`${config.api}/camera/upload/`,{params : {start_date : data.start_date , end_date : data.end_date , camera_id : data.camera_id, email : data.email}})
}
