<script setup>
import { ref, onMounted, computed } from 'vue';
import ProductCard from '../ProductCard/ProductCard.vue';
import axios from 'axios';

// reactive products data which find from the api 
const products = ref([]);

// call api for get product data 
onMounted(async () => {
    const url = 'http://localhost:3000/products';
    try {
        const res = await axios(url);
        products.value = res.data;
        // console.log(res.data);
    }
    catch (err) {
        console.log(err);
    }
})

// declare price range for filter by product price
const priceRanges = [
    { label: '$0 to $10', min: 0, max: 10 },
    { label: '$11 to $20', min: 11, max: 20 },
    { label: '$21 to $30', min: 21, max: 30 },
    { label: '$31 to $40', min: 31, max: 40 },
    { label: '$41 to $100', min: 41, max: 100 },
    { label: '$101 to $200', min: 101, max: 200 },
    { label: '$201 to $300', min: 201, max: 300 },
    { label: '$301 to $400', min: 301, max: 400 },
];

// reactive price filter value
const selectedPrice = ref(null);

// reactivation page for pagination 
const page = ref(1);

// decalare a variable for how much product show at single page
const itemsPerPage = 8;

// finding how much product in the array and division by 8
const totalPages = computed(() => Math.ceil(products.value.length / itemsPerPage));

// paginate the products array 
const paginatedProducts = computed(() => {
    let filtered = products.value;
    // Apply price filter
    if (selectedPrice.value !== null) {
        filtered = filtered.filter((product) => product.price > selectedPrice.value.min && product.price <= selectedPrice.value.max);
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
                                <section class="price-section">
                                        <label
                                        v-for="(range, index) in priceRanges" 
                                        :key="index"
                                        class="d-flex align-items-center mb-2">
                                        <input 
                                        v-model="selectedPrice" 
                                        type="radio" 
                                        name="priceRanges" 
                                        :value="range"
                                        id="'price-' + index">
                                        <p class="ms-2">{{ range.label }}</p>
                                    </label>
                                </section>
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                Accordion Item #2
                            </button>
                        </h2>
                        <div id="collapseTwo" class="accordion-collapse" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                <strong>This is the second item's accordion body.</strong> It is hidden by default, until
                                the collapse plugin adds the appropriate classes that we use to style each element. These
                                classes control the overall appearance, as well as the showing and hiding via CSS
                                transitions. You can modify any of this with custom CSS or overriding our default variables.
                                It's also worth noting that just about any HTML can go within the
                                <code>.accordion-body</code>, though the transition does limit overflow.
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                Accordion Item #3
                            </button>
                        </h2>
                        <div id="collapseThree" class="accordion-collapse" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                <strong>This is the third item's accordion body.</strong> It is hidden by default, until the
                                collapse plugin adds the appropriate classes that we use to style each element. These
                                classes control the overall appearance, as well as the showing and hiding via CSS
                                transitions. You can modify any of this with custom CSS or overriding our default variables.
                                It's also worth noting that just about any HTML can go within the
                                <code>.accordion-body</code>, though the transition does limit overflow.
                            </div>
                        </div>
                    </div>
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

.price-section div,
input,
p {
    cursor: pointer;
}
</style>