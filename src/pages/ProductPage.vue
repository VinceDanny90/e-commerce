<template>
  <div class="sfondo" v-if="product">
    <h1 class="mb-3 text-center">Prodotto: {{ product.title }}</h1>
    <div class="container-lg flex justify-content">
      <img style="width: 350px; height: 350px;" class="rounded mx-auto d-block" :src="product.image" :alt="product.title" />
      <p>{{ product.description }}</p>
      <div class="container">
        <div class="row justify-content-md-center">
          <div class="col col-lg-2">
            Prezzo: {{ product.price }}€
          </div>
          <button class="add-to-cart" @click="addToCart(product)">
            Aggiungi al carrello
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useProductStore } from '../store/ProductStore';
import { useCartStore } from '../store/CartStore';

const route = useRoute();
const productStore = useProductStore();
const cartStore = useCartStore();

const product = ref(null);

const fetchProduct = async (id) => {
  try {
    await productStore.fetchID(id);
    product.value = productStore.product;
  } catch (error) {
    throw error;
  }
};

onMounted(() => {
  fetchProduct(route.params.id);
});

watch(
  () => route.params.id,
  (newId) => {
    fetchProduct(newId);
  }
);

const addToCart = (product) => {
  cartStore.addToCart(product);
};
</script>




