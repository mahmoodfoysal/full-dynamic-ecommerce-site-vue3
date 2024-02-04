<script setup>
import { onMounted } from 'vue';
import ProductCard from '../ProductCard/ProductCard.vue';
import getDataFromCentralApiFile from '@/API/All_API';
import { useRoute } from 'vue-router';

const route = useRoute();
const routeId = Number(route.params.id);
console.log(routeId);

const {getParentCatProducts, parentCatProduct} = getDataFromCentralApiFile();

onMounted(getParentCatProducts);



</script>

<template>
    <section class="card-container">
        <div class="row row-cols-1 row-cols-md-3 g-4">
            <div 
            v-for="(item, index) in parentCatProduct" 
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