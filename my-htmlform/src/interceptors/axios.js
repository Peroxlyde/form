import axios from "axios";
//import {default as tokens} from '../components/myLogin.vue'
let refresh = false;
//let mytoken = tokens.token
axios.interceptors.response.use(resp => resp, async error => {
    if (error.response.status === 401 && !refresh) {
        refresh = true;
        const response = await axios.post('https://testapi.gusarea.com/v1/public/auth/refresh-token', {userName: sessionStorage.getItem('user'), 
            refreshToken: sessionStorage.getItem('refreshtoken')});

        if (response.status === 200) {
            //axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
            sessionStorage.setItem('accesstoken',response.data.accessToken)
            //mytoken = response.data.accessToken
            sessionStorage.setItem('refreshtoken',response.data.refreshToken)
            return axios(error.config);
        }
    }
    refresh = false;
    return error;
});

axios.interceptors.request.use(config => {
    if (config.url.includes('private')) {
      config.headers.Authorization = `Bearer ${sessionStorage.getItem('accesstoken')}`;
      //config.headers.Authorization = `Bearer ${mytoken}`;
    }
    return config;
  }, error => Promise.reject(error));