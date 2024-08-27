<script setup>
import { onMounted, ref } from 'vue';
import { postRole, getAdmin, deleteAdmin } from '../../../../API/All_API.js'
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

const id = ref(null);
const email = ref(null);
const role = ref(null);
const adminList = ref([])
const isValidation = ref(false);
const isEdit = ref(false)

onMounted(() => {
    handleGetAdmin()
})

const handleGetAdmin = async () => {
    try {
        const result = await getAdmin();
        adminList.value = result?.data;
    }
    catch (error) {
        console.log(error);
    }
}

const handlePostRole = async () => {
    try {
        if (!email.value || !role.value) {
            isValidation.value = true;
            alert("Please complete all the required field");
            return;
        }
        const text = 'Are you want to sure?';
        if (confirm(text) == true) {
            const data = {
                _id: isEdit ? id.value : null,
                email: email.value,
                role: role.value
            }
            const result = await postRole(data);
            if (result.data.insertedId || result.data.modifiedCount == 1) {
                isValidation.value = false;
                isEdit.value = false;
                alert(result.data.insertedId ? 'Admin added successful' : 'Update admin info');
                const obj = {
                    email: email.value,
                    role: role.value
                }
                const index = adminList.value.findIndex(
                    (item) => item._id == id.value
                );
                if (index > -1) {
                    adminList.value[index] = obj;
                } else {
                    adminList.value.unshift(obj);
                }
                email.value = null;
                role.value = null;
            }
        }
    }
    catch (error) {
        console.log(error);
    }
};

const handleEdit = (item) => {
    isEdit.value = true;
    email.value = item.email;
    role.value = item.role;
    id.value = item?._id
};

const handleCancelEdit = () => {
    isEdit.value = false;
    email.value = null;
    role.value = null;
};

const handleDeleteAdmin = async (id) => {
    try {
        const text = 'Are you want to sure delete this user?'
        if (confirm(text) == true) {
            const result = await deleteAdmin(id);
            if (result.data?.deletedCount == 1) {
                alert("Deleted admin");
                const index = adminList.value.findIndex((item) => item._id === id);
                if (index !== -1) {
                    adminList.value.splice(index, 1);
                }
            }
        }
    }
    catch (error) {
        console.log(error);
    }
}

</script>

<template>
    <div class="row g-4">
        <div class="col-md-6 mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input v-model="email" 
            type="email" 
            class="form-control" 
            :class="{ isValidate: isValidation && !email }"
            placeholder="Enter email address"
            id="exampleInputEmail1" aria-describedby="emailHelp">
        </div>
        <div class="col-md-6 mb-3">
            <label for="exampleInputPassword1" class="form-label">Role</label>
            <select 
            v-model="role" 
            class="form-select form-select-md mb-3"
            :class="{ isValidate: isValidation && !role }" 
            aria-label=".form-select-lg example"
            placeholder="Enter given role"
            >
                <option 
                v-for="(item, index) in roles" 
                :key="index">
                {{ item?.name }}
                </option>
            </select>
        </div>
    </div>
    <button type="submit" @click="handlePostRole" class="btn btn-primary">{{ isEdit ? 'Update' : 'Submit' }}</button>
    <button v-if="isEdit" type="Cancel" @click="handleCancelEdit" class="btn btn-secondary ms-3">Cancel</button>
    <h5 class="text-center mt-3 mb-3">Admin List</h5>
    <div class="row g-4">
        <div v-for="(item, index) in adminList" :key="index" class="col-md-6">
            <div class="d-flex align-items-center">
                <div class="me-2">
                    <h6>Email: {{ item?.email }}</h6>
                    <p>Role: {{ item?.role }}</p>
                </div>

                <div class="icon-style">
                    <span @click="handleEdit(item)" class="material-icons">
                        edit
                    </span>
                    <span @click="handleDeleteAdmin(item?._id)" class="material-icons">
                        delete
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.isValidate {
    border: 1px solid red !important;
}

.icon-style span {
    cursor: pointer;
}

.icon-style span:first-child:hover {
    color: #1F5DA0;
    cursor: pointer;
}

.icon-style span:last-child:hover {
    color: #D71110;
    cursor: pointer;
}
</style>