import http from "@/services/httpService";
import config from "@/services/config.json";

export const getMembers = id =>{
    const token = localStorage.getItem('AccessToken')
    return http.get(`${config.api}/group/enrollment/${id}`, { headers: {
            Authorization: `Bearer ${token}`,
        },})
}

export const changeRolls = (data) => {
    if (!data.is_user && data.is_admin) {
        console.log('Admin but not user');
    } else {
    const token = localStorage.getItem('AccessToken');
    return http.put(`${config.api}/group/roll/change/`, data , {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    }
}