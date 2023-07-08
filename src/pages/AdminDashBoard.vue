<template>
    <h1>DashBoard</h1>
    <p>Benvenuto {{ userStore.user.username }} 😄</p>

    <div class="mt-3">
        <RouterLink class="btn btn-primary" :to="{name: 'AdminProductPage'}">Gestisci Prodotti</RouterLink>

    </div>
</template>

<script setup>

import { useUserStore } from '../store/UserStore';


const userStore = useUserStore();

</script>

