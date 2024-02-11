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
const {getSingleProduct, singleProduct} = getDataFromCentralApiFile();

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


// get data from the local storage
const getDb = () => {
    const cartData = localStorage.getItem('shopping_cart');
    return cartData ? JSON.parse(cartData) : null;
}

// update lcoal storage 
const updateDb = (cart) => {
    localStorage.setItem('shopping_cart', JSON.stringify(cart));
    store.setCartItem(cart);
}

let subTotal = computed(() => {
    const totalQuantityWithPrice = cartItem.value.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);
    return totalQuantityWithPrice;
});














onMounted(async () => {
    await getSingleProduct(routeParamsId.value);
})

</script>

<template>
    <section class="product-details-section">
        <div class="row g-4">
            <div class="col-md-4 product-image-div">
                <img :src="singleProduct.pro_image" class="img-fluid rounded-start" alt="product-img">
            </div>
            <div class="col-md-5">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">{{ singleProduct.pro_name }}</h5>
                        <div class="d-flex align-items-center justify-content-between pb-3 pt-3 border-bottom">
                            <span>Brand: name</span>
                            <span>Rating: {{ singleProduct.rating }}</span>
                            <span class="material-icons">favorite</span>
                        </div>
                        <div class="d-flex align-items-center justify-content-between pb-3 pt-3 border-bottom">
                            <h6>{{ singleProduct.price }}</h6>
                            <span>Stock: {{ singleProduct.quantity }}</span>
                            <span>Product ID: {{ singleProduct.pro_id }}</span>

                        </div>
                        <div class="d-flex align-items-center justify-content-between pb-3 pt-3 border-bottom">
                            <span>Sold By: </span>
                            <span>Category: </span>
                        </div>
                        <div class="d-flex align-items-center justify-content-between pb-3 pt-3 border-bottom">
                            <span>Size:</span>
                            <span>Color:</span>
                        </div>
                        <div class="d-flex align-items-center justify-content-between pb-3 pt-3 border-bottom">

                            <div class="checkout-btn-div">
                                <button>Add To Cart</button>
                            </div>
                            <div class="col-md-3 d-flex justify-content-center align-items-center">
                                <div class="d-flex align-items-center add-sub-style">
                                    <span 
                                    @handleDecrementQuantity(cart.pro_id)
                                    class="material-icons me-2">
                                        remove
                                    </span>
                                    <h5 class="me-2 mb-0">{{ cart.quantity }}</h5>
                                    <span 
                                    @handleIncrementQuantity(cart.pro_id)
                                    class="material-icons me-2">
                                        add
                                    </span>
                                </div>
                            </div>
                            <div class="checkout-btn-div">
                                <button>Buy Now</button>
                            </div>

                        </div>
                        <p class="card-text">{{ singleProduct.description }}</p>
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

@media (min-width: 1200px) {
    .product-details-section {
        max-width: 1300px;
        margin: auto;
        margin-top: 30px;
        margin-bottom: 30px;
    }
}

@media (max-width: 992px) {
    .product-details-section {
        max-width: 960px;
        margin: auto;
        margin-top: 30px;
        margin-bottom: 30px;
    }
}

@media (max-width: 768px) {
    .product-details-section {
        max-width: 720px;
        margin: auto;
        margin-top: 30px;
        margin-bottom: 30px;
    }
}

@media (max-width: 540px) {
    .product-details-section {
        max-width: 720px;
        margin: auto;
        margin-top: 30px;
        margin-bottom: 30px;
    }
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
</style>