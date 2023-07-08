<template >
  <div class="sfondo">
    <h1 class="mb-3 text-center">Homepage</h1>
    <section class="text-center">
      <h2 class="mb-3 text-center">Lista Prodotti:</h2>
      <div class="row gy-4">
        <div
          class="col-4  md-3"
          v-for="product in productStore.products"
          :key="product.id"
        >
          <BaseCard
             class="card-prodotto"
            ref="card"
            @click.stop
          >
            <template #media>
              <img
                style="width: 100px; height: 100px;"
                class="product-image"
                :src="product.image"
                :alt="product.title"
              />
            </template>
            <template #body>
              <h5 class="product-title">{{ product.title }}</h5>
              <p class="product-price"> prezzo:{{ product.price }} €</p>
              <div class="d-flex">
                <RouterLink
                  class="btn btn-primary btn-sm btn-spacing"
                  :to="{ name: 'productPage', params: { id: product.id } }"
                >
                  Visualizza Prodotto
                </RouterLink>
                <button
                  class="add-to-cart"
                  @click="addToCart(product)"
                >
                  Aggiungi al carrello
                </button>           
            </div>
            <div v-if="addedProductId === product.id" class="card center-card bg-success">
                  <div class="card-body d-flex flex-column justify-content-center align-items-center">
                    <h5 class="card-title">Oggetto Aggiunto al Carrello </h5>
                    <span class="checkmark">
                      <i class="bi bi-check-circle-fill"></i>
                    </span>
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
import { onMounted, ref, onUnmounted } from 'vue';
import { useProductStore } from '../store/ProductStore';
import { useCartStore } from '../store/CartStore';
import BaseCard from '../components/BaseCard.vue';


const productStore = useProductStore();
const cartStore = useCartStore();
const addedProductId = ref(null);


onMounted(() => {
    productStore.fetchItems();
    document.addEventListener('click', handleClickOutside);
})


const addToCart = (product) => {
    cartStore.addToCart(product);
    addedProductId.value = product.id;
  };

  const handleClickOutside = (event) => {
  if (!event.target.closest('.center-card')) {
    addedProductId.value = null;
  }
};

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>


