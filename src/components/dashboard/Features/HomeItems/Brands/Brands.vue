<script setup>
import { ref, onMounted } from 'vue';
import { postBrand, getBrands, deleteBrand } from '@/API/All_API.js';

const inputData = ref({
    id: null,
    brand_name: null,
    brnad_id: null,
    brand_image: '',
});
const isValidation = ref(false);
const isModal = ref(false);
const brandList = ref([]);
const isEdit = ref(false);

const handleCreate = () => {
    isModal.value = true;
    handleReset();
};

onMounted(() => {
    handleGetBrands();
})

const handleGetBrands = async () => {
    try {
        const result = await getBrands();
        brandList.value = result?.data;
    }
    catch (error) {
        console.log("Offer poster", error);
    }
};

const handleSubmit = async () => {
    try {
        const data = {
            _id: isEdit ? inputData?.value?.id : null,
            brnad_id: inputData.value.brnad_id,
            brand_name: inputData.value.brand_name,
            brnad_image: inputData.value.brand_image,
        };
        const text = 'Are you want to sure?';
        if (confirm(text) == true) {
            const result = await postBrand(data);
            if (result?.data?.insertedId || result?.data?.modifiedCount == 1) {
                alert(result?.data?.insertedId ? 'Data inserted successful!' : 'Data updated successful');
                handleReset();
                isModal.value = false;
            }
        }
    }
    catch (error) {
        console.log(error);
    }
};

const handleEdit = (item) => {
    isEdit.value = true;
    isModal.value = true;
    if (isEdit) {
        inputData.value.id = item?._id;
        inputData.value.brnad_id = item?.brnad_id;
        inputData.value.brand_name = item?.brand_name;
        inputData.value.brand_image = item?.brnad_image;
    }
};

const handleDelete = async (id) => {
    try {
        const text = 'Are you want to sure?';
        if (confirm(text) == true) {
            const result = await deleteBrand(id)
            if (result.data?.deletedCount == 1) {
                alert("Image category delete successful");
                const index = brandList.value.findIndex((item) => item._id === id);
                if (index !== -1) {
                    brandList.value.splice(index, 1);
                }
            };
        };
    }
    catch (error) {
        console.log(error);
    }
};

const handleCancel = () => {
    handleReset();
    isEdit.value = false;
};

const handleCloseModal = () => {
    isModal.value = false;
    isEdit.value = false;
}

const handleReset = () => {
    inputData.value = {
        id: null,
        brand_name: null,
        brnad_id: null,
        brand_image: '',
    }
};
</script>

<template>

    <section class="container container-style">
        <!-- button div  -->
        <div class="add-btn-style">
            <button @click="handleCreate" type="button" class="btn d-flex aligns-items-center mb-2"><span
                    class="material-icons">
                    add
                </span>Add Brand</button>
        </div>

        <!-- Image category list  -->
        <div class="row row-cols-1 row-cols-md-2 g-4 mt-2 mb-2">
            <div v-for="(item, index) in brandList" :key="index" class="col">
                <div class="card">
                    <div class="row">
                        <div class="col-md-3 image-style">
                            <img :src="item?.brnad_image" class="card-img-top" alt="...">
                        </div>
                        <div class="col-md-7">
                            <div class="card-body">
                                <p class="card-text mb-0">Brand Name: {{ item?.brand_name }}</p>
                                <p class="card-text mb-0">Brand ID: {{ item?.brnad_id }}</p>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="icon-style d-flex align-items-center mt-3">
                                <span @click="handleEdit(item)" class="material-icons me-2">
                                    edit
                                </span>
                                <span @click="handleDelete(item?._id)" class="material-icons">
                                    delete
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Add image Category Modal div  -->

        <div v-if="isModal" class="offcanvas offcanvas-end category-div show" tabindex="-1" id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel" style="visibility: visible; width: 100%;">

            <div class="d-flex align-items-center">
                <button @click="handleCloseModal" type="button" class="btn-close me-2 ms-1" data-bs-dismiss="offcanvas"
                    aria-label="Close"></button>
                <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Create Brand</h5>
            </div>

            <div class="offcanvas-body">

                <!-- modal input field  -->
                <section class="parent-item">
                    <h5 class="text-center mb-3">Add Brand</h5>
                    <div class="row g-4">

                        <div class="col-md-6 mb-1">
                            <label for="exampleInputEmail1" class="form-label">
                                Brand ID *
                            </label>
                            <input v-model="inputData.brnad_id"
                                :class="{ isValidate: isValidation && !inputData.brnad_id }" type="number"
                                class="form-control" id="exampleInputText" placeholder="Brand ID">
                        </div>

                        <div class="col-md-6 mb-1">
                            <label for="exampleInputEmail1" class="form-label">
                                Brand Name *
                            </label>
                            <input 
                            v-model="inputData.brand_name" 
                            :class="{ isValidate: isValidation && !inputData.brand_name }"
                            type="text" class="form-control" id="exampleInputText"
                                placeholder="Brand name">
                        </div>

                        <div class="col-md-6 mb-1">
                            <label for="exampleInputEmail1" class="form-label">
                                Brand image *
                            </label>
                            <input v-model="inputData.brand_image"
                                :class="{ isValidate: isValidation && !inputData.brand_image }" type="url"
                                class="form-control" id="exampleInputText" placeholder="Brand image">
                        </div>

                        <div>
                            <button @click="handleCancel" type="button" class="btn btn-secondary me-2">
                                Cancel
                            </button>
                            <button @click="handleSubmit" type="button" class="btn btn-primary">
                                Submit
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </section>
</template>

<style scoped src="../../HomeItems/HomeItems.css"></style>