<script setup>
import { ref, onMounted, computed } from 'vue';
import ProductCard from '../ProductCard/ProductCard.vue';
import axios from 'axios';

const products = ref([]);

onMounted(async () => {
    const url = 'http://localhost:3000/products';
      try {
        const res = await axios(url);
        products.value = res.data;
        // console.log(res.data);
      }
      catch(err) {
        console.log(err);
      }
})

// pagination code are here 

// decalare a variable for how much product show at a time 
const itemsPerPage = 8;

// reactivation page variable 
const page = ref(1);

// finding how much product in the array and division by 8
const totalPages = computed(() => Math.ceil(products.value.length / itemsPerPage));

const paginatedProducts = computed(() => {
  const startIndex = (page.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return products.value.slice(startIndex, endIndex);
});

// button control by clicking 
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
        <div class="row row-cols-1 row-cols-md-4 row-col-lg-4 row-col-sm-1 g-4">
            <div v-for="(item, index) in paginatedProducts" :key="index" class="col">
                <ProductCard :productItem="item"></ProductCard>
            </div>
        </div>
        <div class="pagination-style mt-3">
            <nav aria-label="Page navigation example">
                <ul class="pagination">
                    <li 
                    @click="goToPage(page - 1)" :disabled="page === 1"
                    class="page-item"><a class="page-link" href="#">Previous</a>
                    </li>

                    <li 
                    @click="goToPage(1)" :disabled="page === 1"
                    class="page-item"><a class="page-link" href="#">1</a>
                    </li>

                    <li 
                    @click="goToPage(2)" :disabled="page === 2"
                    class="page-item"><a class="page-link" href="#">2</a>
                    </li>

                    <li 
                    @click="goToPage(3)" :disabled="page === 3"
                    class="page-item"><a class="page-link" href="#">3</a>
                    </li>

                    <li 
                    @click="goToPage(page + 1)" :disabled="page === totalPages"
                    class="page-item"><a class="page-link" href="#">Next</a>
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
</style>