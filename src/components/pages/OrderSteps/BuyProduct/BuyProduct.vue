<script setup>
import { useStore } from '@/stores/TaskStore.js';
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import router from '@/router/router.js';
import { getProducts, createOrders, updateStock } from '@/API/All_API.js';

const route = useRoute();
const store = useStore();

const quantity = ref(1);
const routeParamsId = ref(Number(route.params.id));
const products = ref([]);
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
const orderDate = ref(Date());
const isValidation = ref(false);
const selectPayment = ref(null);
const mobile_banking = ref(null);
const trans_id = ref(null);

onMounted(() => {
    handleGetProducts();
});

const handleGetProducts = async () => {
    try {
        const result = await getProducts();
        products.value = result?.data;
    }
    catch (error) {
        console.log("Products", error);
    }
};

// product filter by params id 
const filterProducts = computed(() => {
    return products.value.filter(product => product.pro_id === routeParamsId.value);
});

// event handler for increase product 
const handleIncrementQuantity = (id) => {
    if (quantity.value < filterProducts.value[0].stock) {
        quantity.value += 1;
    }
    else {
        alert('You quentity more then available stock');
        return;
    }
};

// event handler for decrement products 
const handleDecrementQuantity = (id) => {
    if (quantity.value > 1) {
        quantity.value -= 1;
    }
}

// *******************************calculation section****************************

