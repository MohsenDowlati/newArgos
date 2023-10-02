import http from "@/services/httpService";
import config from "@/services/config.json";

export const getMembers = id =>{
    const token = localStorage.getItem('AccessToken')
    return http.get(`${config.api}/group/enrollment/${id}`, { headers: {
            Authorization: `Bearer ${token}`,
        },})
}