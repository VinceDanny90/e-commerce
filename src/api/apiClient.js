import axios from 'axios'
import router from '../routes';
import { useUserStore } from '../store/UserStore';



const istance =axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 1000,
});

istance.interceptors.request.use(
    function(config){
        const UserStore =useUserStore();
        if (UserStore.accessToken){
            config.headers.Authorization= `Bearer ${ UserStore.accessToken }`
        }
        return config;
    },
    function(error){
        return Promise.reject(error)
    }
);

istance.interceptors.response.use(
    function (response){
        return response;
    },
    function (error){
        if(error.response.status === 404){
            router.push({name: 'NotFound'})
        }else if(error.response.status ===401){
            router.push({name: 'LoginPage'})
        }
        return Promise.reject(error);
    }
)



export default istance