// calculate subtotal 
const subTotal = computed(() => {
    const totalQuantityWithPrice = Number(filterProducts.value[0]?.price) * quantity.value;
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

// event handler for submit order 
const handleOrderSubmit = async (product) => {
    if (
        !fullName.value ||
        !email.value ||
        !phoneNumber.value ||
        !city.value ||
        !country.value ||
        !state.value ||
        !zip.value ||
        !address.value ||
        !selectPayment.value ||
        selectPayment.value == 3 ? !cardName.value || !cardNumber.value || !cvc.value || !expireDate.value : null ||
        selectPayment.value == 2 ? !mobile_banking.value || !trans_id.value : null
    ) {
        isValidation.value = true;
        alert("Please fill up all required field!!!");
        return;
    };

    const orderList = [{
        pro_id: product.pro_id,
        pro_name: product.pro_name,
        price: product.price,
        pro_image: product.pro_image,
        quantity: quantity.value,
        currency_name: product.currency_name,
        currency_id: product.currency_id
    }]

    const data = {
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
        orderList: orderList,
        orderStatus: "P",
        orderDate: orderDate.value,
        payment_method: selectPayment.value,
        mobile_banking: mobile_banking.value,
        trans_id: trans_id.value
    }

    console.log("data", data)
    const text = "Are you want to sure? Place this order..."
    if (confirm(text) == true) {
        const result = await createOrders(data);
        if (result?.data?.insertedId) {
            alert("Order placed successful");
            const newStock = filterProducts.value[0].stock - quantity.value;
            handleUpdateStock(filterProducts.value[0]._id, { stock: newStock });
            isValidation.value = false;
            router.push('/');
        };
    }
};

const handleUpdateStock = async (id, data) => {
    try {
        const response = await updateStock(id, data);
        return response.data;
    } catch (error) {
        console.error("Error updating stock", error);
    }
};

watch(selectPayment, (newVal) => {
    if(newVal) {
        trans_id.value = null;
        mobile_banking.value = null;
        cardName.value = null;
        cardNumber.value = null;
        expireDate.value = null;
        cvc.value = null;
    }
})
</script>

<template>
    <section class="check-out-container-style container">
        <div class="row g-4 order-form-style">
            <div class="col-md-6">
                <h3 class="contact-info-style">Contact Information</h3>
                <div class="row g-3">
                    <div class="col-md-6">
                        <label for="fullName" class="form-label">Full Name *</label>
                        <input v-model="fullName" :class="{ 'is-validate': isValidation && !fullName }" type="text"
                            class="form-control" id="fullName" disabled>
                    </div>
                    <div class="col-md-6">
                        <label for="email" class="form-label">Email *</label>
                        <input v-model="email" :class="{ 'is-validate': isValidation && !email }" type="email"
                            class="form-control" id="email" disabled>
                    </div>
                    <div class="col-md-6">
                        <label for="phone" class="form-label">Phone No *</label>
                        <input v-model.trim="phoneNumber" :class="{ 'is-validate': isValidation && !phoneNumber }"
                            type="number" class="form-control" id="phone" placeholder="Enter Your Contact Number"
                            required>
                    </div>
                    <div class="col-md-6">
                        <label for="country" class="form-label">Country *</label>
                        <select v-model.trim="country" :class="{ 'is-validate': isValidation && !country }"
                            id="inputState" class="form-select" required>
                            <option selected>Select Country</option>
                            <option>Bangladesh</option>
                            <option>India</option>
                            <option>China</option>
                        </select>
                    </div>

                    <div class="col-md-4">
                        <label for="city" class="form-label">City *</label>
                        <input v-model.trim="city" :class="{ 'is-validate': isValidation && !city }" type="text"
                            class="form-control" id="city" placeholder="City Name" required>
                    </div>
                    <div class="col-md-4">
                        <label for="state" class="form-label">state *</label>
                        <input v-model.trim="state" :class="{ 'is-validate': isValidation && !state }" type="text"
                            class="form-control" id="state" placeholder="Enter State">
                    </div>
                    <div class="col-md-4">
                        <label for="inputZip" class="form-label">Zip *</label>
                        <input v-model.trim="zip" :class="{ 'is-validate': isValidation && !zip }" type="zip"
                            class="form-control" id="inputZip" placeholder="Zip Code" required>
                    </div>
                    <div class="col-12">
                        <label for="inputAddress" class="form-label">Address *</label>
                        <input v-model.trim="address" :class="{ 'is-validate': isValidation && !address }" type="text"
                            class="form-control" id="inputAddress" placeholder="1234 Main St" required>
                    </div>
                    <h4 
                    class="delivery-text mt-2"
                    :class="{ 'payment-validate': isValidation && !selectPayment }"
                    >Payment Method *</h4>
                    <div class="col-md-12">
                        <input 
                        type="radio" 
                        id="cash" 
                        name="fav_language"
                        v-model="selectPayment" 
                        value="1">
                        <label 
                        for="cash" 
                        class="ms-2">
                        Cash on delivery
                        </label> 
                        <br>
                        <input 
                        type="radio" 
                        id="bkash" 
                        name="fav_language" 
                        v-model="selectPayment"
                        value="2"> 
                        <label 
                        for="bkash" 
                        class="ms-2">
                        Bkash
                        </label> 
                        <br>
                        <input 
                        type="radio" 
                        id="card" 
                        name="fav_language" 
                        v-model="selectPayment"
                        value="3">
                        <label 
                        for="card" 
                        class="ms-2">
                        Card payment
                        </label>
                    </div>

                    <div v-if="selectPayment == 3">
                        <div class="col-md-12">
                        <label for="card" class="form-label">Card Number *</label>
                        <input 
                        v-model.trim="cardNumber" 
                        :class="{ 'is-validate': isValidation && !cardNumber }"
                        type="number" class="form-control" id="card"
                            placeholder="111 1111 11111 1111" required>
                    </div>
                    <div class="col-md-12">
                        <label for="cardName" class="form-label">Card Name *</label>
                        <input 
                        v-model.trim="cardName"
                        :class="{ 'is-validate': isValidation && !cardName }" 
                        type="text" class="form-control" id="cardName"
                            placeholder="Card Name" required>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                        <label for="expDate" class="form-label">Expire Date *</label>
                        <input v-model.trim="expireDate" 
                        :class="{ 'is-validate': isValidation && !expireDate }"
                        type="date" class="form-control" id="expDate" required>
                    </div>
                    <div class="col-md-6">
                        <label for="cvc" class="form-label">CVC *</label>
                        <input 
                        v-model.trim="cvc" 
                        :class="{ 'is-validate': isValidation && !cvc }"
                        type="number" class="form-control" id="cvc" placeholder="111"
                            required>
                    </div>
                    </div>
                    </div>

                    <div 
                    v-if="selectPayment == 2"
                    class="row mt-2"
                    >
                        <div class="col-md-6">
                            <label for="mobileb" class="form-label">Mobile bank no *</label>
                            <input v-model.trim="mobile_banking" type="number" class="form-control"
                            :class="{ 'is-validate': isValidation && !mobile_banking }" id="mobileb" placeholder="Mobile bank no"
                            required>
                        </div>
                        <div class="col-md-6">
                            <label for="transID" class="form-label">Transaction id *</label>
                            <input v-model.trim="trans_id" type="text" class="form-control"
                            :class="{ 'is-validate': isValidation && !trans_id }" id="transID" placeholder="Transaction id"
                            required>
                        </div>
                    </div>
                    
                    <div class="col-12">
                        <button @click="handleOrderSubmit(filterProducts[0])" type="submit"
                            class="big-screen-submit-btn">Submit</button>
                    </div>
                </div>

            </div>
            <div class="col-md-6">
                <section>
                    <section class="cart-style cart-section-style">
                        <div class="card mb-3" style="max-width: 540px; margin: auto;">
                            <div class="row g-0">
                                <div class="col-md-3">
                                    <img :src="filterProducts[0]?.pro_image"
                                        class="img-fluid rounded-start cart-img-style" alt="...">
                                </div>
                                <div class="col-md-3 d-flex justify-content-center align-items-center">
                                    <div class="card-name-style">
                                        <h6>{{ filterProducts[0]?.pro_name }}</h6>
                                    </div>
                                </div>
                                <div class="col-md-3 d-flex justify-content-center align-items-center">
                                    <div class="d-flex price-delete-style">
                                        <div class="d-flex add-sub-style">
                                            <span @click="handleDecrementQuantity" class="material-icons me-2">
                                                remove
                                            </span>
                                            <h5 class="me-2">{{ quantity }}</h5>
                                            <span @click="handleIncrementQuantity" class="material-icons me-2">
                                                add
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-3 d-flex justify-content-center align-items-center">
                                    <div class="d-flex price-delete-style">
                                        <h6>$ {{ filterProducts[0]?.price }}</h6>
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
                            <button @click="handleOrderSubmit(filterProducts[0])" type="submit"
                                class="btn btn-primary">Submit</button>
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

.delivery-info-style {
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
}

.contact-info-style {
    margin-bottom: 10px;
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
}

.order-form-style label {
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
}

.order-form-style input {
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
}

.order-form-style select {
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
}

.cart-container {
    margin-bottom: 30px;
}

.calculation-section {
    border-top: 1px solid black;
    margin-top: 20px;
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
}

.card-name-style {
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
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
    width: 100%;
    margin: auto;
}


.cart-img-style {
    height: 100px;
}

.add-sub-style {
    cursor: pointer;
}

.price-delete-style {
    cursor: pointer;
    font-weight: 500;
    font-family: 'Poppins', sans-serif;
}

.price-delete-style span:hover {
    cursor: pointer;
    color: #323333;
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

.is-validate {
    border: 1px solid #D71110 !important;
}

.big-screen-submit-btn {
    background:#1F5DA0;
    color: #FFFFFF;
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
    font-size: 16px;
    padding: 8px 16px;
    border: none;
    border-radius: 8px;
}
.big-screen-submit-btn:hover {
opacity: 0.9;
}

.form-control {
    border: 1px solid gray;
}

.form-control:focus {
    box-shadow: none;
    border: 1px solid #1F5DA0;
}

.form-select {
    border: 1px solid gray;
}

.form-select:focus {
    box-shadow: none;
    border: 1px solid #1F5DA0;
}

.payment-validate {
    color: #D71110 !important;
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