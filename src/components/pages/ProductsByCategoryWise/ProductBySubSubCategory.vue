<script setup>
import { ref, onMounted, watchEffect } from 'vue';
import ProductCard from '../Products/ProductCard/ProductCard.vue';
import getDataFromCentralApiFile from '@/API/All_API.js';
import { useRoute } from 'vue-router';

// call a variable which name route and initial using vue router 
const route = useRoute();

// find the id from url 
const routeParamsId = ref(Number(route.params.id));

// reactive a variable for store filter data 
const filterProducts = ref([]);

// filter products which id match 
const filterProduct = () => {
    filterProducts.value = products.value.filter(product => product.sub_sub_cat_id === routeParamsId.value);
}

// destructure get api handler for using 
const {getProducts, products} = getDataFromCentralApiFile();

// if use separate api must use watchEffect otherwise you get warning
watchEffect(() => {
    routeParamsId.value = Number(route.params.id);
    filterProduct();
});

// call the api 
onMounted(async () => {
    await getProducts();
    filterProduct();
});

</script>

<template>
    <!-- card section are here  -->
    <section class="card-container">
        <div class="component-info-div">
            <h6><span>{{ filterProducts.length }}</span> Products Found</h6>
            <p>Products > Category > {{ route.params.slug.replaceAll('-', ' ') }}</p>
        </div>
        <div class="row row-cols-1 row-cols-md-4 row-col-lg-4 row-col-sm-1 g-4">
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
h1, h2, h3, h4, h5, h6, p {
    margin: 0;
    padding: 0;
}
.card-container {
    max-width: 1300px;
    margin: auto;
    margin-top: 30px;
}
.component-info-div {
    padding: 11px 10px;
    box-shadow: -2px -6px 12px 20px #F5F5F5;
    box-sizing: border-box;
    margin-bottom: 10px;
    border-radius: 8px;
}
</style>