import http from "./httpService";
import config from "./config.json";

export const UploadVideos = data => {
    const formData = new FormData();
    formData.append('video', data);
    const token = localStorage.getItem('AccessToken')
    return http.post(`${config.api}/video/upload`,formData, { headers: {
            Authorization: `Bearer ${token}`,
            'content-type': 'multipart/form-data',
        },});
}