<script setup>
import { ref, onMounted, watchEffect } from 'vue';
import ProductCard from '../ProductCard/ProductCard.vue';
import getDataFromCentralApiFile from '@/API/All_API.js';
import { useRoute } from 'vue-router';

const route = useRoute();
const routeParamsId = ref(Number(route.params.id));
const filterProducts = ref([]);

const {getProducts, products} = getDataFromCentralApiFile();

const filterProduct = () => {
    filterProducts.value = products.value.filter(product => product.sub_sub_cat_id === routeParamsId.value);
}

// if use separate api must use watchEffect otherwise you get warning
watchEffect(() => {
    routeParamsId.value = Number(route.params.id);
    filterProduct();
});

onMounted(async () => {
    await getProducts();
    filterProduct();
});

</script>

<template>
    <section class="card-container">
        <div class="row row-cols-1 row-cols-md-3 g-4">
            <div 
            v-for="(item, index) in filterProducts" 
            :key="index"
            class="col">
                <ProductCard 
                :productItem="item"
                ></ProductCard>
            </div>
        </div>
    </section>
</template>

<style scoped>
.card-container {
    max-width: 1300px;
    margin: auto;
    margin-top: 30px;
}
</style>