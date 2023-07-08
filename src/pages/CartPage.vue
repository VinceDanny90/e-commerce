<template>
  <section class="h-100 h-custom cart">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12">
          <div class="card card-registration card-registration-2" style="border-radius: 15px;">
            <div class="card-body p-0">
              <div class="row g-0">
                <div class="col-lg-8">
                  <div class="p-5">
                    <div class="d-flex justify-content-between align-items-center mb-5">
                      <h1 class="fw-bold mb-0 text-black">Shopping Cart</h1>
                      <h6 class="mb-0 text-muted">{{ cartItems.length }} items</h6>
                    </div>
                    <hr class="my-4">

                    <div v-for="item in cartItems" :key="item.id" class="row mb-4 d-flex justify-content-between align-items-center">
                      <div class="col-md-2 col-lg-2 col-xl-2">
                        <img :src="item.image" class="img-fluid rounded-3" :alt="item.title">
                      </div>
                      <div class="col-md-3 col-lg-3 col-xl-3">
                        <h6 class="text-muted">{{ item.title }}</h6>
                      </div>
                      <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                        <button class="btn btn-link px-2" @click="decreaseQuantity(item)">
                          <i class="fas fa-minus"></i>
                        </button>
                        <input min="0" v-model.number="item.qty" type="number" class="form-control form-control-sm" />
                        <button class="btn btn-link px-2" @click="increaseQuantity(item)">
                          <i class="fas fa-plus"></i>
                        </button>
                      </div>
                      <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                        <h6 class="mb-0">€ {{ item.price * item.qty }}</h6>
                        <button @click="deleteItem(item)" class="btn btn-danger">X</button>
                      </div>
                      <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                        <a href="#!" class="text-muted"><i class="fas fa-times"></i></a>
                      </div>
                    </div>

                    <hr class="my-4">

                    <div class="row mb-4 d-flex justify-content-between align-items-center">
                      <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                        <a href="#!" class="text-muted"><i class="fas fa-times"></i></a>
                      </div>
                    </div>

                    <div class="pt-5">
                      <RouterLink to="/" class="mb-0"><a href="#!" class="text-body"><i class="fas fa-long-arrow-alt-left me-2"></i>Torna allo shop</a></RouterLink>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4 bg-grey">
                  <div class="p-5">
                    <h3 class="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                    <hr class="my-4">

                    <div v-for="item in cartItems" :key="item.id" class="d-flex justify-content-between mb-4">
                      <h5 class="text-uppercase">{{ item.qty }}</h5>
                      <h5>€ {{ item.price * item.qty }}</h5>
                    </div>

                    <h5 class="text-uppercase mb-3">Shipping</h5>

                    <div class="mb-4 pb-2">
                      <select class="select">
                        <option value="1">Standard-Delivery- €5.00</option>
                        <option value="2">Express- €7.50</option>
                      </select>
                    </div>

                    <h5 class="text-uppercase mb-3">Give code</h5>

                    <div class="mb-5">
                      <div class="form-outline">
                        <input type="text" id="form3Examplea2" class="form-control form-control-lg" />
                        <label class="form-label" for="form3Examplea2">Enter your code</label>
                      </div>
                    </div>

                    <hr class="my-4">

                    <div class="d-flex justify-content-between mb-5">
                      <h5 class="text-uppercase">Total price</h5>
                      <h5>€ {{ calculateTotalPrice() }}</h5>
                    </div>

                    <button type="button" class="btn btn-dark btn-block btn-lg" data-mdb-ripple-color="dark">CheckOut</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useCartStore } from '../store/CartStore';
import { onMounted, ref } from 'vue';

const cartStore = useCartStore();
const cartItems = ref([]);
const emptyCartMessage = ref('');

const deleteItem = (item) => {
  if (item.qty > 1) {
    item.qty--;
  } else {
    const index = cartItems.value.indexOf(item);
    cartItems.value.splice(index, 1);
  }
};

const decreaseQuantity = (item) => {
  if (item.qty > 0) {
    item.qty--;
  }
};

const increaseQuantity = (item) => {
  item.qty++;
};

const calculateTotalPrice = () => {
  let total = 0;
  for (const item of cartItems.value) {
    total += item.price * item.qty;
  }
  return total;
};

onMounted(async () => {
  try {
    await cartStore.readCart();
    cartItems.value = cartStore.cart;
  } catch (error) {
    throw error;
  }
});
</script>


