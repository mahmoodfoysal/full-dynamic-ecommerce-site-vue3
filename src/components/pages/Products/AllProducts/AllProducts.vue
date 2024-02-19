<script setup>
import { ref, onMounted, computed } from 'vue';
import ProductCard from '../ProductCard/ProductCard.vue';
import axios from 'axios';
import PriceFilter from '../../Filters/PriceFilter.vue';
import BrandFilter from '../../Filters/BrandFilter.vue';
import getDataFromCentralApiFile from '@/API/All_API.js'

const {getProducts, products} = getDataFromCentralApiFile()

// call api for get product data 
onMounted(async () => {
    await getProducts();
})


// reactive price filter value
const selectedPrice = ref(null);

// event handler for change price 
const handlePriceSelection = (value) => {
    selectedPrice.value = value;
};

// sliding price
const rangePrice = ref({ min: 1, max: 500 });

const handleSlidePrice = (value) => {
    rangePrice.value = value;
}


// decalre reactive value for set brand value 
const selectedBrand = ref([]);

const handleBrandSelect = (value) => {
    selectedBrand.value = value;
}

// reactivation page for pagination 
const page = ref(1);

// decalare a variable for how much product show at single page
const itemsPerPage = 8;

// finding how much product in the array and division by 8
const totalPages = computed(() => Math.ceil(products.value.length / itemsPerPage));

// pagination and filter all value 
const paginatedProducts = computed(() => {
  let filtered = products.value;

  // Apply price filter
  if (selectedPrice.value !== null && (selectedPrice.value.min < selectedPrice.value.max)) {
    filtered = filtered.filter((product) => product.price > selectedPrice.value.min && product.price <= selectedPrice.value.max);
  } 
  // apply sliding filter 
  else if (rangePrice.value.min < rangePrice.value.max) {
    filtered = filtered.filter((product) => product.price > rangePrice.value.min && product.price <= rangePrice.value.max);
  }

  // Apply brand filter
  if (selectedBrand.value.length > 0) {
    filtered = filtered.filter((product) => selectedBrand.value.includes(product.brand));
  }

  // Apply pagination
  const startIndex = (page.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return filtered.slice(startIndex, endIndex);
});

// handler for pagination button
const goToPage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages.value) {
        page.value = newPage;
    }
};

</script>

<template>
    <section class="card-container">
        <div class="component-info-div">
            <h6><span>{{ products.length }}</span> Products Found</h6>
            <p>Products > Category > Products</p>
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
                        <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                <PriceFilter
                                @price-selected="handlePriceSelection"
                                @slide-price="handleSlidePrice"
                                ></PriceFilter>
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
                                <BrandFilter
                                @brand-select="handleBrandSelect"
                                ></BrandFilter>
                            </div>
                        </div>
                    </div>

                    <!-- accrodion 3  -->

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
                <div class="row row-cols-1 row-cols-md-4 row-col-lg-4 row-col-sm-1 g-4">
                    <div v-for="(item, index) in paginatedProducts" :key="index" class="col">
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
                    <li @click="goToPage(1)" :disabled="page === 1" class="page-item"><a class="page-link" href="#">1</a>
                    </li>
                    <li @click="goToPage(2)" :disabled="page === 2" class="page-item"><a class="page-link" href="#">2</a>
                    </li>
                    <li @click="goToPage(3)" :disabled="page === 3" class="page-item"><a class="page-link" href="#">3</a>
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
    <!-- pagination div  -->
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


</style>