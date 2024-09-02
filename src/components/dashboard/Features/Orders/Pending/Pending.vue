<script setup>
import moment from 'moment';
import { ref, onMounted } from 'vue';
import { getPendingOrders, updateOrderStatus, deleteOrders } from '@/API/All_API.js';

const pendingOrderList = ref([]);
const isModal = ref(false);
const orderDetails = ref({});

onMounted(() => {
    handleGetPendingOrders();
});

const formatDate = (dateString) => {
    if (!dateString) return '';
    return moment(dateString).format('DD-MMM-YYYY');
}

const handleGetPendingOrders = async () => {
    try {
        const result = await getPendingOrders();
        pendingOrderList.value = result?.data;
    }
    catch (error) {
        console.log(error);
    }
};

const handleUpdateOrderStatus = async (item) => {
    try {
        const data = {
            orderStatus: "W",
        }
        const text = 'Are you want to sure ?';
        if (confirm(text) == true) {
            const result = await updateOrderStatus(item._id, data);
            if (result?.data?.modifiedCount == 1) {
                alert("Order status update to Warehouse");
                handleGetPendingOrders();
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
                handleGetPendingOrders();
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
                    <th scope="col">Items</th>
                    <th scope="col">Total Bill</th>
                    <th scope="col">Details</th>
                    <th scope="col" class="text-center">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in pendingOrderList" :key="index">
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
                        <div class="d-flex align-items-center justify-content-center">
                            <button @click="handleDeleteOrders(item?._id)" type="button"
                                class="btn btn-danger me-2">Reject</button>
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
                        <div class="card-body">
                            <div class="d-flex justify-content-between">
                                <h5 class="card-title">Name: {{ orderDetails?.fullName }}</h5>
                                <h5 class="card-title">Email: {{ orderDetails?.email }}</h5>
                                <h5 class="card-title">Contact: {{ orderDetails?.phoneNumber }}</h5>
                            </div>
                            <div class="d-flex justify-content-between">
                                <p class="card-title">County: {{ orderDetails?.country }}</p>
                                <p class="card-title">State: {{ orderDetails?.state }}</p>
                                <p class="card-title">City: {{ orderDetails?.city }}</p>
                                <p class="card-title">Zip: {{ orderDetails?.zip }}</p>
                            </div>
                            <div class="d-flex justify-content-between">
                                <p class="card-title">Sub Total: {{ orderDetails?.subTotal }}</p>
                                <p class="card-title">Vat Total: {{ orderDetails?.vatTotal }}</p>
                                <p class="card-title">Delivery Fee: {{ orderDetails?.delivaryFee }}</p>
                                <p class="card-title">Total Amount: {{ orderDetails?.totalAmount }}</p>
                            </div>

                            <div class="d-flex justify-content-between">
                                <p class="card-title">Address: {{ orderDetails?.address }}</p>
                                <p class="card-title">Date: {{ formatDate(orderDetails?.orderDate) }}</p>
                            </div>

                            <h5>Payment Information</h5>
                            <div class="d-flex justify-content-between">
                                <p class="card-title">Method: Card</p>
                            </div>

                            <div class="d-flex align-items-center justify-content-end">
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
                                        <div class="card-body">
                                            <h5 class="card-title">{{ item?.cat_name }}</h5>
                                            <p class="card-text mb-0">Product Name: {{ item?.pro_name }}</p>
                                            <div>
                                                <p class="card-text mb-0">Price: {{ item?.price }} {{ item?.currency_name }}</p>
                                                <p class="card-text mb-0">Prod ID: {{ item?.pro_id }}</p>
                                                <p class="card-text mb-0">Quantity: {{ item?.quantity }}</p>
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
            <div class="d-flex justify-content-center mb-2">
                <button 
                @click="isModal = false"
                type="button" class="btn btn-primary text-center ps-3 pe-3" data-bs-dismiss="modal">Ok</button>
            </div>
        </div>
    </div>

</template>

<style scoped src="../../Orders/Orders.css"></style>