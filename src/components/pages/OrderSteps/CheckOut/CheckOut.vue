<script setup>
import { computed, reactive, ref } from 'vue';
import { useStore } from '@/stores/TaskStore';
import router from '@/router/router.js';
import getDataFromCentralApiFile from '@/API/All_API.js';

// destructure event handler from central api 
const { createOrders } = getDataFromCentralApiFile();

// call pinia store 
const store = useStore();

// call computed for finding real time cart data 
const cart = computed(() => {
    return Object(store.cartItem)
})

// call computed cart item for calculation 
const cartItem = computed(() => {
    return Object.values(store.cartItem);
})

// reactive for after input data store to the database
const fullName = ref(store.user ? store.user.displayName : '');
const email = ref(store.user ? store.user.email : '');
const phoneNumber = ref(null);
const city = ref('');
const country = ref('');
const state = ref('');
const zip = ref(null);
const address = ref('');
const cardNumber = ref(null);
const cardName = ref('');
const expireDate = ref('');
const cvc = ref('');

// event handler for submit order 
const handleOrderSubmit = async () => {
    const orderList = {
        cartItem,
        orderStatus: "P",
    }
    await createOrders({
        fullName: fullName.value,
        email: email.value,
        phoneNumber: phoneNumber.value,
        city: city.value,
        country: country.value,
        state: state.value,
        zip: zip.value,
        address: address.value,
        cardNumber: cardNumber.value,
        cardName: cardName.value,
        expireDate: expireDate.value,
        cvc: cvc.value,
        subTotal: subTotal.value,
        vatTotal: vatTotal.value,
        delivaryFee: delivaryFee.value,
        totalAmount: totalAmount.value,
        orderList: cartItem.value,
        orderStatus: "P",
    })
    router.push({ name: 'Home' })
    store.setCartItem([]);
};



// *******************************calculation section****************************

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

// calculate delivary fee 
let delivaryFee = computed(() => {
    return 8;
})

// calculate total amount 
let totalAmount = computed(() => {
    return subTotal.value + vatTotal.value + delivaryFee.value;
})

</script>

