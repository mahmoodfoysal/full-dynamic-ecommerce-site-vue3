<script setup>
import getDataFromCentralApiFile from '/src/API/All_API.js';
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router';
import { useStore } from '/src/stores/TaskStore.js';

// define route for useing route 
const route = useRoute();

// set the id from the url 
const routeParamsId = ref(Number(route.params.id));


// destructure the data from the central api file 
const {getProducts, products} = getDataFromCentralApiFile();

onMounted(async () => {
    await getProducts();
})



// call pinia store and set in the variable store for using pinia store
const store = useStore();

// call cart from pinia store 
const cart = computed(() => {
    return Object(store.cartItem)
})

// call cart item from pinia store 
const cartItem = computed(() => {
    return Object.values(store.cartItem);
})

// event handler for product add to the cart 
const handleAddToCart = (product) => {
  // destructure products data for set to the cart 
  const { pro_name, price, pro_image, pro_id } = product;
  // declare a object for store in the localStorage 
  let item = {
    pro_name,
    price,
    pro_image,
    pro_id,
  }
  // check shopping cart data have or empty 
  let shopping_cart = getDb() || {};

  // if product have the localStorage then his quantity incease by one 
  if (shopping_cart[item.pro_id]) {
    shopping_cart[item.pro_id].quantity += 1;
  } 
  // otherwise new item add in the storage and his quantity is 1 
  else {
    item.quantity = 1;
    shopping_cart[item.pro_id] = item;
  }
  // update the database who store data to the localStorage 
  updateDb(shopping_cart);
}

const handleIncrementQuantity = (id) => {
    let shopping_cart = getDb() || {};
    if (shopping_cart[id]) {
        shopping_cart[id].quantity += 1;
    }
    else {
        const item = {
            quantity: 1,
        };
        shopping_cart[id] = item;
    }
    updateDb(shopping_cart);
}

// event handler for decrement products 
const handleDecrementQuantity = (id) => {
    let shopping_cart = getDb() || {};
    if (shopping_cart[id]) {
        if (shopping_cart[id].quantity > 1) {
            shopping_cart[id].quantity -= 1;
        }
    }
    else {
        const item = {
            quantity: 1,
        };
        shopping_cart[id] = item;
    }
    updateDb(shopping_cart);
}

// get data from localStorage 
const getDb = () => {
  const cartData = localStorage.getItem('shopping_cart');
  return cartData ? JSON.parse(cartData) : null;
}

// update data to the localStorage 
const updateDb = (cart) => {
  localStorage.setItem('shopping_cart', JSON.stringify(cart));
  store.setCartItem(cart);
}

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

console.log(filteredProducts)

</script>

<template>
    <section v-if="singleProduct.length === 0" class="d-flex justify-content-center" role="status">
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
                            <span>Stock: {{ filteredProducts[0]?.quantity }}</span>
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
                                <button>Buy Now</button>
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