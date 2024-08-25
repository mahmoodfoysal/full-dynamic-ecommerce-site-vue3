<script setup>
import { ref } from 'vue'

const emit = defineEmits(['brand-select']);

const brandName = [
    { id: 'bata', label: 'Bata', value: 'Bata', name: 'Bata' },
    { id: 'apex', label: 'Apex', value: 'Apex', name: 'Apex' },
    { id: 'nike', label: 'Nike', value: 'Nike', name: 'Nike' },
    { id: 'adidas', label: 'Adidas', value: 'Adidas', name: 'Adidas' },
    { id: 'easy', label: 'Easy', value: 'Easy', name: 'Easy' },
    { id: 'one-plus', label: 'One Plus', value: 'One plus', name: 'onePlus' },
    { id: 'realme', label: 'Realme', value: 'realme', value: 'Realme' },
];

const selectedBrand = ref([]);

const handleBrandChange = () => {
    emit('brand-select', selectedBrand.value);
}

</script>

<template>
    <section class="price-section">
        <label :for="brand.id" v-for="(brand, index) in brandName" :key="index" class="d-flex align-items-center mb-2">
            <input v-model="selectedBrand" type="checkbox" :id="brand.id" :value="brand.name" :name="brand.name"
                @change="handleBrandChange">
            <p class="ms-2">{{ brand.label }}</p>
        </label>
    </section>
</template>

<style scoped>
h1,
h2,
h3,
h4,
h5,
h6,
p {
    margin: 0;
    padding: 0;
}


.price-section div,
input,
p {
    cursor: pointer;
}

.price-section {
    height: 230px !important;
    overflow-y: scroll;
}

.price-section p, input {
    font-family: "Poppins", sans-serif;
    font-weight: 400;
    font-style: normal;
}
</style>