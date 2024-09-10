<script setup>
import moment from 'moment';
import { ref, onMounted } from 'vue';
import { getWarehouse, updateOrderStatus, deleteOrders } from '@/API/All_API.js';

const warehouseList = ref([]);
const orderDetails = ref({});
const isModal = ref(false);

onMounted(() => {
    handleGetWarehouse();
});

const formatDate = (dateString) => {
    if (!dateString) return '';
    return moment(dateString).format('DD-MMM-YYYY');
}

const handleGetWarehouse = async () => {
    try {
        const result = await getWarehouse();
        warehouseList.value = result?.data;
    }
    catch (error) {
        console.log(error);
    }
};

const handleUpdateOrderStatus = async (item) => {
    try {
        const data = {
            orderStatus: "S",
            warehouse_date: item?.warehouse_date,
            shipping_date: Date()
        }
        const text = 'Are you want to sure ?';
        if (confirm(text) == true) {
            const result = await updateOrderStatus(item._id, data);
            if (result?.data?.modifiedCount == 1) {
                alert("Order status update to shipping");
                handleGetWarehouse();
                isModal.value = false;
            }
        }
    }
    catch (error) {
        console.log(error);
    }
};

const handleDeleteOrders = async (id) => {
    try {
        const text = 'Are you want to sure?';
        if (confirm(text) == true) {
            const result = await deleteOrders(id);
            if (result?.data?.deletedCount == 1) {
                alert("Order reject successful");
                handleGetWarehouse();
                isModal.value = false;
            }
        }
    }
    catch (error) {
        console.log(error);
    }
};

const handleOrderDetails = (details) => {
    isModal.value = true;
    orderDetails.value = details;
};

</script>

