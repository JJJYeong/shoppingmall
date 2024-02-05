import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: import.meta.env.PROD ? '' : 'http://localhost:4000'
});

//요청 보내기 전 토큰 세팅
axiosInstance.interceptors.request.use(function(config) {
    config.headers.Authorization = 'Bearer ' + localStorage.getItem('accessToken');
    return config;
}, function(error) {
    return Promise.reject(error);
});

//토큰 만료 시 리로드
axiosInstance.interceptors.response.use(function(response) {
    return response;
}, function(error) {
    if(error.response.data === 'jwt expired') {
        window.location.reload();
    }
});

export default axiosInstance