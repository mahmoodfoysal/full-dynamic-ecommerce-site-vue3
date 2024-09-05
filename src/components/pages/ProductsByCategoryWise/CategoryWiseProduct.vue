<script setup>
import { ref, toRefs, onMounted, watchEffect, computed } from 'vue';
import ProductCard from '../Products/ProductCard/ProductCard.vue';
import { useRoute } from 'vue-router';
import PriceFilter from '../Filters/PriceFilter.vue';
import BrandFilter from '../Filters/BrandFilter.vue';
import { getProducts } from '@/API/All_API.js';

const props = defineProps({
    searchData: {
        type: String,
        default: ''
    }
});
const { searchData } = toRefs(props);

const route = useRoute();
const itemsPerPage = 8;

const products = ref([]);
const filterProducts = ref([]);
const selectedBrand = ref([]);
const selectedPrice = ref(null);
const routeParamsId = ref(Number(route.params.id));
const rangePrice = ref({ min: 1, max: 500 });
const page = ref(1);

const handlePriceSelection = (value) => {
    selectedPrice.value = value;
};

const handleSlidePrice = (value) => {
    rangePrice.value = value;
}

const handleBrandSelect = (value) => {
    selectedBrand.value = value;
}

const filterProduct = () => {
    filterProducts.value = products.value.filter(product =>
        product.parent_cat_id === routeParamsId.value ||
        product.sub_cat_id === routeParamsId.value ||
        product.sub_sub_cat_id === routeParamsId.value ||
        product.sub_sub_sub_cat_id === routeParamsId.value
    );
}

const totalPages = computed(() => Math.ceil(filterProducts.value.length / itemsPerPage));

const paginatedProducts = computed(() => {
    let filtered = filterProducts.value;
    if (selectedPrice.value !== null) {
        filtered = filtered.filter((product) => product.price > selectedPrice.value.min && product.price <= selectedPrice.value.max);
    }
    else if (rangePrice.value.min < rangePrice.value.max) {
        filtered = filtered.filter((product) => product.price > rangePrice.value.min && product.price <= rangePrice.value.max);
    }
    if (selectedBrand.value.length > 0) {
        filtered = filtered.filter((product) => selectedBrand.value.includes(product.brand));
    }
    // old search 
    // if(searchData.value.length > 0) {
    //     const searchValue = searchData.value.toLowerCase();
    //     filtered = filtered.filter(product => product.pro_name.toLowerCase().includes(searchValue))
    // }
    const startIndex = (page.value - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filtered.slice(startIndex, endIndex);
});

watchEffect(() => {
    routeParamsId.value = Number(route.params.id);
    filterProduct();
});

onMounted(() => {
    handleGetProducts();
    filterProduct();
});

const handleGetProducts = async () => {
    try {
        const result = await getProducts();
        products.value = result?.data;
    }
    catch(error) {
        console.log("Products", error);
    }
};
const goToPage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages.value) {
        page.value = newPage;
    }
};

const filterSearchProducts = computed(() => {
        return paginatedProducts.value?.filter((item) =>
            Object.entries(item)
                .reduce(
                    (result, [, value]) =>
                        !(value instanceof Object) ? (result += ` ${value}`) : result,
                    ''
                )
                .toString()
                .toLowerCase()
                .includes(searchData.value.toString().toLowerCase())
        );
    });
</script>

