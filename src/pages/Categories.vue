<template>
  <div class="sfondo">
    <h1 class="mb-3 text-center">Categoria: {{ $route.params.id }}</h1>
    <section class="text-center">
      <h2 class="mb-3 text-center">Lista Prodotti:</h2>
      <div class="row gx-5">
        <div
          class="col-4 md-3"
          v-for="item in filteredProducts"
          :key="item.id"
        >
          <BaseCard class="card-prodotto">
            <template #media>
              <img 
                style="width: 100px; height: 100px;"
                class="product-image"
                :src="item.image"
                :alt="item.title"
              />
            </template>
            <template #body class="card-body">
              <h5 class="product-title">{{ item.title }}</h5>
              <p class="product-price"> prezzo:{{ item.price }} €</p>
              <div class="d-flex">
                <router-link
                  class="btn btn-primary btn-sm btn-spacing"
                  :to="{ name: 'productPage', params: { id: item.id } }"
                >
                  Visualizza Prodotto
                </router-link>
                <button class="add-to-cart" @click="addToCart(item)">
                  Aggiungi al carrello
                </button>
                <div v-if="addedProductId === item.id" class="card center-card bg-success text-white">
                  <div class="card-body">
                    <h5 class="card-title">Oggetto Aggiunto al Carrello</h5>
                    <span class="checkmark">
                      <i class="bi bi-check-circle-fill"></i>
                    </span>
                  </div>
                </div>
              </div>
            </template>
          </BaseCard>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useProductStore } from '../store/ProductStore';
import { useCartStore } from '../store/CartStore';
import BaseCard from '../components/BaseCard.vue';

const route = useRoute();
const productStore = useProductStore();
const cartStore = useCartStore();

const filteredProducts = ref([]);
const addedProductId = ref(null);

onMounted(async () => {
  await fetchData();
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

watch(() => route.params.id, async (newValue) => {
  await fetchData();
});

async function fetchData() {
  try {
    await productStore.fetchItems();
    const categoryId = productStore.getCategoryIDByName(route.params.id);
    if (categoryId) {
      filteredProducts.value = productStore.getProductsByCategoryID(categoryId);
    }
  } catch (error) {
    throw error;
  }
}

function addToCart(product) {
  cartStore.addToCart(product);
  addedProductId.value = product.id;
}

function handleClickOutside(event) {
  if (!event.target.closest('.center-card')) {
    addedProductId.value = null;
  }
}
</script>



