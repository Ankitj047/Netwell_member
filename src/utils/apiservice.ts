import axios, { AxiosInstance } from 'axios';


class ApiService {
    private axiosInstance: AxiosInstance;
    constructor() {
        this.axiosInstance = axios.create();

        // this.axiosInstance.interceptors.request.use((config) => {
        //     if (process.env.REACT_APP_BUILD == 'prod') {
        //         config.headers.Authorization = 'Bearer ' + localStorage.getItem('bearerToken');
        //     }
        //     return config;
        // })
        this.axiosInstance.interceptors.response.use((resp: any) => {
            return resp
        }, (error) => {

            if (error && error.response && error.response.status && 401 === error.response.status) {
                console.log("Session Expired")
                //window.location = '/login'
            } else {
                return Promise.reject(error);
            }
        });
    }

    get(url: string, disableconfg?: boolean) {
        let _confg: any = {}
        if (!disableconfg) {
            _confg = this.getConfig();
        }
        return this.axiosInstance.get(url, _confg);
    }

    post(url: string, data?: any, disableconfg?: boolean) {
        let _confg: any = {}
        if (!disableconfg) {
            _confg = this.getConfig();
        }

        return this.axiosInstance.post(url, data, _confg);
    }

    private getConfig() {
        var config;
        config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('bearerToken')
            }
        }
        // if (process.env.REACT_APP_BUILD == 'prod' || true) {
        //     config = {
        //         headers: {
        //             Authorization: 'Bearer ' + localStorage.getItem('bearerToken')
        //         }
        //     }
        // } else if (process.env.REACT_APP_BUILD == 'dev') {
        //     config = {}
        // }
        return config;
    }


}
export default new ApiService;
