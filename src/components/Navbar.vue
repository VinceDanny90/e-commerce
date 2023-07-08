<template>
  <header class="text-center text-lg-start text-white header-navbar">
    <nav class="navbar navbar-expand-lg text-center text-lg-start text-white">
      <header class="container-fluid">
        <div class="navbar navbar-expand-lg container">
          <ul class="navbar-nav me-auto mb-2 mb-lg-g">
            <li class="nav-item">
              <RouterLink class="nav-link text-white" to="/:id?">Home Page</RouterLink>
            </li>

            <li v-for="category in categoriesStore.categories" :key="category.name" class="nav-item">
              <RouterLink class="nav-link text-white" :to="{name:'categories',params:{id:category.name}}">{{ category.name }}</RouterLink>
            </li>

            <li v-if="!userStore.isLoggenIn" class="nav-item">
              <RouterLink class="nav-link text-white" to="/signUpPage">Registrazione</RouterLink>
            </li>

            <li v-if="!userStore.isLoggenIn" class="nav-item">
              <RouterLink class="nav-link text-white" to="/LoginPage">Login</RouterLink>
            </li>

            <li v-if="userStore.isLoggenIn">
              <RouterLink class="nav-link text-white" to="/dashboard">DashBoard</RouterLink>
            </li>
          </ul>

          <ul class="navbar-nav me-auto mb-2 mb-lg-g">
            <li class="nav-item">
              <RouterLink class="nav-link text-white" to="/carrello">Carrello ({{ cartNumber }})</RouterLink>
            </li>
          </ul>

          <div class="search-bar">
            <div class="search-input">
              <input class="searchBar" type="search" v-model="searchQuery" @input="handleInput" placeholder="Cerca prodotti" />
              <ul v-if="showResults" class="search-results">
                <li v-for="product in searchResults" :key="product.id">
                  <RouterLink :to="`/product/${product.id}`" @click="handleProductClick">
                    <div class="product-item-searchBar">
                      <img :src="product.image" alt="Product Image-searchBar" />
                      <div class="product-info-searchBar">
                        <p class="product-title-searchBar">{{ product.title }}</p>
                      </div>
                    </div>
                  </RouterLink>
                </li>
              </ul>
            </div>
          </div>

          <BaseButton v-if="userStore.isLoggenIn" class="Btn btn-secondary" @click="userStore.logout()">
            Logout
          </BaseButton>
        </div>
      </header>
    </nav>
  </header>
</template>

<script setup>
import { onMounted, ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useCategoriesStore } from '../store/CategoriesStore';
import { useUserStore } from '../store/UserStore';
import BaseButton from '../components/BaseButton.vue';
import axios from 'axios';
import { useCartStore } from '../store/CartStore';

const categoriesStore = useCategoriesStore();
const userStore = useUserStore();
const cartStore = useCartStore();

const searchQuery = ref('');
const searchResults = ref([]);
const showResults = ref(false);
const selectedProductId = ref('');

const router = useRouter();

const handleInput = async () => {

  selectedProductId.value = ''; 

  if (searchQuery.value.length >= 3) {
    try {
      const response = await axios.get(`http://localhost:3000/product?q=${searchQuery.value}`);
      searchResults.value = response.data;
      showResults.value = true;
    } catch (error) {
      console.error(error);
    }
  } else {
    searchResults.value = [];
    showResults.value = false;
  }
};
const handleProductClick = () => {
  searchQuery.value = ''; 
  showResults.value = false; 
};

watch(searchQuery, handleInput);

onMounted(() => {
  categoriesStore.readCategory();
});

const cartNumber = computed(() => cartStore.getCartNumber);

watch(selectedProductId, (newValue) => {
  if (newValue !== '') {
   
    router.push(`/product/${newValue}`);
  }
});
</script>

<style scoped>


</style>
