import { defineStore } from 'pinia';
import { User } from '../api/repositories';
import router from '../routes';


export const useUserStore = defineStore('UserStore',{
    state: ()=>({
        accessToken: null,
        user: null,
    }),
    getters:{
        isLoggenIn(){
            return this.user !== null ? true : false;
        },
    },
    actions:{
        async signup(data){
            try {
                const { accessToken, user } = await User.create(data);
                this.accessToken = accessToken;
                this.user = user;
            } catch (error) {
                throw error;
            }
        },
        async login(data){
            try {
                const { accessToken, user } = await User.login(data);
                this.accessToken = accessToken;
                this.user = user;
            } catch (error) {
                throw error;
            }
        },
        logout(){
            this.$reset();
            router.push({name:'loginPage'})
        },
    },
    persist: true
})