<script setup>
import moment from 'moment';
import { ref, onMounted } from 'vue';
import { getPendingOrders, updateOrderStatus } from '@/API/All_API';

const pendingOrderList = ref([]);

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
            orderStatus: "S",
        }
        const text = 'Are you want to sure ?';
        if(confirm(text) == true) {
            const result = await updateOrderStatus(item._id, data);
            if(result?.data?.modifiedCount == 1) {
                alert("Order status update to shipping");
                handleGetPendingOrders();
            }
            }
    }
    catch(error) {
        console.log(error);
    }
};

const handleOrderDetails = (details) => {
    console.log("details", details);
;}
</script>

<template>
    <div class="container container-style">
        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">SL</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Contact</th>
                    <th scope="col">Date</th>
                    <th scope="col">Status</th>
                    <th scope="col">Quantity</th>
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
                    <td>{{ item.orderStatus == "P" ? 'Pending' : '' }}</td>
                    <td class="text-center">{{ item?.orderList.length }}</td>
                    <td class="order-details vertical-center">
                        <div 
                        @click="handleOrderDetails(item?.orderList)"
                        class="d-flex align-items-center">
                            <span class="material-icons me-1">
                                visibility
                            </span>
                            <span>
                                Details
                            </span>
                        </div>
                    </td>
                    <td>
                        <div class="d-flex align-items-center justify-content-center">
                            <button type="button" class="btn btn-danger me-2">Reject</button>
                            <button 
                            @click="handleUpdateOrderStatus(item)"
                            type="button" class="btn btn-success">Shipping</button>
                        </div>
                    </td>
                </tr>

            </tbody>
        </table>
    </div>
</template>

<style scoped src="../../Orders/Orders.css"></style>