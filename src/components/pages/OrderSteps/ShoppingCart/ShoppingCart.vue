<script setup>
import { computed, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { useStore } from '@/stores/TaskStore.js';
import router from '@/router/router.js';


onMounted(() => {
    let userInfo = localStorage.getItem('user-info');
    if(!userInfo) {
        router.push({name: 'Login'})
    }
})

const store = useStore();

const cart = computed(() => {
    return Object(store.cartItem)
})

const cartItem = computed(() => {
    return Object.values(store.cartItem);
})



// event handler for increase product 
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

// event handler for remove item from cart 
const handleRemoveItem = (id) => {
    let shopping_cart = getDb() || {};
    
    if (shopping_cart[id]) {
        const text = "Are you sure Remove This"
        if(confirm((text) == true)) {
            delete shopping_cart[id];
        }
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

// calculate subtotal 
let subTotal = computed(() => {
   const totalQuantityWithPrice = cartItem.value.reduce((total, item) => {
      return total + (item.price * item.quantity);
   }, 0);
   return totalQuantityWithPrice;
});

// calculate vat 
const vatTotal = computed(() => {
    return subTotal.value * 0.15;
})

let delivaryFee = computed(() => {
    return 8;
})

let totalAmount = computed(() => {
    return subTotal.value + vatTotal.value + delivaryFee.value;
})
</script>

<template>
    <section class="cart-container">
        <div class="component-info-div">
        <h6><span></span>Home > Cart</h6>
        <!-- <p>Products > Category > {{ route.params.slug.replaceAll('-', ' ') }}</p> -->
    </div>
    <section class="cart-style cart-section-style">
        <div v-for="(item, index) in cart" :key="index" class="card mb-3" style="max-width: 540px; margin: auto;">
            <div class="row g-0">
                <div class="col-md-3">
                    <img :src="item.pro_image" class="img-fluid rounded-start cart-img-style" alt="...">
                </div>
                <div class="col-md-3 d-flex justify-content-center align-items-center">
                    <div class="">
                        <h6>{{ item.pro_name }}</h6>
                    </div>
                </div>
                <div class="col-md-3 d-flex justify-content-center align-items-center">
                    <div class="d-flex add-sub-style">
                        <span @click="handleDecrementQuantity(item.pro_id)" class="material-icons me-2">
                            remove
                        </span>
                        <h5 class="me-2">{{ item.quantity }}</h5>
                        <span @click="handleIncrementQuantity(item.pro_id)" class="material-icons me-2">
                            add
                        </span>
                    </div>
                </div>
                <div class="col-md-3 d-flex justify-content-center align-items-center">
                    <div class="d-flex price-delete-style">
                        <h6>${{ item.price }}</h6>
                        <span 
                        @click="handleRemoveItem(item.pro_id)"
                        class="material-icons ms-2">
                            delete
                        </span>
                    </div>
                </div>

            </div>
        </div>
        
    </section>
    <section class="calculation-section">
        <table class="mt-3" style="width:100%">
            <tr>
                <td style="text-align: right; width:25%"></td>
                <td style="text-align: left; width:50%">Subtotal</td>
                <td style="text-align: left; width:25%">${{ subTotal }} </td>
            </tr>
            <tr>
                <td style="text-align: left; width:25%"></td>
                <td style="text-align: left; width:50%">(+) VAT</td>
                <td style="text-align: left; width:25%">${{ vatTotal.toFixed(2) }} </td>
            </tr>
            <tr>
                <td style="text-align: left; width:25%"></td>
                <td style="text-align: left; width:50%">Delivery Fee</td>
                <td style="text-align: left; width:25%">${{ delivaryFee }} </td>
            </tr>
            <tr>
                <td style="text-align: left; width:25%"></td>
                <td style="text-align: left; width:50%">Total Amount</td>
                <td style="text-align: left; width:25%">${{ totalAmount.toFixed(2) }} </td>
            </tr>
        </table>
        <div class="checkout-btn-div">
            <RouterLink
            :to="{name: 'CheckOut'}"
            >
                <button>Check Out</button>
            </RouterLink>
        </div>
    </section>
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

.cart-container {
    margin-bottom: 30px;
}

.calculation-section {
    border-top: 1px solid black;
    margin-top: 20px;
}
.checkout-btn-div {
    width: 50%;
    text-align: right;
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

.cart-section-style {
    height: calc(100vh - 320px);
    width: 40%;
    margin: auto;
    overflow-y: scroll;
}

::-webkit-scrollbar {
    width: 8px;
    border-radius: 20px;
}

/* Track */
::-webkit-scrollbar-track {
    background: #f1f1f1;

}

/* Handle */
::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #555;
}

.cart-img-style {
    height: 100px;
}

.add-sub-style {
    cursor: pointer;
}
.price-delete-style {
    cursor: pointer;
}
.price-delete-style span:hover {
    cursor: pointer;
    color: rgb(204, 9, 9);
}

.checkout-btn-div button {
    background: #1F5DA0;
    padding: 10px 18px;
    border: none;
    color: #FFF;
    border-radius: 20px;
    font-size: 16px;
    font-weight: 500;
    font-family: 'Poppins', sans-serif;
}
.checkout-btn-div button:hover {
    cursor: pointer;
}
</style>