<script setup>
import { ref, onMounted, watch } from 'vue';
import ProductCard from '../ProductCard/ProductCard.vue';
import getDataFromCentralApiFile from '@/API/All_API.js';
import { useRoute } from 'vue-router';

const route = useRoute();
const routeParamsId = ref(Number(route.params.id));
const filterProductByParentId = ref([]);

const {getParentCatProducts, parentCatProduct} = getDataFromCentralApiFile();

const filterProduct = () => {
    filterProductByParentId.value = parentCatProduct.value.filter(product => product.parent_cat_id === routeParamsId.value);
}

watch(() => {
    routeParamsId.value = Number(route.params.id);
    filterProduct();
});

onMounted(async () => {
    await getParentCatProducts();
    filterProduct();
});

</script>

<template>
    <section class="card-container">
        <div class="row row-cols-1 row-cols-md-3 g-4">
            <div 
            v-for="(item, index) in filterProductByParentId" 
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