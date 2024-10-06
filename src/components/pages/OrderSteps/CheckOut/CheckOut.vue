<script setup>
import { computed, ref, watch } from 'vue';
import { useStore } from '@/stores/TaskStore';
import router from '@/router/router.js';
import { createOrders, updateStock } from '@/API/All_API.js';

const store = useStore();

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

const cart = computed(() => {
    return Object(store.cartItem)
})

const cartItem = computed(() => {
    return Object.values(store.cartItem);
})

// event handler for submit order 
const handleOrderSubmit = async () => {
    if (!fullName.value ||
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
    }
    if(cartItem.value.length === 0) {
        alert("You did not select any product. Please add some product.");
        return;
    }
    const orderList = {
        cartItem,
        orderStatus: "P",
    }

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
        orderList: cartItem.value,
        orderStatus: "P",
        orderDate: orderDate.value,
        payment_method: selectPayment.value,
        mobile_banking: mobile_banking.value,
        trans_id: trans_id.value
    };
    console.log("Data", data)
    const text = 'Are you sure? want to order!!!';
    if (confirm(text) == true) {
        const result = await createOrders(data);
        if (result?.data?.insertedId) {
            const updateStockPromises = cartItem.value.map(item => {
                const newStock = item.stock - item.quantity;
                return handleUpdateStock(item._id, { stock: newStock });
            });

            // Wait for all stock updates to complete
            await Promise.all(updateStockPromises);
            alert("Order placed successful");
            router.push('/');
            localStorage.removeItem('shopping_cart');
            store.setCartItem([]);
        }
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

// *******************************calculation section****************************

// calculate subtotal 
let subTotal = computed(() => {
    const totalQuantityWithPrice = cartItem.value.reduce((total, item) => {
        return total + (item.discount_price ? item.discount_price : item.price * item.quantity);
    }, 0);
    return totalQuantityWithPrice;
});

// calculate vat 
const vatTotal = computed(() => {
    return subTotal.value * 0.15;
});

// calculate delivary fee 
let delivaryFee = computed(() => {
    return 8;
});

// calculate total amount 
let totalAmount = computed(() => {
    return subTotal.value + vatTotal.value + delivaryFee.value;
});

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
        <div class="row g-4 checkout-field-style">
            <div class="col-md-6">
                <h3 class="contact-info-style">Contact Information</h3>
                <div class="row g-3">
                    <div class="col-md-6">
                        <label for="inputEmail4" class="form-label">Full Name *</label>
                        <input v-model="fullName" type="text" class="form-control"
                            :class="{ 'is-validate': isValidation && !fullName }" id="inputEmail4" disabled>
                    </div>
                    <div class="col-md-6">
                        <label for="inputEmail4" class="form-label">Email *</label>
                        <input v-model="email" type="email" class="form-control"
                            :class="{ 'is-validate': isValidation && !email }" id="inputEmail4" disabled>
                    </div>

                    <div class="col-md-6">
                        <label for="inputEmail4" class="form-label">Phone No *</label>
                        <input v-model.trim="phoneNumber" type="number" class="form-control"
                            :class="{ 'is-validate': isValidation && !phoneNumber }" id="inputEmail4"
                            placeholder="Enter Your Contact Number" required>
                    </div>

                    <div class="col-md-6">
                        <label for="inputState" class="form-label">Country *</label>
                        <select v-model.trim="country" id="inputState" class="form-select"
                            :class="{ 'is-validate': isValidation && !country }" placeholder="Select country" required>
                            <option>Bangladesh</option>
                            <option>India</option>
                            <option>China</option>
                        </select>
                    </div>

                    <div class="col-md-4">
                        <label for="inputEmail4" class="form-label">City *</label>
                        <input v-model.trim="city" type="text" class="form-control"
                            :class="{ 'is-validate': isValidation && !city }" id="inputEmail4" placeholder="City Name"
                            required>
                    </div>
                    <div class="col-md-4">
                        <label for="inputEmail4" class="form-label">state *</label>
                        <input v-model.trim="state" type="text" class="form-control"
                            :class="{ 'is-validate': isValidation && !state }" id="inputEmail4" placeholder="Enter State">
                    </div>
                    <div class="col-md-4">
                        <label for="inputZip" class="form-label">Zip *</label>
                        <input v-model.trim="zip" type="zip" class="form-control"
                            :class="{ 'is-validate': isValidation && !zip }" id="inputZip" placeholder="Zip Code"
                            required>
                    </div>
                    <div class="col-12">
                        <label for="inputAddress" class="form-label">Address *</label>
                        <input v-model.trim="address" type="text" class="form-control"
                            :class="{ 'is-validate': isValidation && !address }" id="inputAddress"
                            placeholder="1234 Main St" required>
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
                        <label for="inputEmail4" class="form-label">Card Number *</label>
                        <input 
                        v-model.trim="cardNumber" 
                        :class="{ 'is-validate': isValidation && !cardNumber }"
                        type="number" class="form-control" id="inputEmail4"
                            placeholder="111 1111 11111 1111" required>
                    </div>
                    <div class="col-md-12">
                        <label for="inputEmail4" class="form-label">Card Name *</label>
                        <input 
                        v-model.trim="cardName"
                        :class="{ 'is-validate': isValidation && !cardName }" 
                        type="text" class="form-control" id="inputEmail4"
                            placeholder="Card Name" required>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                        <label for="inputEmail4" class="form-label">Expire Date *</label>
                        <input v-model.trim="expireDate" 
                        :class="{ 'is-validate': isValidation && !expireDate }"
                        type="date" class="form-control" id="inputEmail4" required>
                    </div>
                    <div class="col-md-6">
                        <label for="inputEmail4" class="form-label">CVC *</label>
                        <input 
                        v-model.trim="cvc" 
                        :class="{ 'is-validate': isValidation && !cvc }"
                        type="number" class="form-control" id="inputEmail4" placeholder="111"
                            required>
                    </div>
                    </div>
                    </div>

                    <div 
                    v-if="selectPayment == 2"
                    class="row mt-2"
                    >
                        <div class="col-md-6">
                            <label for="inputEmail4" class="form-label">Mobile bank no *</label>
                            <input v-model.trim="mobile_banking" type="number" class="form-control"
                            :class="{ 'is-validate': isValidation && !mobile_banking }" id="inputEmail4" placeholder="Mobile bank no"
                            required>
                        </div>
                        <div class="col-md-6">
                            <label for="inputEmail4" class="form-label">Transaction id *</label>
                            <input v-model.trim="trans_id" type="text" class="form-control"
                            :class="{ 'is-validate': isValidation && !trans_id }" id="inputEmail4" placeholder="Transaction id"
                            required>
                        </div>
                    </div>
                    

                    <div class="col-12">
                        <button @click="handleOrderSubmit" type="submit" class="big-screen-submit-btn">Submit</button>
                    </div>
                </div>

            </div>
            <div class="col-md-6">
                <section>
                    <section class="cart-style cart-section-style">
                        <div v-for="(item, index) in cart" :key="index" class="card mb-3"
                            style="max-width: 540px; margin: auto;">
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
                                    <div class="d-flex price-delete-style">
                                        <h6><span class="material-icons scale-quantity">
                                                scale
                                            </span> {{ item.quantity }}</h6>
                                    </div>
                                </div>
                                <div class="col-md-3 d-flex justify-content-center align-items-center">
                                    <div class="d-flex price-delete-style">
                                        <h6>{{ item?.currency_name == 'USD' ? '$' : item?.currency_name == 'BDT' ? '৳' : item?.currency_name == 'EURO' ? '€' : item?.currency_name == 'INR' ? '₹': '' }}{{ item.discount_price ? item.discount_price : item.price }}</h6>
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
                                <td style="text-align: left; width:25%">${{ subTotal?.toFixed(2) }} </td>
                            </tr>
                            <tr>
                                <td style="text-align: left; width:25%"></td>
                                <td style="text-align: left; width:50%">(+) VAT</td>
                                <td style="text-align: left; width:25%">${{ vatTotal?.toFixed(2) }} </td>
                            </tr>
                            <tr>
                                <td style="text-align: left; width:25%"></td>
                                <td style="text-align: left; width:50%">Delivery Fee</td>
                                <td style="text-align: left; width:25%">${{ delivaryFee }} </td>
                            </tr>
                            <tr>
                                <td style="text-align: left; width:25%"></td>
                                <td style="text-align: left; width:50%">Total Amount</td>
                                <td style="text-align: left; width:25%">${{ totalAmount?.toFixed(2) }} </td>
                            </tr>
                        </table>
                        <div class="text-center mobile-screen-submit-btn mt-3">
                            <button @click="handleOrderSubmit" type="submit" class="submit-btn-style">Submit</button>
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
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
}

.delivery-text {
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
}

.checkout-field-style label {
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
}

.checkout-field-style input {
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
}

.checkout-field-style select {
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
}

.big-screen-submit-btn {
    background: #1F5DA0;
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

.cart-container {
    margin-bottom: 30px;
}

.calculation-section {
    border-top: 1px solid black;
    margin-top: 20px;
}

.calculation-section td {
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
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

.cart-section-style h6 {
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
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

.mobile-screen-submit-btn button {
    background: #1F5DA0;
    padding: 10px 18px;
    border: none;
    color: #FFF;
    border-radius: 20px;
    font-size: 16px;
    font-weight: 500;
    font-family: 'Poppins', sans-serif;
}

.mobile-screen-submit-btn button:hover {
    opacity: 0.9;
}

.scale-quantity {
    font-size: 13px;
}

.is-validate {
    border: 1px solid #D71110 !important;
}

.payment-validate {
    color: #D71110 !important;
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