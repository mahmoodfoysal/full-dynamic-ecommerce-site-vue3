<script setup>
import { ref, onMounted } from 'vue';
import { postImageCategory, getCategories } from '@/API/All_API.js';

const isValidation = ref(false);
const categoryList = ref([]);
const subCatList = ref([]);
const inputData = ref({
    cat_name: null,
    parent_cat_id: null,
    sub_cat_id: null,
    img: '',
});

onMounted(() => {
    handleGetCategories();
})

const handleGetCategories = async () => {
    try {
        const result = await getCategories();
        categoryList.value = result?.data;
    }
    catch(error) {
        console.log("Parent category list", error);
    }
};

const handleSubCategory = () => {
    subCatList.value = inputData.value.parent_cat_id.sub_cat_info;
}

const handleSubmit = async () => {
    try {
        const data = {
            cat_name: inputData.value.cat_name,
            cat_id: inputData.value.cat_id,
            img: inputData.value.img,
        };

        const text = 'Are you want to sure?';
        if(confirm(text) == true) {
            const result = await postImageCategory(data);
        if(result.data.insertedId || result.data.modifiedCount == 1) {
            alert(result.data.insertedId ? 'Category added successful' : 'Update category info');
        }
        }

    }
    catch(error) {
        console.log("Post Image Category handler", error);
    }
};

const handleCancel = () => {
    inputData.value.cat_name = null;
    inputData.value.cat_id = null;
    inputData.value.img = ''
    isValidation.value = false;
};
</script>

<template>

    <section class="container container-style">
        <!-- button div  -->
        <div class="add-btn-style">
            <button data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar"
                aria-label="Toggle navigation" type="button" class="btn d-flex aligns-items-center mb-2"><span
                    class="material-icons">
                    add
                </span>Add Image Category</button>
        </div>

        <!-- Image category list  -->
        <div class="div">

        </div>

        <!-- Add image Category Modal div  -->

        <div class="offcanvas offcanvas-end category-div" tabindex="-1" id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel" data-bs-backdrop="false" data-bs-keyboard="false">
            <div class="d-flex align-items-center">
                <button type="button" class="btn-close me-2 ms-1" data-bs-dismiss="offcanvas"
                    aria-label="Close"></button>
                <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Add Category</h5>
            </div>
            <div class="offcanvas-body">

                <!-- modal input field  -->
                <section class="parent-item">
                    <h5 class="text-center mb-3">Add image category</h5>
                    <div class="row g-4">

                        <div class="col-md-6 mb-1">
                            <label for="exampleInputPassword1" class="form-label">
                                Parent category ID *
                            </label>
                                <select 
                                v-model="inputData.parent_cat_id"
                                @change="handleSubCategory"
                                :class="{ isValidate: isValidation && !inputData.parent_cat_id}"
                                class="form-select form-select-md mb-1" placeholder="Please Select Category">
                                <option v-for="(item, index) in categoryList" :key="index" :value="item">
                                    {{ item?.parent_cat_id }} - {{ item?.parent_cat_name }}
                                </option>
                            </select>
                        </div>

                        <div class="col-md-6 mb-1">
                            <label for="exampleInputPassword1" class="form-label">
                                Sub category ID *
                            </label>
                                <select 
                                v-model="inputData.sub_cat_id"
                                :class="{ isValidate: isValidation && !inputData.sub_cat_id}"
                                class="form-select form-select-md mb-1" placeholder="Please Select Category">
                                <option v-for="(item, index) in subCatList" :key="index" :value="item">
                                    {{ item?.sub_cat_id }} - {{ item?.sub_cat_name }}
                                </option>
                            </select>
                        </div>

                        <div class="col-md-6 mb-1">
                            <label for="exampleInputEmail1" class="form-label">
                                Category image *
                            </label>
                            <input 
                            v-model="inputData.img"
                            type="text" class="form-control"
                                
                                id="exampleInputText" placeholder="Category image">
                        </div>

                        <div class="col-md-6 mb-1">
                            <label for="exampleInputEmail1" class="form-label">
                                Category name *
                            </label>
                            <input 
                            v-model="inputData.cat_name"
                            type="text" class="form-control"
                                
                                id="exampleInputText" placeholder="Category name">
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

<style scoped src="./ImageCategory.css"></style>