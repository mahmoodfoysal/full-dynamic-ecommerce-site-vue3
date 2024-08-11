<script setup>
import { ref } from 'vue';
import {postRole} from '../../api/dashboard-api.js'
const roles = [
    {
        name: 'Admin',
        id: 101
    },
    {
        name: 'Outlet',
        id: 102
    }
];


const email = ref(null);
const role = ref(null);
const isValidation = ref(false);

const handlePostRole = async () => {
    try {
        if(!email.value || !role.value) {
            isValidation.value = true;
            alert("Please complete all the required field");
            return;
        }
        const text = 'Are you want to sure?';
        if(confirm(text) == true) {
            const data = {
            email: email.value,
            role: role.value
        }
            const result = await postRole(data);
            if(result.data.insertedId) {
                isValidation.value = false;
                alert("Add Admin Role");
                email.value = null;
                role.value = null;
        }
        }
    }
    catch(error) {
        console.log(error);
    }
}

</script>

<template>
    <div class="row g-4">
        <div class="col-md-5 mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input 
            v-model="email"
            type="email" 
            class="form-control"
            :class="{isValidate: isValidation && !email}" 
            id="exampleInputEmail1" 
            aria-describedby="emailHelp">
        </div>
        <div class="col-md-5 mb-3">
            <label for="exampleInputPassword1" class="form-label">Role</label>
            <select
            v-model="role" 
            class="form-select form-select-md mb-3" 
            :class="{isValidate: isValidation && !role}" 
            aria-label=".form-select-lg example">
                <option 
                v-for="(item, index) in roles"
                :key="index"
                >{{ item?.name }}</option>

            </select>
        </div>        
    </div>
    <button 
    type="submit" 
    @click="handlePostRole"
    class="btn btn-primary"
    >Submit</button>
</template>

<style scoped>
.isValidate {
    border: 1px solid red !important;
}
</style>