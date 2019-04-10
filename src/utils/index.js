import axios from 'axios' //引入封装好的axios


const fetch = axios.create({
    baseURL: process.env.BASE_URL
})
//下面的是fetch，然后主要的意思是引用老师的域名
fetch.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response.data
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});
fetch.interceptors.request.use(config => {
    let token = localStorage.getItem('token')
    if (token) {
        config.headers.token = token
        return config
    } else {
        return config
    }
},err=>Promise.reject(err))

export {fetch}