<template>
    <!-- card section are here  -->
    <section class="container card-container">
        <p v-if="products.length === 0" class="placeholder-glow">
            <span class="placeholder col-12 pt-4 pb-4"></span>
        </p>
        <div v-else class="component-info-div">
            <h6><span>{{ filterSearchProducts.length }}</span> Products Found</h6>
            <p>Products > Category > {{ route.params.slug.replaceAll('-', ' ') }}</p>
        </div>
        <div class="row g-4">
            <div class="col-md-3">
                <div class="accordion" id="accordionExample">
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Price
                            </button>
                        </h2>
                        <div id="collapseOne" class="accordion-collapse collapse show"
                            data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                <PriceFilter @price-selected="handlePriceSelection" @slide-price="handleSlidePrice">
                                </PriceFilter>
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                Brand
                            </button>
                        </h2>
                        <div id="collapseTwo" class="accordion-collapse" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                <BrandFilter @brand-select="handleBrandSelect"></BrandFilter>
                            </div>
                        </div>
                    </div>

                    <!-- accrodion items  -->

                    <!-- <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                Accordion Item #3
                            </button>
                        </h2>
                        <div id="collapseThree" class="accordion-collapse" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                
                            </div>
                        </div>
                    </div> -->

                </div>
            </div>
            <div class="col-md-9">
                <div v-if="products.length === 0"  class="row row-cols-1 row-cols-lg-4 row-cols-xl-4 row-cols-md-2 row-cols-sm-1 g-4 mt-1">
                    <div 
                    v-for="n in 8"
                    :key="n"
                    class="card card-style">
                        <h5 class="card-title placeholder-glow">
                            <span style="padding: 150px;"class="placeholder col-12"></span>
                        </h5>
                        <div class="card-body">
                            <p class="card-text placeholder-glow">
                                <span class="placeholder col-3"></span>
                                <span class="placeholder col-3"></span>
                                <span class="placeholder col-3"></span>
                                <span class="placeholder col-3"></span>
                                <span class="placeholder col-3"></span>
                            </p>
                        </div>
                    </div>
                </div>

                <div v-if="paginatedProducts.length === 0" class="text-center mt-5 mb-5">
                    <h1>No Product Found</h1>
                </div>

                <div v-else class="row row-cols-1 row-cols-xl-4 row-cols-lg-4 row-cols-md-2 row-cols-sm-1 g-4">
                    <div v-for="(item, index) in filterSearchProducts" :key="index" class="col">
                        <ProductCard :productItem="item"></ProductCard>
                    </div>
                </div>
            </div>
        </div>
        <div class="pagination-style mt-3">
            <nav aria-label="Page navigation example">
                <ul class="pagination">
                    <li @click="goToPage(page - 1)" :disabled="page === 1" class="page-item">
                        <a class="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    <li @click="goToPage(1)" :disabled="page === 1" class="page-item"><a class="page-link"
                            href="#">1</a>
                    </li>
                    <li @click="goToPage(2)" :disabled="page === 2" class="page-item"><a class="page-link"
                            href="#">2</a>
                    </li>
                    <li @click="goToPage(3)" :disabled="page === 3" class="page-item"><a class="page-link"
                            href="#">3</a>
                    </li>
                    <li @click="goToPage(page + 1)" :disabled="page === totalPages" class="page-item">
                        <a class="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>

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

.component-info-div {
    padding: 11px 10px;
    box-shadow: -2px -6px 12px 20px #F5F5F5;
    box-sizing: border-box;
    margin-bottom: 10px;
    border-radius: 8px;
}

.pagination-style {
    display: flex;
    justify-content: center;
}

/* accrodion style  */

.accordion-button:focus {
    z-index: 3;
    border-color: none !important;
    outline: 0;
    box-shadow: none !important;
}

.accordion-button:not(.collapsed) {
    color: black !important;
    background-color: none !important;
    box-shadow: none !important;
    font-weight: 500 !important;
    font-family: 'Poppins', sans-serif !important;
}

.accordion-item {
    background-color: #F8F9FA !important;
    border: none !important
}

.accordion {
    --bs-accordion-active-bg: #F8F9FA !important;

}

.accordion-button {
    color: black !important;
    border: 1px solid #e8eaeb !important;
    box-shadow: none !important;
    padding: 13px 9px !important;
    background: #F8F9FA !important;
}

.accordion-button:hover {
    color: black !important;
    background-color: 1px solid black !important;
    box-shadow: none !important;
    --bs-accordion-active-bg: #E9ECEF !important;
}

.accordion-header {
    margin-bottom: 12px !important;
}

.accordion-body {
    margin-bottom: 12px;
    padding-top: 0 !important;
}

.price-section div,
input,
p {
    cursor: pointer;
}

@media only screen and (max-width: 2560px) {
    .card-container {
        max-width: 2300px !important;
        margin: auto;
        margin-top: 30px;
    }
}
@media only screen and (max-width: 1920px) {
    .card-container {
        max-width: 1800px !important;
        margin: auto;
        margin-top: 30px;
    }
}
@media only screen and (max-width: 1440px) {
    .card-container {
        width: 1300px;
        margin: auto;
        margin-top: 30px;
    }
}

@media only screen and (max-width: 1024px) {
    .card-container {
        width: 100% !important;
        margin: auto;
        margin-top: 30px;
    }
}
@media only screen and (max-width: 768px) {
    .card-container {
        width: 100% !important;
        margin: auto;
        margin-top: 30px;
    }
}
@media only screen and (max-width: 540px) {
    .card-container {
        width: 100% !important;
        margin: auto;
        margin-top: 30px;
    }
}
</style>