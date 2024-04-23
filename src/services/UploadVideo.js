import http from "./httpService";
import config from "./config.json";

export const UploadVideos = data => {
    const formData = new FormData();
    formData.append('file', data);
    formData.append('fileName', data.name);
    const token = localStorage.getItem('AccessToken')
    return http.post(`${config.api}/video/upload`,formData, { headers: {
            Authorization: `Bearer ${token}`,
            'content-type': 'multipart/form-data',
        },});
}