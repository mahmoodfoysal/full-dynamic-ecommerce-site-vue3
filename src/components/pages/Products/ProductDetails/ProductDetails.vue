<script setup>
import Reviews from '@/components/pages/Reviews/Reviews.vue'
import { ref, onMounted, computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router';
import { useStore } from '/src/stores/TaskStore.js';
import { getProducts, getReviews } from '@/API/All_API.js';

const store = useStore();
const route = useRoute();

const products = ref([]);
const reviewData = ref([]);
const filterReviewData = ref([]);
const routeParamsId = ref(Number(route.params.id));

onMounted(async () => {
    await handleGetProducts()
    await handleGetReviews();
    await filterReview();
})

const handleGetProducts = async () => {
    try {
        const result = await getProducts();
        products.value = result?.data;
    }
    catch(error) {
        console.log("Products", error);
    }
};

const handleGetReviews = async () => {
    try {
        const result = await getReviews();
        reviewData.value = result?.data;
    }
    catch(error) {
        console.log("Reviews", error);
    }
}

const handleAddToCart = (product) => {
  const { pro_name, price, pro_image, pro_id } = product;
  let item = {
    pro_name,
    price,
    pro_image,
    pro_id,
  }
  let shopping_cart = getDb() || {};

  if (shopping_cart[item.pro_id]) {
    shopping_cart[item.pro_id].quantity += 1;
  } 

  else {
    item.quantity = 1;
    shopping_cart[item.pro_id] = item;
  }
  updateDb(shopping_cart);
};

const filterReview = () => {
    filterReviewData.value = reviewData.value.filter(review => review.productID === routeParamsId.value);
};

const cart = computed(() => {
    return Object(store.cartItem)
});

const cartItem = computed(() => {
    return Object.values(store.cartItem);
});



const getDb = () => {
  const cartData = localStorage.getItem('shopping_cart');
  return cartData ? JSON.parse(cartData) : null;
};

const updateDb = (cart) => {
  localStorage.setItem('shopping_cart', JSON.stringify(cart));
  store.setCartItem(cart);
};

const itemQuantity = computed(() => {
    const item = store.cartItem;
    if (item && item[routeParamsId.value]) {
        return item[routeParamsId.value].quantity; // Access quantity of the specific item
    }
    return 0;
})

const filteredProducts = computed(() => {
    return products.value.filter(product => product?.pro_id === routeParamsId.value);
});

</script>

<template>
    <section v-if="products.length === 0" class="d-flex justify-content-center" role="status">
        <div class="spinner-grow text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <div class="spinner-grow text-secondary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <div class="spinner-grow text-success" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <div class="spinner-grow text-danger" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <div class="spinner-grow text-warning" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <div class="spinner-grow text-info" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <div class="spinner-grow text-light" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <div class="spinner-grow text-dark" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </section>
    <section class="container product-details-section">
        <div class="row g-4">
            <div class="col-md-4 product-image-div">
                <img :src="filteredProducts[0]?.pro_image" class="img-fluid rounded-start" alt="product-img">
            </div>
            <div class="col-md-5">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">{{ filteredProducts[0]?.pro_name }}</h5>
                        <div class="d-flex align-items-center justify-content-between pb-3 pt-3 border-bottom">
                            <span>Brand: {{ filteredProducts[0]?.brand }}</span>
                            <span>Rating: {{ filteredProducts[0]?.rating }}</span>
                            <span class="material-icons">favorite</span>
                        </div>
                        <div class="d-flex align-items-center justify-content-between pb-3 pt-3 border-bottom">
                            <h6>$ {{ filteredProducts[0]?.price }}</h6>
                            <span>Stock: {{ filteredProducts[0]?.stock }}</span>
                            <span>Product ID: {{ filteredProducts[0]?.pro_id }}</span>

                        </div>
                        <div class="d-flex align-items-center justify-content-between pb-3 pt-3 border-bottom">
                            <span>Sold By: {{ filteredProducts[0]?.brand }}</span>
                            <span>Category: </span>
                        </div>
                        <div class="d-flex align-items-center justify-content-between pb-3 pt-3 border-bottom">
                            <span>Size:</span>
                            <span>Color:</span>
                        </div>
                        <div class="d-flex align-items-center justify-content-between pb-3 pt-3 border-bottom">

                            <div class="checkout-btn-div">
                                <button
                                @click="handleAddToCart(filteredProducts[0])"
                                >Add To Cart</button>
                            </div>
                            <div class="col-md-3 d-flex justify-content-center align-items-center">
                                <div class="d-flex align-items-center add-sub-style">
                                    <span 
                                    @click="handleDecrementQuantity(filteredProducts[0]?.pro_id)"
                                    class="material-icons me-2">
                                        remove
                                    </span>
                                    <h5 class="me-2 mb-0">{{ itemQuantity }}</h5>
                                    <span 
                                    @click="handleIncrementQuantity(filteredProducts[0]?.pro_id)"
                                    class="material-icons me-2">
                                        add
                                    </span>
                                </div>
                            </div>
                            <div class="checkout-btn-div">
                                <RouterLink :to="{name: 'BuyProduct', params: {id: filteredProducts[0]?.pro_id}}">
                                    <button>Buy Now</button>
                                </RouterLink>
                            </div>

                        </div>
                        <p class="card-text">{{ filteredProducts[0]?.description }}</p>
                    </div>
                </div>
            </div>
            <div class="col-md-3 condition-div-style">
                <section>
                    <div class="d-flex justify-contain-between mb-3 mt-3">
                        <span class="material-icons me-2">
                            add
                        </span>
                        <span>
                            <p>Free Shipping Inside City</p>
                        </span>
                    </div>
                    <div class="d-flex justify-contain-between mb-3">
                        <span class="material-icons me-2">
                            add
                        </span>
                        <span>
                            <p>Home Delivery all over Country</p>
                        </span>
                    </div>
                    <div class="d-flex justify-contain-between mb-3">
                        <span class="material-icons me-2">
                            add
                        </span>
                        <span>
                            <p>Various Payment Methods</p>
                        </span>
                    </div>
                    <div class="d-flex justify-contain-between mb-3">
                        <span class="material-icons me-2">
                            add
                        </span>
                        <span>
                            <p>30 Days Replacement Policy Selected Country</p>
                        </span>
                    </div>
                    <div class="d-flex justify-contain-between mb-3">
                        <span class="material-icons me-2">
                            add
                        </span>
                        <span>
                            <p>Warranty not available</p>
                        </span>
                    </div>
                </section>
            </div>
        </div>

                <!-- reviews div  -->

                <h4 class="text-center mt-3 mb-3 text-success review-text">Reviews({{ filterReviewData.length }})</h4>
        <div class="col-lg-12">
            <!-- filter style down  -->
            <div :class="{ 'project-review': filterReviewData.length > 2 }"> 
                <div v-for="(review, index) in filterReviewData" :key="index" class="d-flex">
                    <img :src="review?.photo" class="img-fluid rounded-circle p-3" style="width: 100px; height: 100px;"
                        alt="">
                    <div>
                        <p class="mb-2 review-comment-style" style="font-size: 14px;">{{ review?.reviewDate }}</p>
                        <div class="d-flex justify-content-between">
                            <h5 class="review-fullname-style">{{ review?.fullName }}</h5>
                            <div class="d-flex mb-3">
                                <template v-for="i in 5">
                                    <i
                                        :class="{ 'fa': true, 'fa-star': true, 'text-gray': i > review?.currentRating, 'text-yellow': i <= review?.currentRating }"></i>
                                </template>
                            </div>
                        </div>
                        <p class="review-comment-style">{{ review?.comment }}</p>
                    </div>
                </div>
            </div>
        </div>
        <Reviews :productID="routeParamsId"></Reviews>
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

.product-details-section {}

.product-image-div {
    border: 1px solid gray;
    padding: 70px 10px;
    margin-bottom: auto;
}

.product-image-div img {
    margin: auto;
}

.condition-div-style {
    background: #F1F1F1;
    padding: 0 15px;
}

.add-sub-style span {
    cursor: pointer;
    font-size: 31px;
}

.add-sub-style h5 {
    font-size: 27px;
}

.checkout-btn-div button {
    background: #1F5DA0;
    padding: 8px 18px;
    border: none;
    color: #FFF;
    border-radius: 18px;
    font-size: 14px;
    font-weight: 500;
    font-family: 'Poppins', sans-serif;
}

.checkout-btn-div button:hover {
    cursor: pointer;
}

/* review style write here  */

.rating-style { 
    cursor: pointer;
}

.rating-style i:hover {
    cursor: pointer;
    color: #FFB524;
}

.star {
    color: gold;
}

.star-o {
    color: gray;
}

.text-yellow {
    color: #FFB524;
}

.text-gray {
    color: gray !important;
}

.project-review {
    height: 200px;
    overflow-y: scroll;
}

.component-text-style {
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    font-style: normal;
    font-size: 30px
}

.project-link-text {
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    font-style: normal;
    font-size: 20px;
}

.link-group a {
    text-decoration: none;
    font-family: "Poppins", sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 15px;
}

.tech-features-div-style h4 {
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    font-style: normal;
    font-size: 20px;
}

.tech-features-div-style ul li {
    font-family: "Poppins", sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 15px;
    color: gray
}

.review-text {
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    font-style: normal;
    font-size: 20px;
}

.review-fullname-style {
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    font-style: normal;
    font-size: 15px;
}

.review-comment-style {
    font-family: "Poppins", sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 15px;
    color: gray;
}

@media only screen and (max-width: 2560px) {
    .product-details-section {
        max-width: 2300px !important;
        margin: auto;
        margin-top: 30px;
    }
}
@media only screen and (max-width: 1920px) {
    .product-details-section {
        max-width: 1800px !important;
        margin: auto;
        margin-top: 30px;
    }
}
@media only screen and (max-width: 1440px) {
    .product-details-section {
        max-width: 1300px !important;
        margin: auto;
        margin-top: 30px;
    }
}
@media only screen and (max-width: 1024px) {
    .product-details-section {
        max-width: 950px !important;
        margin: auto;
        margin-top: 30px;
    }
}
@media only screen and (max-width: 768px) {
    .product-details-section {
        max-width: 100% !important;
        margin: auto;
        margin-top: 30px;
    }
}
@media only screen and (max-width: 540px) {
    .product-details-section {
        max-width: 100% !important;
        margin: auto;
        margin-top: 30px;
    }
}

</style>