import axios from "axios";
let refresh = false;
axios.interceptors.response.use(resp => resp, async error => {
    if (error.response.status === 401 && !refresh) {
        const response = await axios.post('https://testapi.gusarea.com/v1/public/auth/refresh-token', {userName: localStorage.getItem('user'), 
            refreshToken: localStorage.getItem('refreshtoken')});

        if (response.status === 200) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;

            return axios(error.config);
        }
    }
    refresh = false;
    return error;
});