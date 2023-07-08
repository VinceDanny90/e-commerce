<template>
    <h1>Aggiungi Un Nuovo Prodotto</h1>
    <section class="mt-3">
        <form @submit.prevent="onSubmitForm">
            <div class="mb-3">
                <BaseInput
                label="nome prodotto"
                id="title"
                type="text"
                placeholder="Inserisci nome prodotto"
                v-model="formData.title"/>
             </div>
             <div class="mb-3">
                <BaseInput
                label="prezzo"
                id="price"
                type="number"
                placeholder="Inserisci prezzo"
                v-model="formData.price"/>
             </div>
             <div class="mb-3">
                <div class="mb-3">
                    <label for="description" class="form-label">Descrizione</label>
                    <textarea class="form-control small-textaea" id="description" rows="3" v-model="formData.description" placeholder="Inserisci descrizione"></textarea>
                </div>

                
            </div>
            <div class="mb-3">
                <BaseInput
                label="immagine"
                    id="image"
                    accept="image/*"
                    type="file"
                    placeholder="Inserisci immagine"
                    v-model="formData.image"
                    :ref="imageInputRef"
                    @change="imageUpload"
                />
            </div>
             <div class="mb-3">
                <BaseButton class="btn-primary" type="submit">Crea Prodotto</BaseButton>
             </div>
        </form>
    </section>
</template>

<script setup>
import BaseInput from '../components/BaseInput.vue';
import BaseButton from '../components/BaseButton.vue';
import { ref } from 'vue';
import { useProductStore } from '../store/ProductStore';

const formData = ref({
    title: '',
    price: '',
    description: '',
    image: '',
})
const productStore = useProductStore();
const imageInputRef = ref(null);

const onSubmitForm = () =>{
    productStore.addProduct(formData.value)
    formData.value.title = '';
    formData.value.price = '';
    formData.value.description='';
    formData.value.image='';
}

const imageUpload = () => {
  const file = imageInputRef.value.files[0];
  formData.value.image = file;
};

</script>

<style scoped>
.small-textaea {
  width: 20%; 
}


</style>