<template>
    <div class="sfondo">
        <h1 class="text-center">Login</h1>
        <div class="text-center">
            <form @submit.prevent="onSubmitForm">
                <div class="mb-3">
                    <BaseInput 
                    label="Email"
                    id="email"
                    type="email"
                    placeholder="Inserisci email"
                    v-model="formData.email"
                    required/>
                </div>
                <div class="mb-3">
                    <BaseInput 
                    label="Password"
                    id="password"
                    type="password"
                    placeholder="Inserisci password"
                    v-model="formData.password"
                    required/>
                </div>
                <div class="mb-3">
                    <BaseInput 
                    label="Username"
                    id="username"
                    type="username"
                    placeholder="Inserisci username"
                    v-model="formData.username"
                    required/>
                </div>
                    <BaseButton class="btn btn-primary" type="submit">
                    Accedi</BaseButton>
                
            </form>
        </div>
    </div>
</template>

<script setup>
import BaseInput from '../components/BaseInput.vue';
import BaseButton from '../components/BaseButton.vue';
import { useUserStore } from '../store/UserStore';
import { ref } from 'vue';
import router from '../routes';

const userStore = useUserStore();
const formData = ref({
    email:'',
    password:'',
    username:'',
})


const onSubmitForm = async()=>{
    try {
        await userStore.login(formData.value);
        router.push({name: 'HomePage'})
    } catch (err) {
        
    }
}

</script>