<template>
    <section class="check-out-container-style container">
        <div class="row g-4">
            <div class="col-md-6">
                <h3 class="contact-info-style">Contact Information</h3>
                <div class="row g-3">
                    <div class="col-md-6">
                        <label for="inputEmail4" class="form-label">Full Name</label>
                        <input v-model="fullName" type="text" class="form-control" id="inputEmail4"
                            disabled>
                    </div>
                    <div class="col-md-6">
                        <label for="inputEmail4" class="form-label">Email</label>
                        <input v-model="email" type="email" class="form-control" id="inputEmail4" disabled>
                    </div>
                    <div class="col-md-6">
                        <label for="inputEmail4" class="form-label">Phone No</label>
                        <input v-model.trim="phoneNumber" type="number" class="form-control" id="inputEmail4"
                            placeholder="Enter Your Contact Number" required>
                    </div>






                    <div class="col-md-6">
                        <label for="inputState" class="form-label">Country</label>
                        <select v-model.trim="country" id="inputState" class="form-select" required>
                            <option selected>Select Country</option>
                            <option>Bangladesh</option>
                            <option>India</option>
                            <option>China</option>
                        </select>
                    </div>

                    <div class="col-md-4">
                        <label for="inputEmail4" class="form-label">City</label>
                        <input v-model.trim="city" type="text" class="form-control" id="inputEmail4"
                            placeholder="City Name" required>
                    </div>
                    <div class="col-md-4">
                        <label for="inputEmail4" class="form-label">state</label>
                        <input v-model.trim="state" type="text" class="form-control" id="inputEmail4"
                            placeholder="Enter State">
                    </div>
                    <div class="col-md-4">
                        <label for="inputZip" class="form-label">Zip</label>
                        <input v-model.trim="zip" type="zip" class="form-control" id="inputZip"
                            placeholder="Zip Code" required>
                    </div>
                    <div class="col-12">
                        <label for="inputAddress" class="form-label">Address</label>
                        <input v-model.trim="address" type="text" class="form-control" id="inputAddress"
                            placeholder="1234 Main St" required>
                    </div>
                    <h4>Delivary Method</h4>
                    <div class="col-md-12">
                        <label for="inputEmail4" class="form-label">Card Number</label>
                        <input v-model.trim="cardNumber" type="number" class="form-control" id="inputEmail4"
                            placeholder="111 1111 11111 1111" required>
                    </div>
                    <div class="col-md-12">
                        <label for="inputEmail4" class="form-label">Card Name</label>
                        <input v-model.trim="cardName" type="text" class="form-control" id="inputEmail4"
                            placeholder="Card Name" required>
                    </div>
                    <div class="col-md-6">
                        <label for="inputEmail4" class="form-label">Expire Date</label>
                        <input v-model.trim="expireDate" type="date" class="form-control" id="inputEmail4" required>
                    </div>
                    <div class="col-md-6">
                        <label for="inputEmail4" class="form-label">CVC</label>
                        <input v-model.trim="cvc" type="number" class="form-control" id="inputEmail4"
                            placeholder="111" required>
                    </div>

                    <div class="col-12">
                        <button @click="handleOrderSubmit" type="submit" class="btn btn-primary big-screen-submit-btn">Submit</button>
                    </div>
                </div>

            </div>
            <div class="col-md-6">
                <section>
                    <section class="cart-style cart-section-style">
                        <div v-for="(item, index) in cart" :key="index" class="card mb-3"
                            style="max-width: 540px; margin: auto;">
                            <div class="row g-0">
                                <div class="col-md-4">
                                    <img :src="item.pro_image" class="img-fluid rounded-start cart-img-style" alt="...">
                                </div>
                                <div class="col-md-4 d-flex justify-content-center align-items-center">
                                    <div class="">
                                        <h6>{{ item.pro_name }}</h6>
                                    </div>
                                </div>
                                <div class="col-md-4 d-flex justify-content-center align-items-center">
                                    <div class="d-flex price-delete-style">
                                        <h6>${{ item.price }}</h6>
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
                        <div class="text-center mobile-screen-submit-btn mt-3">
                        <button @click="handleOrderSubmit" type="submit" class="btn btn-primary">Submit</button>
                    </div>
                    </section>
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

.contact-info-style {
    margin-bottom: 10px;
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
    width: 100%;
    margin: auto;
    overflow-y: scroll;
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



@media only screen and (max-width: 2560px) {
    .check-out-container-style {
        max-width: 2300px !important;
        margin: auto;
        margin-bottom: 30px;
        margin-top: 30px;
    }
    .big-screen-submit-btn {
        display: block;
    }
    .mobile-screen-submit-btn {
        display: none;
    }
}
@media only screen and (max-width: 1920px) {
    .check-out-container-style {
        max-width: 1800px !important;
        margin: auto;
        margin-bottom: 30px;
        margin-top: 30px;
    }
    .big-screen-submit-btn {
        display: block;
    }
    .mobile-screen-submit-btn {
        display: none;
    }
}
@media only screen and (max-width: 1440px) {
    .check-out-container-style {
        max-width: 1300px !important;
        margin: auto;
        margin-bottom: 30px;
        margin-top: 30px;
    }
    .big-screen-submit-btn {
        display: block;
    }
    .mobile-screen-submit-btn {
        display: none;
    }
}
@media only screen and (max-width: 1024px) {
    .check-out-container-style {
        max-width: 900px;
        margin: auto;
        margin-bottom: 30px;
        margin-top: 30px;
    }
    .big-screen-submit-btn {
        display: block;
    }
    .mobile-screen-submit-btn {
        display: none;
    }
}
@media only screen and (max-width: 768px) {
    .check-out-container-style {
        max-width: 100%;
        margin: auto;
        margin-bottom: 30px;
        margin-top: 30px;
    }
    .big-screen-submit-btn {
        display: block;
    }
    .mobile-screen-submit-btn {
        display: none;
    }
}
@media only screen and (max-width: 540px) {
    .check-out-container-style {
        max-width: 100%;
        margin: auto;
        margin-bottom: 30px;
        margin-top: 30px;
    }
    .big-screen-submit-btn {
        display: none;
    }
    .mobile-screen-submit-btn {
        display: block;
    }
}






</style>