<template>
    <div class="container container-style">
        <table class="table table-striped table-style">
            <thead>
                <tr>
                    <th scope="col">SL</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Contact</th>
                    <th scope="col">Date</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Total Bill</th>
                    <th scope="col">Details</th>
                    <th scope="col" class="text-center">Actions</th>
                </tr>
            </thead>
            <tbody>

                <tr class="placeholder-glow"
                    v-if="warehouseList.length === 0"
                    v-for="n in 5" :key="n">
                    <th scope="row">
                        <span class="placeholder col-12"></span>
                    </th>
                    <td>
                        <span class="placeholder col-12"></span>
                    </td>
                    <td><span class="placeholder col-12"></span></td>
                    <td><span class="placeholder col-12"></span></td>
                    <td><span class="placeholder col-12"></span></td>
                    <td><span class="placeholder col-12"></span></td>
                    <td><span class="placeholder col-12"></span></td>
                    <td><span class="placeholder col-12"></span></td>
                    <td class="order-details vertical-center">
                        <span class="placeholder col-12"></span>
                    </td>
                    <td>
                        <span class="placeholder col-12"></span>
                    </td>
                </tr>


                <tr v-for="(item, index) in warehouseList" :key="index">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ item?.fullName }}</td>
                    <td>{{ item?.email }}</td>
                    <td>{{ item?.phoneNumber }}</td>
                    <td>{{ formatDate(item?.orderDate) }}</td>
                    <td class="text-center">{{ item?.orderList.length }}</td>
                    <td>{{ item?.totalAmount }}</td>
                    <td class="order-details vertical-center">
                        <div @click="handleOrderDetails(item)" class="d-flex align-items-center">
                            <span class="material-icons me-1">
                                info
                            </span>
                            <span>
                                Details
                            </span>
                        </div>
                    </td>
                    <td>
                        <div class="d-flex align-items-center justify-content-center rej-appro-btn">
                            <button 
                            @click="handleDeleteOrders(item?._id)"
                            type="button" class="btn btn-danger me-2">Reject</button>
                            <button @click="handleUpdateOrderStatus(item)" type="button"
                                class="btn btn-success">Approve</button>
                        </div>
                    </td>
                </tr>

            </tbody>
        </table>
        <!-- order details modal  -->
        <div v-if="isModal" class="offcanvas offcanvas-end category-div show" tabindex="-1" id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel" style="visibility: visible; width: 100%;">

            <div class="d-flex align-items-center">
                <button @click="isModal = false" type="button" class="btn-close me-2 ms-1" data-bs-dismiss="offcanvas"
                    aria-label="Close"></button>
                <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Order Details</h5>
            </div>

            <div class="offcanvas-body">
                <!-- modal input field  -->
                <section class="parent-item">
                    <!-- order info start -->
                    <div class="card">
                        <div class="card-header">
                            Order Information
                        </div>
                        <div class="card-body order-details-style">
                            <div class="d-flex justify-content-between">
                                <h5 class="card-title">Name: <span>{{ orderDetails?.fullName }}</span></h5>
                                <h5 class="card-title">Email: <span>{{ orderDetails?.email }}</span></h5>
                                <h5 class="card-title">Contact: <span>{{ orderDetails?.phoneNumber }}</span></h5>
                            </div>
                            <div class="d-flex justify-content-between">
                                <p class="card-title">County: <span>{{ orderDetails?.country }}</span></p>
                                <p class="card-title">State: <span>{{ orderDetails?.state }}</span></p>
                                <p class="card-title">City: <span>{{ orderDetails?.city }}</span></p>
                                <p class="card-title">Zip: <span>{{ orderDetails?.zip }}</span></p>
                            </div>
                            <div class="d-flex justify-content-between">
                                <p class="card-title">Sub Total: <span>{{ orderDetails?.subTotal }}</span></p>
                                <p class="card-title">Vat Total: <span>{{ orderDetails?.vatTotal }}</span></p>
                                <p class="card-title">Delivery Fee: <span>{{ orderDetails?.delivaryFee }}</span></p>
                                <p class="card-title">Total Amount: <span>{{ orderDetails?.totalAmount }}</span></p>
                            </div>

                            <div class="d-flex justify-content-between">
                                <p class="card-title">Address: <span>{{ orderDetails?.address }}</span></p>
                                <p class="card-title">Date: <span>{{ formatDate(orderDetails?.orderDate) }}</span></p>
                            </div>

                            <h5>Payment Information</h5>
                            <div class="d-flex justify-content-between">
                                <p class="card-title">Method: <span>{{ orderDetails?.payment_method == 2 ? 'Mobile Banking' : orderDetails?.payment_method == 3 ? 'Card payment' : orderDetails?.payment_method == 1 ? 'Cash on delivery' : ''}}</span></p>
                            </div>

                            <div v-if="orderDetails?.payment_method == 2" class="d-flex justify-content-between">
                                <p class="card-title">Account no: <span>{{ orderDetails?.mobile_banking }}</span></p>
                                <p class="card-title">Transaction id: <span>{{ orderDetails?.trans_id }}</span></p>
                            </div>

                            <div v-if="orderDetails?.payment_method == 3" class="d-flex justify-content-between">
                                <p class="card-title">Card no: <span>{{ orderDetails?.cardNumber }}</span></p>
                                <p class="card-title">Card name: <span>{{ orderDetails?.cardName }}</span></p>
                                <p class="card-title">Expire date: <span>{{ formatDate(orderDetails?.expireDate) }}</span></p>
                                <p class="card-title">Cvc: <span>{{ orderDetails?.cvc }}</span></p>
                            </div>

                            <div class="d-flex align-items-center justify-content-end rej-appro-btn">
                                <button @click="handleDeleteOrders(item?._id)" type="button"
                                    class="btn btn-danger me-2">Reject</button>
                                <button @click="handleUpdateOrderStatus(item)" type="button"
                                    class="btn btn-success">Approve</button>
                            </div>
                        </div>
                    </div>

                    <!-- order info end -->

                    <!-- product info start  -->
                    <h5 class="text-center mt-3 mb-3">Product Info</h5>
                    <div class="row row-cols-1 row-cols-md-2 g-4 mb-2">
                        <div v-for="(item, index) in orderDetails?.orderList" :key="index" class="col">
                            <div class="card">
                                <div class="row">
                                    <div class="col-md-4 image-style">
                                        <img :src="item?.pro_image" class="card-img-top" alt="...">
                                    </div>
                                    <div class="col-md-8">
                                        <div class="card-body details-card-style">
                                            <p class="card-text mb-0">Product Name: <span>{{ item?.pro_name }}</span></p>
                                            <div>
                                                <p class="card-text mb-0">Price: <span>{{ item?.currency_name == 'USD' ? '$' : item?.currency_name == 'BDT' ? '৳' : item?.currency_name == 'EURO' ? '€' : item?.currency_name == 'INR' ? '₹': '' }}{{ item?.price }} </span></p>
                                                <p class="card-text mb-0">Prod ID: <span>{{ item?.pro_id }}</span></p>
                                                <p class="card-text mb-0">Quantity: <span>{{ item?.quantity }}</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- product info end  -->
                </section>
            </div>
            <div class="d-flex justify-content-center mb-2 btn-style">
                <button 
                @click="isModal = false"
                type="button" class="text-center ps-3 pe-3" data-bs-dismiss="modal">Ok</button>
            </div>
        </div>
    </div>
</template>

<style scoped src="../../Orders/Orders.css"></style>